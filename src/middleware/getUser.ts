import { Request, Response, NextFunction } from 'express';
import { decodeToken } from '../utils/jwt.ts';
import { JWT_PAYLOAD } from '../types/index.ts';

export function getUser(req: Request, res: Response, next: NextFunction) {
    const cookie = req.cookies.token
    if(cookie){
        const loggedInUser: JWT_PAYLOAD = decodeToken(cookie);
        req.user = loggedInUser;
        next()
    } else {
        const authheader = req.headers.authorization
        if(!authheader){
            return res.status(401).json({ success: false,  message: "Invalid Authorization Header" });
        }
        const parts = authheader.split(" ")

        if (parts.length !== 2 || parts[0] !== "Bearer") {
            return res.status(401).json({ success: false,  message: "Malformed Token" });
        }
        const loggedInUser: JWT_PAYLOAD = decodeToken(parts[1]);
        req.user = loggedInUser;
        next();
    }
    
}