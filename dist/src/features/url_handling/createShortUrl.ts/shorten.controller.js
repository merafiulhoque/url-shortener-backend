import { createNewShortenedURL } from "./shorten.service.js";
export async function createNewUrlController(req, res) {
    const user = req.user;
    console.log(user);
    if (!user || !user.id) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const { originalUrl } = req.body;
    if (!originalUrl) {
        return res.status(400).json({ message: "Original URL is required" });
    }
    const helperResponse = await createNewShortenedURL(user.id, originalUrl);
    return res.status(201).json(helperResponse);
}
