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

// import and mount routers
import { authRouter } from "./features/auth/router.ts";
app.use("/api/auth/", authRouter)

//URL handling Router
import { urlRouter } from "./features/url_handling/urlRouter.ts";
app.use("/api/urls",urlRouter)

app.get("/health", (req, res) => {
    res.send(req.host)
})

app.get("/:shortenedUrl", asyncHandler(redirectionController))

//global error handler
import { errorHandler } from "./utils/errorHandler.ts";
import { redirectionController } from "./features/url_handling/redirection/redirection.controller.ts";
import { asyncHandler } from "./utils/asyncHandler.ts";
app.use(errorHandler)


export default app