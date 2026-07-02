import {PrismaClient} from "../../generated/prisma/client.ts"
import { PrismaPg } from "@prisma/adapter-pg";
import { AppConfig } from "../AppConfig.ts";

const adapter = new PrismaPg({
    connectionString: AppConfig.DATABASE_URL,
})

export const prisma = new PrismaClient({
    adapter: adapter,
})

