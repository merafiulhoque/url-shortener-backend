import { prisma } from "../../../lib/db.js";
import { UserSignUpSchema } from "../../../schemas/SignUpSchema.js";
import { isPasswordOk } from "../../../utils/bcrypt.js";
export function loginDataValidation(data) {
    const result = UserSignUpSchema.safeParse(data);
    if (result.success) {
        return true;
    }
    return false;
}
export async function login(data) {
    const { email, password } = data;
    const user = await prisma.user.findUnique({
        where: { email },
        select: {
            id: true,
            email: true,
            password: true
        }
    });
    if (!user) {
        return {
            success: false,
            message: "Invalid credentials"
        };
    }
    const isPassCorrect = await isPasswordOk(password, user.password);
    if (!isPassCorrect) {
        return {
            success: false,
            message: "Invalid credentials"
        };
    }
    const safeData = getSafeData(user);
    return {
        success: true,
        message: "Login Successfull",
        data: safeData
    };
}
const getSafeData = (user) => {
    const { password, ...safeData } = user;
    return safeData;
};
