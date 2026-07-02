import { decodeToken } from "../utils/jwt.js";
export function getUser(req, res, next) {
    const token = req.cookies?.token;
    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    const loggedInUser = decodeToken(token);
    req.user = loggedInUser;
    next();
}
