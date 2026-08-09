import {Request, Response} from "express";
import { redisClient } from "../../../lib/redis.ts";
import { getIp, getUrlByShortCode, updateClick, updateVisitor } from "./redirection.controller.ts";


export async function redirectWithALias(req: Request, res: Response) {
    const {alias, shortenedUrl} = req.params

    console.log(alias,shortenedUrl)

    if(typeof alias === "object" || typeof shortenedUrl === "object"){
        return res.send("No such route exists")
    }

    const url = await getUrlByShortCode(`${alias}/${shortenedUrl}`)

    console.log(url)

    if(!url){
        return res.status(404).send("No such route exists")
    }

    if(url.expiresAt && url.expiresAt <= new Date()){
        return res.status(400).send("This URL has been expired")
    }

    if(!url.password){
        console.log("ERROR HERE")
        await updateClick(`${alias}/${shortenedUrl}`)
        console.log("ERROR HERE")

        await updateVisitor(req, url)
        console.log("ERROR HERE")

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
    
                <form method="POST" action="/${alias}/${shortenedUrl}/verify">
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