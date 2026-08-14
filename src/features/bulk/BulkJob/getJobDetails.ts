import { Request, Response } from "express"
import { JWT_PAYLOAD } from "../../../types/index.ts"
import { prisma } from "../../../lib/db.ts"
import { RES_INVALID_REQUEST, RES_UNAUTHORIZED } from "../../../constants/index.ts"

export async function getJobDetails(req: Request, res: Response) {
    const {id} = req.params

    if(typeof id !== "string"){
        return res.status(403).json(RES_INVALID_REQUEST)
    }

    const user: JWT_PAYLOAD = req.user
    if(!user){
        return res.status(403).json(RES_UNAUTHORIZED)
    }

    const jobDetails = await prisma.bulkjob.findFirst({
        where: {
            id: Number(id),
            userId: user.id
        }
    })

    if(!jobDetails){
        return res.status(400).json({
            success: false,
            message: "Invalid Request"
        })
    }

    return res.status(200).json({
        success: true,
        message: "Job Details fetched successfully..",
        data: jobDetails
    })
}