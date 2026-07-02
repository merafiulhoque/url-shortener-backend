import dotenv from "dotenv";
dotenv.config();
const DATABASE_URL = process.env.DATABASE_URL;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const PORT = Number(process.env.PORT || 5050);
if (!DATABASE_URL) {
    throw new Error("DATABASE_URL is required");
}
if (!JWT_SECRET_KEY) {
    throw new Error("JWT_SECRET_KEY is required");
}
export const AppConfig = {
    PORT,
    DATABASE_URL,
    JWT_SECRET_KEY,
};
