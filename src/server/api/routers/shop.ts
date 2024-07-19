import { handlerError } from "~/lib/handleError"
import { createShopSchema, updateShopSchema } from "~/schemas/shop"
import {
    createTRPCRouter,
    protectedProcedure,
} from "~/server/api/trpc"

export const shopRouter = createTRPCRouter({
    create: protectedProcedure.input(createShopSchema).mutation(async ({ ctx, input }) => {
        try {
            const created = await ctx.db.shop.create({
                data: input
            })
            const withStore = await ctx.db.shop.findFirst({ where: { id: created.id }, include: { region: true } })
            return {
                success: true,
                data: withStore,
                message: "created successfully"
            }
        } catch (error) {
            handlerError(error)
        }
    }),

    all: protectedProcedure.query(async ({ ctx }) => {
        return ctx.db.shop.findMany({ include: { region: true } })
    }),

    update: protectedProcedure.input(updateShopSchema).mutation(async ({ ctx, input }) => {
        try {
            const updated = await ctx.db.shop.update({ where: { id: input.id }, data: input.update })
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