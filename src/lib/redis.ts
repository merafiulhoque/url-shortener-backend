
import { createClient } from "redis";
import { AppConfig } from "../AppConfig.ts";

export const redisClient = createClient({
    url: AppConfig.REDIS_URL
})

redisClient.on("error", (error) => {
    console.error("ERROR during Redis Connection: ",error)
})

await redisClient.connect()


export async function getRedisCacheVersion(userId: string){
    const version = await redisClient.get(`user:${userId}:urlCacheVersion`)
    return version
}

export async function incrementCacheVersion(userId: string){
    await redisClient.incr(`user:${userId}:urlCacheVersion`)
}