import { PrismaClient } from "../../generated/prisma/client.js";
import { PrismaPg } from "@prisma/adapter-pg";
import { AppConfig } from "../AppConfig.js";
const adapter = new PrismaPg({
    connectionString: AppConfig.DATABASE_URL,
});
export const prisma = new PrismaClient({
    adapter: adapter,
});
