import { Request, Response, NextFunction } from "express";
import { prisma } from "../lib/db.ts";

export async function getUserWithDBCall(req: Request, res: Response, next: NextFunction){
    const user = req.user

    if(!user){
        return res.status(401).json({ success: false,  message: "Unauthorized HERE::" });
    }

    const isUserValid = await prisma.user.findUnique({
        where: {id: user.id}
    })
    if(!user){
        return res.status(403).json({ success: false,  message: "Access Denied" });
    }
    next()
}
