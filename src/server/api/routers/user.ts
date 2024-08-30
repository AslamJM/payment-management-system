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

const updateSchema = z.object({
    name: z.string().min(1, "Name is required"),
    username: z.string().min(1, "Username is required"),
    role: z.enum(["ADMIN", "EMPLOYEE"]),
}).partial();

const updateuserSchema = z.object({
    id: z.string(),
    update: updateSchema
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
        const users = await ctx.db.user.findMany({
            select: { id: true, name: true, role: true, username: true }
        })
        return users
    }),

    updateUser: protectedProcedure.input(updateuserSchema).mutation(async ({ ctx, input }) => {
        try {
            const { id, update } = input
            await ctx.db.user.update({ where: { id }, data: update })
            return {
                success: true,
                message: "User updated successfully"
            }
        } catch (error) {
            return handlerError(error)
        }
    }),

    deleteUser: protectedProcedure.input(z.string()).mutation(async ({ ctx, input }) => {
        try {
            await ctx.db.user.delete({ where: { id: input } })
            return {
                success: true,
                message: "User deleted successfully"
            }
        } catch (error) {
            return handlerError(error)
        }
    })
})