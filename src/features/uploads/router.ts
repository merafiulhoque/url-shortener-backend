import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.ts";
import { getUser } from "../../middleware/getUser.ts";
import { imageUpload, txtUpload } from "../../lib/multer.ts";
import { uploadController } from "./upload_image/upload.controller.ts";
import { deleteController } from "./delete_image/delete.controller.ts";
import { txtUploadController } from "./upload_txt/txtUploadController.ts";

export const uploadRouter =  Router()

uploadRouter.post("/upload", getUser, imageUpload.single("image"), asyncHandler(uploadController))
uploadRouter.post("/upload-txt", getUser, txtUpload.single("text"), asyncHandler(txtUploadController))
uploadRouter.delete("/delete", getUser, asyncHandler(deleteController))