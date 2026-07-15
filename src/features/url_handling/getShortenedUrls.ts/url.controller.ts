import { Request, Response } from "express";
import {  GETAllShortenedURLS } from "./url.service.ts";
import { HelperResponse, URLS } from "../../../types/index.ts";
import { redisClient } from "../../../lib/redis.ts";

export async function getAllUrlController(req: Request, res: Response){
    const user = req.user;
    if(!user || !user.id){
        return res.status(401).json({ message: "Unauthorized" });
    }

    let data = null
    //check data availabe in redis or not
    data = await redisClient.get(`user:${user.id}`)

    //if no data exists then call db , get data and cache redis
    if(!data){
        const helperResponse: HelperResponse<URLS[]> = await GETAllShortenedURLS(user.id);
        if(!helperResponse.success || !helperResponse.data){
            return res.status(404).json(helperResponse);
        }
        await redisClient.set(`user:${user.id}`, JSON.stringify(helperResponse.data))
        return res.status(200).json(helperResponse);
    }
    
    const urls: URLS[] = JSON.parse(data)
    return res.status(200).json({
        success: true,
        message: "URLS fetched successfully",
        data: urls
    })
}

