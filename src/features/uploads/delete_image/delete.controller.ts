import { Request, Response } from "express";
import { prisma } from "../../../lib/db.ts";
import { HelperResponse } from "../../../types/index.ts";
import { deleteOnCloudinary } from "./delete.helper.ts";

export async function deleteController(req: Request, res: Response){
    const {id, publicId}: {id: number, publicId: string} = req.body

    const helperResponse: HelperResponse<null> = await deleteOnCloudinary(publicId)

    if(!helperResponse.success){
        return res.status(400).json(helperResponse)
    }

    const updates = await prisma.user.updateMany({
        where: {id},
        data: { profilePic: null }
    })

    if(updates.count === 0){
        return res.status(418).json({
            success: false,
            message: "DB update failed after deleting image"
        })
    }
    
    return res.status(200).json({
        success: true,
        message: "Deleted Successfully"
    })
}