import { Request, Response, NextFunction } from "express";
import { error } from "node:console";


export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    // if(err instanceof AppError){
    //     return res.status(err.statusCode).json({
    //         success: false,
    //         message: err.message + err.stack + err.cause 
    //     })
    // }
    
    // if(err instanceof Error){
    //     return res.json({
    //         success: false,
    //         message: err.message + err.stack + err.cause
    //     })
    // }
    console.error(err)

    return res.json({
            success: false,
            message: err.message + err.stack + err.code
        })

}

export class AppError extends Error{
    constructor(public statusCode: number, message: string){
        super(message)
    }
}