import { z } from "zod";
import {
    createTRPCRouter,
    protectedProcedure,
} from "~/server/api/trpc";

import { db } from "~/server/db";

const loginSchema = z.object({
    email: z.string().min(1),
    password: z.string().min(1),
    name: z.string(),
    role: z.enum(["SUPER_ADMIN", "ADMIN", "EMPLOYEE"])
})

export const userRouter = createTRPCRouter({
    create: protectedProcedure.input(loginSchema).mutation(async ({ input }) => {
        try {
            const user = await db.user.create({ data: input })
            return user
        } catch (error) {
            return null
        }
    })
})