import { Request, Response, NextFunction } from "express";
import { success } from "zod";

export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof AppError){
        return res.status(err.statusCode).json({
            success: false,
            message: err.message
        })
    }
    
    if(err instanceof Error){
        return res.json({
            success: false,
            message: err.message
        })
    }
}

export class AppError extends Error{
    constructor(public statusCode: number, message: string){
        super(message)
    }
}