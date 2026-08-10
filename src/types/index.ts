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



export interface RAZORPAY_PAYMENT_OPTIONS {
    amount: number
    currency: "INR" | "USD"
    receipt: string
}

export type EXPIRY_UNITS = "" | "minutes" | "hours" | "days" | "months" | "weeks" | "years"

export type CreateShortUrlPayload =
  | {
      originalUrl: string;
      customAlias: string;
      password: string;
      expiryDuration: number;
      expiryUnit: EXPIRY_UNITS;
      expiryDate?: never;
    }
  | {
      originalUrl: string;
      customAlias: string;
      password: string;
      expiryDate: Date;
      expiryDuration?: never;
      expiryUnit?: never;
    };

export type CreateUrl = {
    originalUrl: string
    customAlias: string
    password: string
    expiresAt: Date | null
}

export interface URLS {
    id: number;
    originalUrl: string;
    shortnedUrl: string;
    userId: number;
    clicks: number;
    createdAt: Date;
    updatedAt: Date;
    expiresAt: Date | null;
}

export interface Visitor {
    id: number;
    urlId: number;
    ipAddress?: string
    userAgent?: string
    visitedAt?: Date;
}

export interface UrlStatData {
    shortnedUrl: string;
    originalUrl: string;
    createdAt: Date;
    expiresAt?: Date
    visitors?: Visitor[]
}
