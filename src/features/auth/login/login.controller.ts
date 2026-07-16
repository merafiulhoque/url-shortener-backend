import { Request, Response } from "express";
import { login, loginDataValidation } from "./login.service.ts";
import { UserSignUpData } from "../../../schemas/SignUpSchema.ts";
import { LoginResponseData } from "../../../types/index.ts";



export async function loginController(req: Request, res: Response){
    const loginData = req.body
    const isDataValid = loginDataValidation(loginData as UserSignUpData)
    if (!isDataValid){
        return res.status(422).json({
            succes: false,
            message: "Invalid credentials"
        })
    }

    const loginHelperResponse: LoginResponseData = await login(loginData as UserSignUpData)
    if(!loginHelperResponse.success || !loginHelperResponse.token || !loginHelperResponse.user){
        return res.status(403).json(loginHelperResponse)
    }
    return res.status(200).json(loginHelperResponse)
}