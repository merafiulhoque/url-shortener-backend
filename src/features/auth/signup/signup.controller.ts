import { Request, Response } from "express";
import { UserSignUpData, UserSignUpSchema } from "../../../schemas/SignUpSchema.ts";
import { signup, signupDatavalidation } from "./signup.service.ts";
import { HelperResponse } from "../../../types/index.ts";

export async function signUpcontroller(req: Request, res: Response){
    const userData = req.body
    const isValid = signupDatavalidation(userData)
    if(!isValid){
        return res.json({
            success: false,
            message: "Validation error"
        })
    }
    const signUpHelper: HelperResponse<null> = await signup(userData as UserSignUpData)
    return res.status(signUpHelper.success ? 200 : 403).json(signUpHelper)
}