import { Request, Response } from "express";

export async function signOut(req: Request, res: Response){
    return res
                .status(200)
                .clearCookie("token")
                .json({
                    success: true,
                    message: "Logout Successfull..."
                })
}