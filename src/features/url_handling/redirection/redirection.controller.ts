import {Request, Response} from "express";
import { prisma } from "../../../lib/db.ts";
import { redisClient } from "../../../lib/redis.ts";

export async function redirectionController(req: Request, res: Response){
    const { shortenedUrl } = req.params;
    if(typeof shortenedUrl === "object"){
        return res.send("No such route exists")                
    }
    const url = await prisma.url.findUnique({
        where: {shortnedUrl: shortenedUrl},
        select: {id: true, originalUrl: true, clicks: true, userId: true, expiresAt: true}
    })
    if(!url){
        return res.status(404).send("No such route exists")
    }
    if(url.expiresAt && url.expiresAt <= new Date()){
        return res.status(400).send("This URL has been expired")
    }

    // Update click number

    await prisma.url.update({
        where: {shortnedUrl: shortenedUrl},
        data: {
            clicks: {
                increment: 1
            }
        },
        select: {id: true}
    })
    // Update visitor
    const newVisitor = await prisma.urlVisitor.create({
        data: {
            urlId: url.id,
            ipAddress: req.ip,
            userAgent: req.get("user-agent"),
        }
    })

    await redisClient.del(`user:${url.userId}`)
    return res.status(302).redirect(url.originalUrl)
}