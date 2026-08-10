import { prisma } from "../../../lib/db.ts";
import { redisClient } from "../../../lib/redis.ts";

export async function catchPopularUrls(){
    const popularUrls = await prisma.url.findMany({
        where: {
            OR: [
                {
                    expiresAt: null
                },
                {
                    expiresAt: {
                        gt: new Date()
                    }
                }
            ]
        },
        orderBy: {
            clicks: "desc"
        },
        take: 1000,
        select: {
            userId: true,
            id: true,
            originalUrl: true,
            shortnedUrl: true,
            password: true,
            expiresAt: true,
        },
    })


    await Promise.all(
        popularUrls.map(url => {
            const ttl = getTtl(url.expiresAt);
            redisClient.set(`url:${url.shortnedUrl}`, 
                JSON.stringify({
                    originalUrl: url.originalUrl,
                    password: url.password,
                    expiresAt: url.expiresAt
                }),
                {
                    expiration: {
                        type: "EX",
                        value: ttl ? ttl : 60*60*24
                    }
                }
            )
        })
    )

}   

const getTtl = (expiresAt: Date | null) => {
  if (!expiresAt) {
    return undefined;
  }

  return Math.max(
    1,
    Math.floor(
      (expiresAt.getTime() - Date.now()) / 1000
    )
  );
};