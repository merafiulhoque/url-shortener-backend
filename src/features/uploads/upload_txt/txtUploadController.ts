import { Request, Response } from "express";
import { JWT_PAYLOAD } from "../../../types/index.ts";
import { readTxtFile } from "./readTxtFile.ts";
import { number } from "zod";
import { bulkProcessor } from "./bulkProcessor.ts";
import { prisma } from "../../../lib/db.ts";
import { BulkJobStatus } from "../../../generated/prisma/enums.ts";

export async function txtUploadController(req: Request, res: Response){
    const user: JWT_PAYLOAD = req.user

    if(!user){
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        })
    }

    if (!req.file){
        return res.status(400).json({
            success: false,
            message: "No file uploaded"
        })
    }

    const bulkJob = await prisma.bulkjob.create({
        data: {
            userId: user.id,
            status: BulkJobStatus.PROCESSING,
            filePath: req.file.path
        }
    })

    bulkProcessor(bulkJob)

    return res.status(200).json({
        success: true,
        message: "File uploaded successfully, Processing..."
    })
}