import express from "express"
const app = express();

//logging
import morgan from "morgan"
app.use(morgan("dev"))

//EXPRESS MIDDLEWARE
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//cookie parser
import cookieParser from "cookie-parser"
app.use(cookieParser())

//CORS configuration
import cors from "cors"
app.use(cors({
    origin: process.env.ALLOWED_ORIGIN!,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST",  "DELETE"]
}))

import { rateLimit } from "express-rate-limit"

const globalLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100,               // 100 requests per IP
  standardHeaders: "draft-8",
  legacyHeaders: false,
});

app.use(globalLimit)

// import and mount routers
import { authRouter } from "./features/auth/router.ts";
app.use("/api/auth", authRouter)

//URL handling Router
import { urlRouter } from "./features/url_handling/urlRouter.ts";
app.use("/api/urls",urlRouter)

// UPLOAD handling router
import { uploadRouter } from "./features/uploads/router.ts";
app.use("/api/uploads", uploadRouter)

//payment handling router
import { paymentRouter } from "./features/payment/router.ts";
app.use("/api/payments", paymentRouter)

//Health Check Routes
app.get("/health", (req, res) => {
    res.send(req.host)
})

// main feature body:: redirection service
import { redirectionController } from "./features/url_handling/redirection/redirection.controller.ts";
import { verifyRoutePassword } from "./features/url_handling/redirection/verifyRoutePassword.ts";
import { redirectWithALias } from "./features/url_handling/redirection/redirectWithAlias.ts";
import { verifyRoutePasswordWithAlias } from "./features/url_handling/redirection/verifyRoutePasswordWithAlias.ts";
import { asyncHandler } from "./utils/asyncHandler.ts";


app.get("/:shortenedUrl", asyncHandler(redirectionController))
app.get("/:alias/:shortenedUrl", asyncHandler(redirectWithALias))
app.post("/:shortenedUrl/verify", asyncHandler(verifyRoutePassword))
app.post("/:alias/:shortenedUrl/verify", asyncHandler(verifyRoutePasswordWithAlias))

//global error handler
import { errorHandler } from "./utils/errorHandler.ts";
app.use(errorHandler)


export default app