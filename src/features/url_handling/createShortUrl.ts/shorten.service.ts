import { prisma } from "../../../lib/db.ts";
import { HelperResponse, URLS } from "../../../types/index.ts";

export const createNewShortenedURL = async (userId: number, originalUrl: string, customAlias: string, expiresAt: Date | null): Promise<HelperResponse<URLS>> => {
    const isValidUser = await prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
            id: true,
            isPremium: true
        }
    })

    if(!isValidUser){
        return {
            success: false,
            message: "User not found"
        };
    }

    if(!isValidUser.isPremium){
        return {
            success: false,
            message: "To use custom alias, Please upgrade to premium"
        }
    }

    const urlExists = await prisma.url.findFirst({
        where: {
            originalUrl: originalUrl,
            userId: userId
        },
    })

    if(!!urlExists){
        return {
            success: false,
            message: "Shortened Version Already Exists, Please Check your dashboard",
        }
    }
    
    let shortenedUrl = customAlias === "" ? shortURL() : `${customAlias}/${shortURL()}`;
    while(await doesExists(shortenedUrl)){
        shortenedUrl = shortURL();
    }

    const newUrl = await prisma.url.create({
        data: {
            originalUrl,
            shortnedUrl: shortenedUrl,
            userId: isValidUser.id,
            expiresAt: expiresAt
        }
    })

    return {
        success: true,
        message: "URL created successfully",
        data: newUrl
    };
}

const shortURL = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 7; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const doesExists = async (shortUrl: string): Promise<boolean> => {
    const url = await prisma.url.findUnique({
        where: {
            shortnedUrl: shortUrl,
        },
        select: {id: true}
    });
    return !!url;
}