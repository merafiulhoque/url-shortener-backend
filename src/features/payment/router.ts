import { Router } from "express";
import { getUser } from "../../middleware/getUser.ts";
import { getUserWithDBCall } from "../../middleware/getUserWithDbCall.ts";
import { createOrder } from "./createOrder.ts";
import { asyncHandler } from "../../utils/asyncHandler.ts";
import { verifyPayment } from "./verifyPayment.ts";
import rateLimit from "express-rate-limit";

export const paymentRouter = Router()

const paymentApiLimit = rateLimit({
    windowMs: 2*60*1000,
    limit: 1,
    handler: (req, res, next, options) => {
        return res.status(429).json({
            success: false,
            message: "Too many payment request, Please try again later.."
        })
    }
})

paymentRouter.use(getUser, getUserWithDBCall)

paymentRouter.post("/create-order", asyncHandler(createOrder))
paymentRouter.post("/verify-payment", asyncHandler(verifyPayment))