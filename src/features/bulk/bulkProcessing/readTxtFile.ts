import fs from "node:fs"
import { createInterface } from "node:readline"
import { shortenLineByLine } from "./shortenLine.ts"
import { prisma } from "../../../lib/db.ts"
import { BULK_JOB } from "../../../types/index.ts"
import { BulkJobStatus } from "../../../generated/prisma/enums.ts"



export async function readTxtFile(job: BULK_JOB){
    const readStream = fs.createReadStream(job.filePath)

    const rl = createInterface({
        input: readStream,
        crlfDelay: Infinity
    })

    let lineNo = 0
    let errors = 0
    const writeStream = fs.createWriteStream("public/errors/error_log.txt", {flags: "a"})
    for await(const line of rl){
        lineNo++
        console.log(line)
        try {
            const success = await shortenLineByLine(line, job.userId)
            continue
        } catch (error: any) {
            errors++
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
            status: BulkJobStatus.COMPLETED
        },
        select: {
            filePath: true,
            status: true
        }
    })

    if(!update){
        throw new Error("Update failed")
    }

    if(update.status === BulkJobStatus.COMPLETED){
        fs.unlink(job.filePath, () => {
            console.log("Uploaded file deleted")
        })
        return
    }
    throw new Error("Update failed")
}