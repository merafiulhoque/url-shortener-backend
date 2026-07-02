import { prisma } from "../../../lib/db.ts"
import { HelperResponse, URLS } from "../../../types/index.ts";

export const GETAllShortenedURLS = async (id: number): Promise<HelperResponse<URLS[]>> => {
    const isValidUser = await prisma.user.findUnique({
        where: {
            id: id
        },
        select: {
            id: true
        }
    })

    if(!isValidUser){
        return {
            success: false,
            message: "User not found"
        };
    }
    const urls = await prisma.url.findMany({
        where: {
            userId: isValidUser.id
        }
    })

    return {
        success: true,
        message: urls.length === 0 ? "No URLs found" : "URLs fetched successfully",
        data: urls.length === 0 ? [] : urls
    };
}

