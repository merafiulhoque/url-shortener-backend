import {v2 as cloudinary} from "cloudinary"
import { AppConfig } from "../AppConfig.ts"

cloudinary.config({
    cloud_name: AppConfig.CLOUDINARY_CLOUD_NAME,
    api_key: AppConfig.CLOUDINARY_API_KEY,
    api_secret: AppConfig.CLOUDINARY_API_SECRET
})

export default cloudinary