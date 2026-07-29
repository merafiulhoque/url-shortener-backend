import { Request, Response } from "express"
import { getStatService } from "./getStatService.ts"
import { HelperResponse } from "../../../types/index.ts"

export async function getStatController(req: Request, res: Response) {
    const { id }: {id: number} = req.body
    console.log(id)

    const helperResponse: HelperResponse<any> = await getStatService(id)
    return res
            .status(helperResponse.success ? 200:500)
            .json(helperResponse)
}