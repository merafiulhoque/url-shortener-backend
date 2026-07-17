import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler.ts";
import { uploadController } from "./upload.controller.ts";
import { getUser } from "../../middleware/getUser.ts";
import { upload } from "../../lib/multer.ts";

export const uploadRouter =  Router()

uploadRouter.post("/upload", getUser, upload.single("image"), asyncHandler(uploadController))