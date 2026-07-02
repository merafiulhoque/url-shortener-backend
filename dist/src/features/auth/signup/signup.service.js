import { prisma } from "../../../lib/db.js";
import { UserSignUpSchema } from "../../../schemas/SignUpSchema.js";
import { hashPassword } from "../../../utils/bcrypt.js";
export async function signup(userData) {
    const { email, password } = userData;
    const existingUser = await prisma.user.findUnique({
        where: { email }
    });
    if (existingUser) {
        return {
            success: false,
            message: `EMAIL:: ${email} already exists,, Please login...`
        };
    }
    const hash = await hashPassword(password);
    const newUser = await prisma.user.create({
        data: {
            email: email,
            password: hash
        },
        select: {
            email: true,
            id: true
        }
    });
    return {
        success: true,
        message: `EMAIL:: ${email} registered successfully`
    };
}
export function signupDatavalidation(userData) {
    const result = UserSignUpSchema.safeParse(userData);
    if (!result.success) {
        return false;
    }
    return true;
}
