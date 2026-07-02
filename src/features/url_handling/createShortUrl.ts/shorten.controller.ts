import { Request, Response } from "express";
import { HelperResponse, URLS } from "../../../types/index.ts";
import { createNewShortenedURL } from "./shorten.service.ts";

export async function createNewUrlController(req: Request, res: Response){
    const user = req.user;
    console.log(user)
    if(!user || !user.id){
        return res.status(401).json({ message: "Unauthorized" });
    }
    const { originalUrl }: { originalUrl: string } = req.body;
    if(!originalUrl){
        return res.status(400).json({ message: "Original URL is required" });
    }
    const helperResponse: HelperResponse<URLS> = await createNewShortenedURL(user.id, originalUrl);
    return res.status(201).json(helperResponse);
}