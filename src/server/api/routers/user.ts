import { z } from "zod";
import { handlerError } from "~/lib/handleError";
import {
    createTRPCRouter,
    protectedProcedure,
} from "~/server/api/trpc";


const loginSchema = z.object({
    username: z.string().min(1),
    password: z.string().min(1),
    name: z.string(),
    role: z.enum(["ADMIN", "EMPLOYEE"])
})

export const userRouter = createTRPCRouter({
    create: protectedProcedure.input(loginSchema).mutation(async ({ input, ctx }) => {
        try {
            await ctx.db.user.create({ data: input })
            return {
                success: true,
                message: "user created successfully"
            }
        } catch (error) {
            return handlerError(error)
        }
    }),
    getAll: protectedProcedure.query(async ({ ctx }) => {
        const users = await ctx.db.user.findMany()
        return users
    })
})