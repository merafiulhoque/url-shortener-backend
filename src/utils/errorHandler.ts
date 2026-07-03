import { Request, Response, NextFunction } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import { error } from "node:console";


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

    // if (err instanceof JsonWebTokenError){
    //     return res.json({
    //         success: false,
    //         message: err.message
    //     })
    // }
    return res.json({
            success: false,
            message: err.message
        })

}

export class AppError extends Error{
    constructor(public statusCode: number, message: string){
        super(message)
    }
}