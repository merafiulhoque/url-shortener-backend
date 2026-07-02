import jwt from "jsonwebtoken";
import { AppConfig } from "../AppConfig.js";
import { AppError } from "./errorHandler.js";
export const generateToken = (data) => {
    const token = jwt.sign(data, AppConfig.JWT_SECRET_KEY);
    return token;
};
export const decodeToken = (token) => {
    const decode = jwt.verify(token, AppConfig.JWT_SECRET_KEY);
    if (typeof decode === "string") {
        throw new AppError(422, "Invalid token");
    }
    return decode;
};
