import { Request, Response } from "express"
import { RES_INVALID_REQUEST, RES_UNAUTHORIZED } from "../../../constants/index.ts"
import { JWT_PAYLOAD } from "../../../types/index.ts"
import { prisma } from "../../../lib/db.ts"

export async function deleteJob(req: Request, res: Response){
    const {id} = req.params

    if(typeof id !== "string"){
        return res.status(403).json(RES_INVALID_REQUEST)
    }

    const user: JWT_PAYLOAD = req.user

    if(!user){
        return res.status(403).json(RES_UNAUTHORIZED)
    }

    const result = await prisma.bulkjob.delete({
        where: { id: Number(id) },
        select: { id: true }
    })

    return res.status(200).json({
        success: true,
        message: "Selected entry deleted successfully"
    })
}