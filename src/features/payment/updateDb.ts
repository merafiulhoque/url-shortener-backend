import { prisma } from "../../lib/db.ts";

// Updated Prisma logic using `try/catch` and `update`
export async function updateDB(userId: number): Promise<boolean> {
    try {
        await prisma.user.update({
            where: { id: userId },
            data: { isPremium: true }
        });
        return true;
    } catch (error) {
        console.error("Prisma update error:", error);
        return false;
    }
}