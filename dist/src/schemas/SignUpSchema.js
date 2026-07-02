import z from "zod";
export const UserSignUpSchema = z.object({
    email: z.email(),
    password: z.string()
});
