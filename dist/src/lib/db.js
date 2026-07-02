import { PrismaClient } from "../generated/prisma/client.js";
import { PrismaNeon } from "@prisma/adapter-neon";
import { AppConfig } from "../AppConfig.js";
const adapter = new PrismaNeon({
    connectionString: AppConfig.DATABASE_URL,
});
export const prisma = new PrismaClient({
    adapter: adapter,
});
