import { signup, signupDatavalidation } from "./signup.service.js";
export async function signUpcontroller(req, res) {
    const userData = req.body;
    const isValid = signupDatavalidation(userData);
    if (!isValid) {
        return res.json({
            success: false,
            message: "Validation error"
        });
    }
    const signUpHelper = await signup(userData);
    return res.status(signUpHelper.success ? 200 : 403).json(signUpHelper);
}
