import { Request, Response } from "express";
import { getIp, updateClick, updateVisitor } from "./redirection.controller.ts";
import {  isPasswordOk } from "../../../utils/bcrypt.ts";
import { redisClient } from "../../../lib/redis.ts";

export async function verifyRoutePassword(req: Request, res: Response){
    const { shortenedUrl } = req.params
    const { password }: {password: string} = req.body

    if(typeof shortenedUrl === "object"){
        return res.send("No such route exists")
    }

    const redisEntry = await redisClient.get(`url_password:${shortenedUrl}:${getIp(req)}`)
    if(!redisEntry){
        return res.send("Invalid Request")
    }

    const redisValueUrl: {
        userId: number;
        originalUrl: string;
        id: number;
        password: string;
        clicks: number;
        expiresAt: Date | null;
    } = await JSON.parse(redisEntry)

    const isPassOk = await isPasswordOk(password, redisValueUrl.password)
    if(!isPassOk){
        return res.send("Invalid credentials")
    }
    await updateClick(shortenedUrl)
    await updateVisitor(req, redisValueUrl)
    await redisClient.del(`user:${redisValueUrl.userId}`)
    return res.status(302).redirect(redisValueUrl.originalUrl)
}   