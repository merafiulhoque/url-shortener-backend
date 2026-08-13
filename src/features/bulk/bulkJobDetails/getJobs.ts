import { Request, Response } from "express";
import { prisma } from "../../../lib/db.ts";
import { JWT_PAYLOAD } from "../../../types/index.ts";

export async function getJobs(req: Request, res: Response){
    const user: JWT_PAYLOAD = req.user

    if(!user){
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        })
    }

    const jobs = await prisma.bulkjob.findMany({
        where: {
            userId: user.id
        }
    })

    if(!jobs || jobs.length === 0){
        return res.status(200).json({
            success: true,
            message: "You have no background jobs"
        })
    }

    return res.status(200).json({
        success: true,
        message: "Jobs fetched successfully",
        data: jobs
    })
}