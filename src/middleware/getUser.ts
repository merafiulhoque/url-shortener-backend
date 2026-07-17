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
        if(!authheader || !authheader.startsWith("Bearer")){
            return res.status(401).json({ success: false,  message: "Unauthorized" });
        }
        const token = authheader.split(" ")[1]
        if (!token) {
            return res.status(401).json({ success: false,  message: "Unauthorized" });
        }
        const loggedInUser: JWT_PAYLOAD = decodeToken(token);
        req.user = loggedInUser;
        next();
    }
    
}