import { Request, Response } from "express";
import { CreateShortUrlPayload, CreateUrl, HelperResponse, JWT_PAYLOAD, URLS } from "../../../types/index.ts";
import { createNewShortenedURL } from "./shorten.service.ts";
import { incrementCacheVersion, redisClient } from "../../../lib/redis.ts";
import { formatDateTime } from "../../../utils/formatDateTime.ts";

export async function createNewUrlController(req: Request, res: Response) {
    const user: JWT_PAYLOAD = req.user;
    if (!user || !user.id) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    const payload: CreateUrl = req.body;
    
    // const hasDurationExpiry =
    //     payload.expiryDuration !== undefined &&
    //     payload.expiryUnit !== undefined;

    // const hasDateExpiry = payload.expiryDate !== undefined

    // if(hasDateExpiry && hasDurationExpiry && (hasDateExpiry === hasDurationExpiry)){
    //     return res.status(400).json({
    //         success: false,
    //         message: "Provide either expiry duration/unit or expiry date",
    //     });
    // }
    // let expiresAt
    // if(hasDurationExpiry){
    //     expiresAt = formatDateTime(payload.expiryDuration, payload.expiryUnit)
    // }

    // if(hasDateExpiry){
    //     expiresAt = payload.expiryDate
    // }

    if (!payload.originalUrl) {
        return res.status(400).json({ message: "Original URL is required" });
    }

    const helperResponse: HelperResponse<URLS> = await createNewShortenedURL(user.id, payload, payload.expiresAt ?? null);

    if (!helperResponse.success || !helperResponse.data) {
        return res.status(400).json(helperResponse);
    }

    // Invalidate the cache instead of patching it.
    // The DB write already succeeded, so a cache failure here
    // must never fail the request — just log and move on.
    // Next GET will rebuild the cache fully and correctly from the DB.
    try {
        await incrementCacheVersion(String(user.id))
    } catch (err) {
        console.error(`Failed to invalidate cache for user:${user.id}`, err);
    }

    return res.status(201).json(helperResponse);
}