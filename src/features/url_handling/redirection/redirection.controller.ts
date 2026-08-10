import {Request, Response} from "express";
import { prisma } from "../../../lib/db.ts";
import { redisClient } from "../../../lib/redis.ts";

export async function redirectionController(req: Request, res: Response){
    const { shortenedUrl } = req.params;
    if(typeof shortenedUrl === "object"){
        return res.send("No such route exists")                
    }

    const redisEntry = await redisClient.get(`url:${shortenedUrl}`)

    if(!!redisEntry){
        const redisUrl: {
            originalUrl: string,
            password: string | null,
            expiresAt: Date | null,
            userId: number,
            id: number
        } = await JSON.parse(redisEntry)

        if(redisUrl.expiresAt && redisUrl.expiresAt <= new Date()){
            return res.status(400).send("This URL has been expired")
        }

        if(!redisUrl.password){
            await updateClick(shortenedUrl)
            await updateVisitor(req, redisUrl)
            await redisClient.del(`user:${redisUrl.userId}`)
            return res.status(302).redirect(redisUrl.originalUrl)
        }

    }

    const url = await getUrlByShortCode(shortenedUrl)
    if(!url){
        return res.status(404).send("No such route exists")
    }

    if(url.expiresAt && url.expiresAt <= new Date()){
        return res.status(400).send("This URL has been expired")
    }

    if(!url.password){
        await updateClick(shortenedUrl)
        await updateVisitor(req, url)
        await redisClient.del(`user:${url.userId}`)
        return res.status(302).redirect(url.originalUrl)
    }

    await redisClient.set(`url_password:${shortenedUrl}:${getIp(req)}`, JSON.stringify(url), {
        expiration: {
            type: "EX",
            value: 15 
        }
    })

    // Password protected → show password form
    return res.send(`
        <html>
        <body>
            <h2>Password required</h2>

            <form method="POST" action="/${shortenedUrl}/verify">
            <input
                type="password"
                name="password"
                placeholder="Password"
                required
            />

            <button type="submit">
                Continue
            </button>
            </form>
        </body>
        </html>
    `);
    

    
}

export async function updateClick(shortenedUrl: string){
    // Update click number

    console.log("SEARCHING:: ", shortenedUrl)
    await prisma.url.update({
        where: {
            shortnedUrl: shortenedUrl
        },
        data: {
            clicks: {
                increment: 1
            }
        },
        select: {id: true}
    })
    
}

export async function updateVisitor(req: Request, url: any){
    // Update visitor

    const newVisitor = await prisma.urlVisitor.create({
        data: {
            urlId: url.id,
            ipAddress: getIp(req),
            userAgent: req.get("user-agent"),
        }
    })
}

export async function getUrlByShortCode(shortenedUrl: string){
    const url = await prisma.url.findUnique({
        where: {shortnedUrl: shortenedUrl},
        select: {
            id: true, 
            originalUrl: true, 
            clicks: true, 
            userId: true, 
            expiresAt: true,
            password: true
        }
    })
    return url
}

export function getIp(req: Request){

    let ipString = ""
    const forwardedHeader = req.headers["x-forwarded-for"]
    
    if (!!forwardedHeader){
        ipString = Array.isArray(forwardedHeader) ? forwardedHeader[0] : forwardedHeader
    }
    if (!forwardedHeader){
        ipString = req.ip ?? "Unknown IP"
    }
    return ipString
}