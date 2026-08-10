import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.ts";
import { signUpcontroller } from "./signup/signup.controller.ts";
import { loginController } from "./login/login.controller.ts";
import { signOut } from "./signout/signout.controller.ts";
import { getUser } from "../../middleware/getUser.ts";
import { JWT_PAYLOAD } from "../../types/index.ts";
import rateLimit from "express-rate-limit";

export const authRouter = Router()

const authApiLimit = rateLimit({
    windowMs: 60*1000, // 1 minute
    limit: 30,
    standardHeaders: "draft-8",
    legacyHeaders: false,
    handler: (req, res, next, options) => {
        return res.status(429).json({
            success: false,
            message: "Too many request, Please try again later.."
        })
    }
})

authRouter.use(authApiLimit)

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