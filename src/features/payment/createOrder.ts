import { Request, Response } from "express";
import { RAZORPAY_PAYMENT_OPTIONS } from "../../types/index.ts";
import { razorpay } from "../../lib/razorpay.ts";

export async function createOrder(req: Request, res: Response){
    const { amount } = req.body
    if(!amount) {
        return res.status(422).json({
            success: false,
            message: "Amount undefined"
        })
    }
    const options: RAZORPAY_PAYMENT_OPTIONS = {
        amount: amount*100,
        currency: "INR",
        receipt: "receipt_"+ Date.now()
    }
    const order = await razorpay.orders.create(options)
    return res.status(201).json(order)
}