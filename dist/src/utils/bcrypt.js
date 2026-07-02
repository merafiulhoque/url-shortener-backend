import bcrypt from "bcryptjs";
export async function hashPassword(password) {
    const hash = await bcrypt.hash(password, 10);
    return hash;
}
export async function isPasswordOk(password, hash) {
    const isOk = await bcrypt.compare(password, hash);
    return isOk;
}
