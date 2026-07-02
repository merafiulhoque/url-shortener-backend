import { prisma } from "../../../lib/db.js";
export const createNewShortenedURL = async (userId, originalUrl) => {
    const isValidUser = await prisma.user.findUnique({
        where: {
            id: userId
        },
        select: {
            id: true
        }
    });
    if (!isValidUser) {
        return {
            success: false,
            message: "User not found"
        };
    }
    let shortenedUrl = shortURL();
    while (await doesExists(shortenedUrl)) {
        shortenedUrl = shortURL();
    }
    const newUrl = await prisma.url.create({
        data: {
            originalUrl,
            shortnedUrl: shortenedUrl,
            userId: isValidUser.id
        }
    });
    return {
        success: true,
        message: "URL created successfully",
        data: newUrl
    };
};
const shortURL = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 7; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
};
const doesExists = async (shortUrl) => {
    const url = await prisma.url.findUnique({
        where: {
            shortnedUrl: shortUrl,
        },
        select: { id: true }
    });
    return !!url;
};
const redirectToOriginalUrl = async (shortenedUrl) => {
    const url = await prisma.url.findUnique({
        where: { shortnedUrl: shortenedUrl },
        select: { originalUrl: true }
    });
    if (!url || !url.originalUrl) {
        return {
            success: false,
            message: "Route does not exists"
        };
    }
    return {
        success: true,
        message: "Redirected successfully"
    };
};
