import { Request, Response } from "express";
import {  GETAllShortenedURLS } from "./url.service.ts";
import { URLS, HelperResponse, JWT_PAYLOAD } from "../../../types/index.ts";
import { getRedisCacheVersion, redisClient } from "../../../lib/redis.ts";
import { version } from "node:os";
import { prisma } from "../../../lib/db.ts";

export async function getAllUrlController(req: Request, res: Response){
    const user : JWT_PAYLOAD = req.user;
    if(!user || !user.id){
        return res.status(401).json({ message: "Unauthorized" });
    }


    const { page } = req.query

    if(typeof page === "object"){
        return res.status(400).json({
            success: false,
            message: "Invalid request"
        })
    }

    if(!page){
        const urls = await prisma.url.findMany({
            where: {
                userId: user.id
            },
        })
        return res.status(200).json({
            success: true,
            message: "Fetched successfully",
            data: urls
        })
    }

    const pageNo = Number(page)
    const PAGE_SIZE=10
    const CHUNK_SIZE=100
    let cacheVersion = Number(await getRedisCacheVersion(String(user.id)))

    if(!version){
        cacheVersion = 1
    }
    const chunk = Math.floor(((pageNo -1 )* PAGE_SIZE)/CHUNK_SIZE)
    const start = ((pageNo - 1) * PAGE_SIZE) % CHUNK_SIZE;

    let data = null
    //check data availabe in redis or not
    data = await redisClient.get(`user:${user.id}:chunk${chunk}:v${cacheVersion}`)

    //if no data exists then call db , get data and cache redis
    if(!data){
        const helperResponse: HelperResponse<URLS[]> = await GETAllShortenedURLS(user.id, chunk*CHUNK_SIZE, CHUNK_SIZE);
        if(!helperResponse.success || !helperResponse.data){
            return res.status(404).json(helperResponse);
        }
        await redisClient.set(`user:${user.id}:chunk${chunk}:v${cacheVersion}`, JSON.stringify(helperResponse.data),{
            expiration: {
                type: "EX",
                value: 15*60 //15 minutes
            }
        })
        return res.status(200).json({
            ...helperResponse,
            data: helperResponse.data.slice(start, start + PAGE_SIZE)
        });
    }
    
    const urls: URLS[] = JSON.parse(data)
    return res.status(200).json({
        success: true,
        message: "URLS fetched successfully",
        data: urls.slice(start, start + PAGE_SIZE)
    })
}

