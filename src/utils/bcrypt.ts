import bcrypt from "bcryptjs";

export async function hashPassword(password: string): Promise<string>{
    const hash = await bcrypt.hash(password, 10)
    return hash
}

export async function isPasswordOk(password: string, hash: string): Promise<boolean>{
    const isOk = await bcrypt.compare(password, hash)
    return isOk
}