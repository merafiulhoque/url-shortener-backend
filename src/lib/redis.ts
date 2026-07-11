
import { createClient } from "redis";

export const redisClient = createClient()

redisClient.on("error", (error) => {
    console.error(error)
})

await redisClient.connect()