import { Request, Response } from "express";
import {  GETAllShortenedURLS } from "./url.service.ts";
import { HelperResponse, URLS } from "../../../types/index.ts";

export async function getAllUrlController(req: Request, res: Response){
    const user = req.user;
    if(!user || !user.id){
        return res.status(401).json({ message: "Unauthorized" });
    }
    const helperResponse: HelperResponse<URLS[]> = await GETAllShortenedURLS(user.id);
    return res.status(200).json(helperResponse);
}

