import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.ts";
import { getUser } from "../../middleware/getUser.ts";
import { upload } from "../../lib/multer.ts";
import { uploadController } from "./upload_image/upload.controller.ts";
import { deleteController } from "./delete_image/delete.controller.ts";

export const uploadRouter =  Router()

uploadRouter.post("/upload", getUser, upload.single("image"), asyncHandler(uploadController))
uploadRouter.delete("/delete", getUser, asyncHandler(deleteController))