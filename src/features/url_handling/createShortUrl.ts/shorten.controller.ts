import { Request, Response } from "express";
import { HelperResponse, URLS } from "../../../types/index.ts";
import { createNewShortenedURL } from "./shorten.service.ts";
import { redisClient } from "../../../lib/redis.ts";

export async function createNewUrlController(req: Request, res: Response) {
    const user = req.user;
    if (!user || !user.id) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const { originalUrl }: { originalUrl: string } = req.body;
    if (!originalUrl) {
        return res.status(400).json({ message: "Original URL is required" });
    }

    const helperResponse: HelperResponse<URLS> = await createNewShortenedURL(user.id, originalUrl);

    if (!helperResponse.success || !helperResponse.data) {
        return res.status(400).json(helperResponse);
    }

    // Invalidate the cache instead of patching it.
    // The DB write already succeeded, so a cache failure here
    // must never fail the request — just log and move on.
    // Next GET will rebuild the cache fully and correctly from the DB.
    try {
        await redisClient.del(`user:${user.id}`);
    } catch (err) {
        console.error(`Failed to invalidate cache for user:${user.id}`, err);
    }

    return res.status(201).json(helperResponse);
}