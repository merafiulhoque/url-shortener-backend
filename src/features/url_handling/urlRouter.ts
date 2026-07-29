import { Router } from "express";
import { getUser } from "../../middleware/getUser.ts";
import {  getAllUrlController } from "./getShortenedUrls.ts/url.controller.ts";
import { asyncHandler } from "../../utils/asyncHandler.ts";
import { createNewUrlController } from "./createShortUrl.ts/shorten.controller.ts";
import { deleteController } from "./deleteShortUrl/deleteController.ts";
import { getStatController } from "./get-stat/getStatController.ts";

export const urlRouter = Router()

urlRouter.use(getUser)

urlRouter.get("/get-all-urls", asyncHandler(getAllUrlController))
urlRouter.post("/create-new-url", asyncHandler(createNewUrlController))
urlRouter.delete("/delete-url", asyncHandler(deleteController))
urlRouter.post("/get-stat", asyncHandler(getStatController))