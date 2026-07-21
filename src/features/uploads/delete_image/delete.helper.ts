import cloudinary from "../../../lib/cloudinary.ts";
import { HelperResponse } from "../../../types/index.ts";

export async function deleteOnCloudinary(publicId: string): Promise<HelperResponse<null>>{
    const result = await cloudinary.uploader.destroy(publicId)
    console.log(result)
    if(result.result !== "ok" && result.result !== "not found"){
        return {
            success: false,
            message: "Failed to delete Image",
        }
    }
    return {
        success: true,
        message: "Deleted Successfully",
    }
}

