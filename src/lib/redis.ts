
import { createClient } from "redis";
import { AppConfig } from "../AppConfig.ts";

export const redisClient = createClient({
    url: AppConfig.REDIS_URL
})

redisClient.on("error", (error) => {
    console.log(AppConfig.REDIS_URL)
    console.error("ERROR during Redis Connection: ",error)
})

await redisClient.connect()