import { Request, Response } from "express";

export async function uploadController(req:Request, res: Response ) {
    console.log("UPLOAD CONTROLLER")
    if(!req.file){
        return res.status(422).json({
            success: false,
            message: "No file chosen"
        })
    }
    console.log(req.file)
}