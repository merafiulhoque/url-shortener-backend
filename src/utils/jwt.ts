import jwt from "jsonwebtoken"
import { JWT_PAYLOAD } from "../types/index.ts"
import { AppConfig } from "../AppConfig.ts"
import { AppError } from "./errorHandler.ts"

export const generateToken = (data: JWT_PAYLOAD): string => {
    const token = jwt.sign(data, AppConfig.JWT_SECRET_KEY)
    return token
}

export const decodeToken = (token: string): JWT_PAYLOAD => {
    const decode = jwt.verify(token, AppConfig.JWT_SECRET_KEY)
    if(typeof decode === "string"){
        throw new AppError(422, "Invalid token")
    }
    return decode as JWT_PAYLOAD
}