import { Request, Response } from "express";

export async function signOut(req: Request, res: Response){
    return res
                .clearCookie("token")
                .status(200)
                .json({
                    success: true,
                    message: "Logout Successfull..."
                })
}