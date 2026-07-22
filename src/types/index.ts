import { JwtPayload } from "jsonwebtoken"

export interface HelperResponse<T> {
    success: boolean
    message: string
    data?: T
}

export interface LoginResponseData {
    success: boolean
    message: string
    token?: string
    user?: JWT_PAYLOAD
}

export interface JWT_PAYLOAD extends JwtPayload {
    id: number
    email: string
    profilePic: string | null
    isPremium: boolean
}

export interface URLS {
    id: number;
    originalUrl: string;
    shortnedUrl: string;
    userId: number;
    clicks: number;
}

export interface RAZORPAY_PAYMENT_OPTIONS {
    amount: number
    currency: "INR" | "USD"
    receipt: string
}