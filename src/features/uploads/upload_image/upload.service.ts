import { Readable } from "stream"
import cloudinary from "../../../lib/cloudinary.ts"

export const uploadOnCloudinary = async (buffer: Buffer, folder = "uploads") => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream({
            folder, resource_type: "image"
        },
        (error, result) => {
            if(error) return reject(error)
            resolve({
                success: true,
                url: result?.secure_url
            })
        }
    )
        Readable.from(buffer).pipe(uploadStream)
    })
}