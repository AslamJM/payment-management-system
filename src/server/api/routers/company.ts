import { handlerError } from "~/lib/handleError"
import { createCompanySchema, updateCompanySchema } from "~/schemas/company"
import {
    createTRPCRouter,
    protectedProcedure,
} from "~/server/api/trpc"

export const companyRouter = createTRPCRouter({
    create: protectedProcedure.input(createCompanySchema).mutation(async ({ ctx, input }) => {
        try {
            const created = await ctx.db.company.create({
                data: input
            })
            return {
                success: true,
                data: created,
                message: "created successfully"
            }
        } catch (error) {
            return handlerError(error)
        }
    }),

    all: protectedProcedure.query(async ({ ctx }) => {
        return ctx.db.company.findMany({})
    }),

    update: protectedProcedure.input(updateCompanySchema).mutation(async ({ ctx, input }) => {
        try {
            const updated = await ctx.db.company.update({ where: { id: input.id }, data: input.update })
            return {
                success: true,
                data: updated,
                message: "updated successfully"
            }
        } catch (error) {
            return handlerError(error)
        }
    })
})