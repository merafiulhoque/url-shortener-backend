import { Router } from "express";
import { getUser } from "../../middleware/getUser.ts";
import { getUserWithDBCall } from "../../middleware/getUserWithDbCall.ts";
import { createOrder } from "./createOrder.ts";
import { asyncHandler } from "../../utils/asyncHandler.ts";
import { verifyPayment } from "./verifyPayment.ts";

export const paymentRouter = Router()

paymentRouter.use(getUser, getUserWithDBCall)

paymentRouter.post("/create-order", asyncHandler(createOrder))
paymentRouter.post("/verify-payment", asyncHandler(verifyPayment))