import { prisma } from "../../../lib/db.ts";

export async function getStatService(id: number) {
    const details = await prisma.url.findUnique({
        where: {id: id},
        select: {
            originalUrl: true,
            shortnedUrl: true,
            createdAt: true,
            expiresAt: true,
            visitors: true
        }
    })

    if(!details){
        return {
            success: false,
            message: "No details found"
        }
    }
    return {
        success: true,
        message: "Fetched successfully",
        data: details
    }
}