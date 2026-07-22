import { Request, Response } from "express";
import crypto from "crypto"
import { AppConfig } from "../../AppConfig.ts";

export async function verifyPayment(req: Request, res: Response) {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body
    const body = razorpay_order_id + "|" + razorpay_payment_id

    const expectedSignature = crypto
                                    .createHmac("sha256", AppConfig.RAZORPAY_TEST_KEY_SECRET)
                                    .update(body.toString())
                                    .digest("hex")
    if(expectedSignature === razorpay_signature){
        //update db
        return res.status(200).json({
            success: true,
            message: "Payment successfull"
        })
    } else {
        return res.status(403).json({
            success: true,
            message: "Fake Payment"
        })
    }
    
}