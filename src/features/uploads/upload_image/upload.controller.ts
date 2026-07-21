import { Request, Response } from "express";
import { uploadOnCloudinary } from "./upload.service.ts";
import { updateDB } from "./updateDB.ts";
import { AppConfig } from "../../../AppConfig.ts";

export async function uploadController(req:Request, res: Response ) {
    const user = req.user
    if(!user){
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        })
    }
    if(!req.file){
        return res.status(422).json({
            success: false,
            message: "No file chosen"
        })
    }

    const result: any = await uploadOnCloudinary(req.file.buffer, AppConfig.CLOUDINARY_FOLDER_FOR_USERS_PROFILES)
    if(!result || !result.success){
        return res.status(500).json({
            success: false,
            message: "Profile Pic upload Failed"
        })
    }
    const dbUpdated = await updateDB(user.id, result.url)
    
    return res.status(200).json({
        success: true,
        message: "Profile Pic uploaded successfully",
        data: dbUpdated ? result.url : null
    })
}