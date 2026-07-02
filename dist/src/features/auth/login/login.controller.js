import { login, loginDataValidation } from "./login.service.js";
import { generateToken } from "../../../utils/jwt.js";
import { AppError } from "../../../utils/errorHandler.js";
export async function loginController(req, res) {
    const loginData = req.body;
    const isDataValid = loginDataValidation(loginData);
    if (!isDataValid) {
        return res.status(422).json({
            succes: false,
            message: "Invalid credentials"
        });
    }
    const loginHelperResponse = await login(loginData);
    if (!loginHelperResponse.success && !loginHelperResponse.data) {
        return res.status(403).json(loginHelperResponse);
    }
    if (!loginHelperResponse.data) {
        throw new AppError(500, "Something went wrong...");
    }
    const token = generateToken(loginHelperResponse.data);
    return res
        .status(200)
        .cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        path: "/",
        maxAge: 3600000
    })
        .json(loginHelperResponse);
}
