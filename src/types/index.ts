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
}

export interface URLS {
    id: number;
    originalUrl: string;
    shortnedUrl: string;
    userId: number;
    clicks: number;
}