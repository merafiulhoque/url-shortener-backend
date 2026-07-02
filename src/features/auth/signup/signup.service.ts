import { prisma } from "../../../lib/db.ts";
import { UserSignUpData, UserSignUpSchema } from "../../../schemas/SignUpSchema.ts";
import { HelperResponse } from "../../../types/index.ts";
import { hashPassword } from "../../../utils/bcrypt.ts";

export async function signup(userData: UserSignUpData): Promise<HelperResponse<null>>{
    const {email, password} = userData
    const existingUser = await prisma.user.findUnique({
        where: {email}
    })
    if(existingUser){
        return {
            success: false,
            message: `EMAIL:: ${email} already exists,, Please login...`
        }
    }
    const hash = await hashPassword(password)
    const newUser = await prisma.user.create({
        data: {
            email: email,
            password: hash
        },
        select: {
            email: true,
            id: true
        }
    })
    return {
        success: true,
        message: `EMAIL:: ${email} registered successfully`
    }
}

export function signupDatavalidation(userData: any): boolean{
    const result = UserSignUpSchema.safeParse(userData)
    if(!result.success){
        return false
    }
    return true
}