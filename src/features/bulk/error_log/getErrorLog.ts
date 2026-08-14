import { Request, Response } from "express";
import { RES_INVALID_REQUEST, RES_UNAUTHORIZED } from "../../../constants/index.ts";
import path from "path";
import fs from "fs"

export async function getErrorLog(req: Request, res: Response){
    const {id} = req.params

    if(typeof id !== "string"){
        return res.status(403).json(RES_INVALID_REQUEST)
    }

    const user = req.user

    if(!user){
        return res.status(401).json(RES_UNAUTHORIZED)
    }

    const filePath = path.join(
        process.cwd(),
        "public",
        "errors",
        `error_log_${id}.txt`
    )

    if(!fs.existsSync(filePath)){
        return res.status(404).json({
            success: false,
            message: "Error log not found"
        });
    }

    return res.download(
        filePath,
        `error_log_${id}.txt`,
        (err) => {
            if (err) {
                console.error("Error downloading error log:", err);

                if (!res.headersSent) {
                    return res.status(500).json({
                        success: false,
                        message: "Failed to download error log"
                    });
                }
            }
        }
    )
}   