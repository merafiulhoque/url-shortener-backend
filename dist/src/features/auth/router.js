import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.js";
import { signUpcontroller } from "./signup/signup.controller.js";
import { loginController } from "./login/login.controller.js";
import { signOut } from "./signout/signout.controller.js";
import { getUser } from "../../middleware/getUser.js";
export const authRouter = Router();
authRouter.post("/signup", asyncHandler(signUpcontroller));
authRouter.post("/signin", asyncHandler(loginController));
authRouter.post("/signout", asyncHandler(signOut));
authRouter.get("/get-user", getUser, (req, res) => {
    const user = req.user;
    if (!user || !user.id) {
        return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
    }
    const { email, ...rest } = user;
    return res.status(200).json({
        success: true,
        message: "User fetched successfully",
        data: user
    });
});
