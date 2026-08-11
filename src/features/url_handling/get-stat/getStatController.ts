import { Request, Response } from "express"
import { getStatService } from "./getStatService.ts"
import { HelperResponse, JWT_PAYLOAD } from "../../../types/index.ts"

export async function getStatController(req: Request, res: Response) {
    const { id } = req.body

    if (typeof Number(id) !== "number"){
        return res.status(403).json({
            success: false,
            message: "Invalid id"
        })
    }

    const user: JWT_PAYLOAD = req.user

    if(!user){
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        })
    }

    if(!user.isPremium){
        return res.status(401).json({
            success: false,
            message: "To view click Stat, Please upgrade to premium"
        })
    }

    const helperResponse: HelperResponse<any> = await getStatService(id)
    return res
            .status(helperResponse.success ? 200:500)
            .json(helperResponse)
}