import { prisma } from "../../../lib/db.ts";
import { CreateShortUrlPayload, CreateUrl, HelperResponse, URLS } from "../../../types/index.ts";
import { hashPassword } from "../../../utils/bcrypt.ts";

export const createNewShortenedURL = async (userId: number, payload: CreateUrl,  expiresAt: Date | null): Promise<HelperResponse<URLS>> => {
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

    console.log(payload)

    if(!!payload.customAlias && !isValidUser.isPremium){
        return {
            success: false,
            message: "To use custom alias, Please upgrade to premium"
        }
    }

    const urlExists = await prisma.url.findFirst({
        where: {
            originalUrl: payload.originalUrl,
            userId: userId
        },
    })

    if(!!urlExists){
        return {
            success: false,
            message: "Shortened Version Already Exists, Please Check your dashboard",
        }
    }
    
    let shortenedUrl = (payload.customAlias === "") || (payload.customAlias === undefined) ? shortURL() : `${payload.customAlias}/${shortURL()}`;
    while(await doesExists(shortenedUrl)){
        shortenedUrl = shortURL();
    }

    let hash: string  = ""

    if (!!payload.password && payload.password !== ""){
        hash = await hashPassword(payload.password)
    }

    const newUrl = await prisma.url.create({
        data: {
            originalUrl: payload.originalUrl,
            shortnedUrl: shortenedUrl,
            userId: isValidUser.id,
            expiresAt: expiresAt,
            password: hash === "" ? null : hash
        },
        select: {
            originalUrl: true,
            shortnedUrl: true,
            id: true,
            userId: true,
            createdAt: true,
            updatedAt: true,
            expiresAt: true,
            clicks: true
        }
    })

    return {
        success: true,
        message: "URL created successfully",
        data: newUrl
    };
}

export const shortURL = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 7; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export const doesExists = async (shortUrl: string): Promise<boolean> => {
    const url = await prisma.url.findUnique({
        where: {
            shortnedUrl: shortUrl,
        },
        select: {id: true}
    });
    return !!url;
}