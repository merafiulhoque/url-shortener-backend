import { Request, Response, NextFunction } from 'express';
import { decodeToken } from '../utils/jwt.ts';
import { JWT_PAYLOAD } from '../types/index.ts';

export function getUser(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies?.token
    if (!token) {
        return res.status(401).json({ success: false,  message: "Unauthorized" });
    }

    const loggedInUser: JWT_PAYLOAD = decodeToken(token);
    req.user = loggedInUser;
    next();
}