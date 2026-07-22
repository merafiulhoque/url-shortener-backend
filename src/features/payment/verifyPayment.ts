import crypto from "crypto";
import { Request, Response } from "express";
import { AppConfig } from "../../AppConfig.ts";
import { JWT_PAYLOAD } from "../../types/index.ts";
import { updateDB } from "./updateDb.ts";

export async function verifyPayment(req: Request, res: Response) {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const user: JWT_PAYLOAD = req.user;

    if (!user) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // 1. Verify Signature
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
        .createHmac("sha256", AppConfig.RAZORPAY_TEST_KEY_SECRET)
        .update(body.toString())
        .digest("hex");

    if (expectedSignature !== razorpay_signature) {
        return res.status(403).json({
            success: false, // ✅ Fixed this!
            message: "Invalid payment signature"
        });
    }

    // 2. Update Database with a cleaner retry loop
    let dbUpdated = false;
    const MAX_RETRIES = 3;

    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        dbUpdated = await updateDB(user.id);
        if (dbUpdated) break; // Success! Exit the loop.
        console.warn(`DB update attempt ${attempt} failed for user ${user.id}`);
    }

    // 3. Handle DB Failure
    if (!dbUpdated) {
        // TODO: Call Razorpay Refund API here, or log this to an admin Slack channel!
        console.error(`CRITICAL: Payment succeeded but DB failed for user ${user.id}. Payment ID: ${razorpay_payment_id}`);
        
        return res.status(500).json({
            success: false,
            message: "Payment received, but account upgrade failed. Please contact support with your Payment ID."
        });
    }
    
    // 4. Success!
    return res.status(200).json({
        success: true,
        message: "Payment verified and account upgraded!"
    });
}