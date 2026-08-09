import {Request, Response} from "express";
import { getIp, updateClick, updateVisitor } from "./redirection.controller.ts";
import { redisClient } from "../../../lib/redis.ts";
import { isPasswordOk } from "../../../utils/bcrypt.ts";


export async function verifyRoutePasswordWithAlias(req: Request, res: Response){
    const {alias, shortenedUrl} = req.params

    if(typeof alias === "object" || typeof shortenedUrl === "object"){
        return res.send("No such route exists")
    }

    const { password }: {password: string} = req.body

    const redisEntry = await redisClient.get(`url_password:${shortenedUrl}:${getIp(req)}`)

    if(!redisEntry){
        return res.send("Invalid Request")
    }
    const redisUrl: {
        userId: number;
        originalUrl: string;
        id: number;
        password: string;
        clicks: number;
        expiresAt: Date | null;
    } = await JSON.parse(redisEntry)

    const isPassOk = await isPasswordOk(password, redisUrl.password)

    if(!isPassOk){
        return res.send("Invalid credentials")
    }

    await updateClick(`${alias}/${shortenedUrl}`)
    await updateVisitor(req, redisUrl)
    await redisClient.del(`user:${redisUrl.userId}`)
    return res.status(302).redirect(redisUrl.originalUrl)
}