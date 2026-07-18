import dotenv from "dotenv";
dotenv.config({quiet: true, debug: false, });

const DATABASE_URL = process.env.DATABASE_URL;
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
const PORT = Number(process.env.PORT || 5050);
const REDIS_URL = process.env.REDIS_URL

//cloudinary secrets
const CLOUDINARY_CLOUD_NAME = process.env.CLOUDINARY_CLOUD_NAME!
const CLOUDINARY_API_KEY = process.env.CLOUDINARY_API_KEY!
const CLOUDINARY_API_SECRET = process.env.CLOUDINARY_API_SECRET!


if (!DATABASE_URL) {
  throw new Error("DATABASE_URL is required");
}

if (!JWT_SECRET_KEY) {
  throw new Error("JWT_SECRET_KEY is required");
}

if (!REDIS_URL) {
  throw new Error("REDIS URL NOT SET")
}

export const AppConfig = {
  NODE_ENV: process.env.NODE_ENV!,
  PORT,
  DATABASE_URL,
  JWT_SECRET_KEY,
  REDIS_URL,
  CLOUDINARY_CLOUD_NAME,
  CLOUDINARY_API_KEY,
  CLOUDINARY_API_SECRET
};