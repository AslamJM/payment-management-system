import { handlerError } from "~/lib/handleError"
import { createRegionSchema, updateRegionSchema } from "~/schemas/region"
import {
    createTRPCRouter,
    protectedProcedure,
} from "~/server/api/trpc"

export const regionRouter = createTRPCRouter({
    create: protectedProcedure.input(createRegionSchema).mutation(async ({ ctx, input }) => {
        try {
            const region = await ctx.db.region.create({
                data: input
            })
            return {
                success: true,
                data: region,
                message: "created successfully"
            }
        } catch (error) {
            return handlerError(error)
        }
    }),

    all: protectedProcedure.query(async ({ ctx }) => {
        return ctx.db.region.findMany({ where: { status: true } })
    }),

    update: protectedProcedure.input(updateRegionSchema).mutation(async ({ ctx, input }) => {
        try {
            const updated = await ctx.db.region.update({ where: { id: input.id }, data: input.update })
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