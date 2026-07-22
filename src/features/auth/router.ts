import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.ts";
import { signUpcontroller } from "./signup/signup.controller.ts";
import { loginController } from "./login/login.controller.ts";
import { signOut } from "./signout/signout.controller.ts";
import { getUser } from "../../middleware/getUser.ts";
import { JWT_PAYLOAD } from "../../types/index.ts";

export const authRouter = Router()

authRouter.post("/signup", asyncHandler(signUpcontroller))
authRouter.post("/signin", asyncHandler(loginController))
authRouter.post("/signout", asyncHandler(signOut))

authRouter.get("/get-user", getUser, (req, res) =>{
    const user: JWT_PAYLOAD = req.user
    if(!user || !user.id){
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        })
    }
    
    return res.status(200).json({
        success: true,
        message: "User fetched successfully",
        data: user
    })
})