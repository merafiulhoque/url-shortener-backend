import {Request, Response} from "express";
import { prisma } from "../../../lib/db.ts";

export async function redirectionController(req: Request, res: Response){
    const { shortenedUrl } = req.params;
    if(typeof shortenedUrl === "object"){
        return res.send("No such route exists")                
    }
    const url = await prisma.url.findUnique({
        where: {shortnedUrl: shortenedUrl},
        select: {originalUrl: true}
    })
    if(!url){
        return res.send("No such route exists")
    }
    return res.status(302).redirect(url.originalUrl)
}