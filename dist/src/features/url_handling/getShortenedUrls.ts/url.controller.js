import { GETAllShortenedURLS } from "./url.service.js";
export async function getAllUrlController(req, res) {
    const user = req.user;
    if (!user || !user.id) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const helperResponse = await GETAllShortenedURLS(user.id);
    return res.status(200).json(helperResponse);
}
