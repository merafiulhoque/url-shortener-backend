import { prisma } from "../../../lib/db.ts";
import { doesExists, shortURL } from "../../url_handling/createShortUrl.ts/shorten.service.ts";

export async function shortenLineByLine(line: string, userId: number){

    if(!line || line.trim() === ""){
        throw new Error("Empty Line")
    }

    const shortCode = shortURL()
    let customAlias = ""
    let password = ""
    let shortenedUrl = shortURL()
    
    while(await doesExists(shortenedUrl)){
        shortenedUrl = shortURL();
    }
    shortenedUrl = (customAlias === "") || (customAlias === undefined) ? shortenedUrl : `${customAlias}/${shortenedUrl}`;
    

    try {

        const exists = await prisma.url.findFirst({
            where: {
                originalUrl: line.trim(),
                userId: userId
            },
            select: {
                id: true
            }
        })

        if(!!exists){
            throw new Error(`URL ${line.trim()}  already exists`)
        }

        const newUrl = await prisma.url.create({
            data: {
                originalUrl: line,
                shortnedUrl: shortenedUrl,
                userId,
                expiresAt: null,
                password: null
            }, 
            select: {
                id: true
            }
        })
        if(!newUrl){
            throw new Error("Error occurred on line ")
        }
        return true
    } catch (error) {
        throw(error)
    }

}