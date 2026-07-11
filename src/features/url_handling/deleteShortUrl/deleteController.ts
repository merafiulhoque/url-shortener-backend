import { Request, Response } from "express"
import { prisma } from "../../../lib/db.ts"
import { redisClient } from "../../../lib/redis.ts"

export const deleteController = async (req: Request, res: Response) => {
    const {id} = req.body
    const user = req.user

    if (!user){
        return res.status(401).json({
            success: true,
            message: "Unauthorized"
        })
    }

    await redisClient.del(`user:${user.id}`)

    const deletedUrls = await prisma.url.deleteMany({
        where: {id}
    })


    console.log(id, deletedUrls)
    if(deletedUrls.count === 0){
        return res.status(422).json({
            success: false,
            message: "No url found with this ID"
        })
    }
    return res.status(200).json({
        success: true,
        message: "Selected URL deleted successfully"
    })
}