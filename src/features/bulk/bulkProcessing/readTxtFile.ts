import fs from "node:fs"
import { createInterface } from "node:readline"
import { shortenLineByLine } from "./shortenLine.ts"
import { prisma } from "../../../lib/db.ts"
import { PROCESS_JOB } from "../../../types/index.ts"
import { BulkJobStatus } from "../../../generated/prisma/enums.ts"

let errors = 0

export async function readTxtFile(job: PROCESS_JOB){
    const readStream = fs.createReadStream(job.filePath)

    const rl = createInterface({
        input: readStream,
        crlfDelay: Infinity
    })

    let lineNo = 0
    
    const writeStream = fs.createWriteStream(`public/errors/error_log_${job.id}.txt`, {flags: "a"})
    for await(const line of rl){
        lineNo++
        try {
            const success = await shortenLineByLine(line, job.userId)
            continue
        } catch (error: any) {
            errors++
            if(errors === 1){
                writeStream.write(
                    `ERROR LOG OF BULK JOB ID :: ${job.id} , UPLOADED FILE NAME:: ${job.filePath}\n\n`
                )
            }
            writeStream.write(
                `Error ${errors}: at line ${lineNo}\nMessage: ${error.message}\n\n`
            )
            continue
        }
    }
    writeStream.end()
    const update = await prisma.bulkjob.update({
        where: {
            id: job.id
        },
        data: { 
            status: errors > 0 ? BulkJobStatus.COMPLETED_WITH_ERRORS : BulkJobStatus.COMPLETED
        },
        select: {
            filePath: true,
            status: true
        }
    })

    if(!update){
        throw new Error("Update failed")
    }

    if(update.status === BulkJobStatus.COMPLETED || update.status === BulkJobStatus.COMPLETED_WITH_ERRORS){
        fs.unlink(job.filePath, (err) => {
            if(err) throw new Error("ERROR DELETING UPLOADED FILE")
            return
        })
        return
    }
    throw new Error("Update failed")
}