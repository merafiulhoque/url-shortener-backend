import { prisma } from "../../../lib/db.ts";
import { UserSignUpData, UserSignUpSchema } from "../../../schemas/SignUpSchema.ts";
import { HelperResponse, JWT_PAYLOAD } from "../../../types/index.ts";
import { isPasswordOk } from "../../../utils/bcrypt.ts";
import { generateToken } from "../../../utils/jwt.ts";

export function loginDataValidation(data: UserSignUpData): boolean{
    const result = UserSignUpSchema.safeParse(data)
    if(result.success){
        return true
    }
    return false
}

export async function login(data: UserSignUpData): Promise<HelperResponse<JWT_PAYLOAD>>{
    const {email, password} = data
    const user = await prisma.user.findUnique({
        where: {email},
        select: {
            id: true,
            email: true,
            password: true
        }
    })
    if(!user){
        return {
            success: false,
            message: "Invalid credentials"
        }
    }
    const isPassCorrect = await isPasswordOk(password, user.password)
    if(!isPassCorrect){
        return {
            success: false,
            message: "Invalid credentials"
        }
    }
    const safeData: JWT_PAYLOAD = getSafeData(user)
    return {
        success: true,
        message: "Login Successfull",
        data: safeData
    }
    
}

const getSafeData = (user: {id: number, email: string, password: string}): JWT_PAYLOAD => {
    const {password, ...safeData} = user
    return safeData
}