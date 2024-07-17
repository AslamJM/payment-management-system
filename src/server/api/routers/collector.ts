import { createCollectorSchema, updateCollectorSchema } from "~/schemas/collector"
import {
    createTRPCRouter,
    protectedProcedure,
} from "~/server/api/trpc"

export const collectorRouter = createTRPCRouter({
    create: protectedProcedure.input(createCollectorSchema).mutation(async ({ ctx, input }) => {
        try {
            const created = await ctx.db.collector.create({
                data: input
            })
            return {
                success: true,
                data: created,
                message: "created successfully"
            }
        } catch (error) {
            return {
                success: false,
                data: null,
                message: "create failed"
            }
        }
    }),

    all: protectedProcedure.query(async ({ ctx }) => {
        return ctx.db.collector.findMany({})
    }),

    update: protectedProcedure.input(updateCollectorSchema).mutation(async ({ ctx, input }) => {
        try {
            const updated = await ctx.db.collector.update({ where: { id: input.id }, data: input.update })
            return {
                success: true,
                data: updated,
                message: "updated successfully"
            }
        } catch (error) {
            return {
                success: false,
                data: null,
                message: "update failed"
            }
        }
    })
})