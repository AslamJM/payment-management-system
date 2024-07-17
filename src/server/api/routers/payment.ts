import { createPaymentSchema, updatePaymentSchema } from "~/schemas/payment"
import {
    createTRPCRouter,
    protectedProcedure,
} from "~/server/api/trpc"

export const paymentRouter = createTRPCRouter({
    create: protectedProcedure.input(createPaymentSchema).mutation(async ({ ctx, input }) => {
        try {
            const created = await ctx.db.payment.create({
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
        return ctx.db.payment.findMany({
            where: { status: true },
            include: {
                shop: {
                    include: { region: true }
                },
                collector: true,
                company: true
            }
        })
    }),

    update: protectedProcedure.input(updatePaymentSchema).mutation(async ({ ctx, input }) => {
        try {
            const updated = await ctx.db.payment.update({ where: { id: input.id }, data: input.update })
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