import { createPaymentHistorySchema } from "~/schemas/payment"
import {
    createTRPCRouter,
    protectedProcedure,
} from "~/server/api/trpc"

export const historyRouter = createTRPCRouter({
    create: protectedProcedure.input(createPaymentHistorySchema).mutation(async ({ ctx, input }) => {
        try {
            const { amount, payment_id } = input

            const payment = await ctx.db.payment.findUniqueOrThrow({ where: { id: payment_id } })

            const updatePayment = ctx.db.payment.update({
                where: { id: payment_id }, data: {
                    paid: {
                        increment: amount
                    },
                    due: {
                        decrement: amount
                    },
                    payment_status: payment.due === amount ? "PAID" : payment.payment_status
                }
            })

            const created = ctx.db.paymentHistory.create({
                data: input
            })

            await ctx.db.$transaction([updatePayment, created])

            return {
                success: true,
                message: "created successfully"
            }
        } catch (error) {
            return {
                success: false,
                message: "create failed"
            }
        }
    })

})