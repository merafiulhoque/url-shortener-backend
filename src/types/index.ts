import { JwtPayload } from "jsonwebtoken"

export interface HelperResponse<T> {
    success: boolean
    message: string
    data?: T
    error?: T
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
}