import { EXPIRY_UNITS } from "../types/index.ts";
import { AppError } from "./errorHandler.ts";

export function formatDateTime(expiryDuration: number, expiryUnit: EXPIRY_UNITS): Date | null{
    let expiresAt: Date | null = null
    if (!expiryDuration && !expiryDuration){
        return null
    }
    if (!expiryDuration || !expiryUnit){
        throw new AppError(422, "Invalid Expiry Details")
    }
    const duration = Number(expiryDuration)
    expiresAt = new Date()
    switch (expiryUnit.toLowerCase()) {
        case "minutes":
            expiresAt.setMinutes(expiresAt.getMinutes() + duration);
            break;

        case "hours":
            expiresAt.setHours(expiresAt.getHours() + duration);
            break;

        case "days":
            expiresAt.setDate(expiresAt.getDate() + duration);
            break;

        case "months":
            expiresAt.setMonth(expiresAt.getMonth() + duration);
            break;

        case "years":
            expiresAt.setFullYear(expiresAt.getFullYear() + duration);
            break;

        default:
            throw new AppError(422, "Invalid expiry unit");
    }
    return expiresAt
}