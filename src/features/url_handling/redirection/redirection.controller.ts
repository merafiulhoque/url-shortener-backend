import {Request, Response} from "express";
import { prisma } from "../../../lib/db.ts";
import { redisClient } from "../../../lib/redis.ts";
import { URLS } from "../../../types/index.ts";

export async function redirectionController(req: Request, res: Response){
    const { shortenedUrl } = req.params;
    if(typeof shortenedUrl === "object"){
        return res.send("No such route exists")                
    }
    const url = await prisma.url.findUnique({
        where: {shortnedUrl: shortenedUrl},
        select: {originalUrl: true, clicks: true, userId: true}
    })
    if(!url){
        return res.status(404).send("No such route exists")
    }
    const urlClickUpdate = await prisma.url.update({
        where: {shortnedUrl: shortenedUrl},
        data: {clicks: url.clicks +1},
        select : { clicks : true }
    })
    await redisClient.del(`user:${url.userId}`)
    return res.status(302).redirect(url.originalUrl)
}