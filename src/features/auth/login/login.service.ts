import { prisma } from "../../../lib/db.ts";
import { UserSignUpData, UserSignUpSchema } from "../../../schemas/SignUpSchema.ts";
import { JWT_PAYLOAD, LoginResponseData } from "../../../types/index.ts";
import { isPasswordOk } from "../../../utils/bcrypt.ts";
import { generateToken } from "../../../utils/jwt.ts";

export function loginDataValidation(data: UserSignUpData): boolean{
    const result = UserSignUpSchema.safeParse(data)
    if(result.success){
        return true
    }
    return false
}

export async function login(data: UserSignUpData): Promise<LoginResponseData>{
    const {email, password} = data
    const user = await prisma.user.findUnique({
        where: {email},
        select: {
            id: true,
            email: true,
            password: true,
            profilePic: true
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
    const token = generateToken(safeData)
    
    return {
        success: true,
        message: "Login Successfull",
        token: token,
        user: safeData
    }
    
}

const getSafeData = (user: {id: number, email: string, password: string, profilePic: string | null}): JWT_PAYLOAD => {
    const {password, ...safeData} = user
    return safeData
}