import { prisma } from "../../../lib/db.ts"

export async function updateDB(id: number, url: string){
    const updates = await prisma.user.updateMany({
        where: {id},
        data: {
            profilePic: url
        }
    })
    if(updates.count === 0){
        return false
    }
    return true
}