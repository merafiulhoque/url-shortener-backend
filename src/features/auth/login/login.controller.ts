import { Request, Response } from "express";
import { login, loginDataValidation } from "./login.service.ts";
import { UserSignUpData } from "../../../schemas/SignUpSchema.ts";
import { HelperResponse, JWT_PAYLOAD } from "../../../types/index.ts";
import { generateToken } from "../../../utils/jwt.ts";
import { AppError } from "../../../utils/errorHandler.ts";
import { AppConfig } from "../../../AppConfig.ts";


export async function loginController(req: Request, res: Response){
    const loginData = req.body
    const isDataValid = loginDataValidation(loginData as UserSignUpData)
    if (!isDataValid){
        return res.status(422).json({
            succes: false,
            message: "Invalid credentials"
        })
    }
    const loginHelperResponse: HelperResponse<JWT_PAYLOAD> = await login(loginData as UserSignUpData)
    if(!loginHelperResponse.success && !loginHelperResponse.data){
        return res.status(403).json(loginHelperResponse)
    }
    if(!loginHelperResponse.data){
        throw new AppError(500, "Something went wrong...")
    }
    const token = generateToken(loginHelperResponse.data)
    return res
        .status(200)
        .cookie("token", token, {
            httpOnly: true,
            sameSite: "lax",
            secure: AppConfig.NODE_ENV === "production",
            path: "/",
            maxAge: 3600000            
        })
        .json(loginHelperResponse)
}