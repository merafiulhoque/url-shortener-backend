import { Router } from "express";
import { getUser } from "../../middleware/getUser.ts";
import { getUserWithDBCall } from "../../middleware/getUserWithDbCall.ts";
import { txtUpload } from "../../lib/multer.ts";
import { asyncHandler } from "../../utils/asyncHandler.ts";
import { txtUploadController } from "./bulkProcessing/txtUploadController.ts";
import { getJobs } from "./bulkJobDetails/getJobs.ts";
import { getJobDetails } from "./BulkJob/getJobDetails.ts";
import { getErrorLog } from "./error_log/getErrorLog.ts";


export const bulkRouter = Router()

bulkRouter.use(getUser, getUserWithDBCall)

bulkRouter.post("/text", txtUpload.single("text"), asyncHandler(txtUploadController))
bulkRouter.get("/jobs", asyncHandler(getJobs))
bulkRouter.get("/jobs/:id", asyncHandler(getJobDetails))
bulkRouter.delete("jobs/:id", asyncHandler(getJobDetails))
bulkRouter.get("/jobs/error-log/:id", asyncHandler(getErrorLog))