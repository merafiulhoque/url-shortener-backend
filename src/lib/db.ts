import { PrismaClient } from "../generated/prisma/client.ts"
import { PrismaNeon } from "@prisma/adapter-neon";
import { AppConfig } from "../AppConfig.ts";


const adapter = new PrismaNeon({
    connectionString: AppConfig.DATABASE_URL,

})

export const prisma = new PrismaClient({
    adapter: adapter,
})

