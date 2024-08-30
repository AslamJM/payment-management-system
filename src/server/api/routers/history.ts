import { z } from "zod"
import { handlerError } from "~/lib/handleError"
import { createPaymentHistorySchema, deletePaymentHistorySchema, updateHistoryInputSchema } from "~/schemas/payment"
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
    }),

    getAllForPayment: protectedProcedure.input(z.number()).query(async ({ ctx, input }) => {
        const histories = await ctx.db.paymentHistory.findMany({
            where: { payment_id: input }, include: {
                collector: true
            }
        })
        return histories
    }),

    updateHistory: protectedProcedure.input(updateHistoryInputSchema).mutation(async ({ ctx, input }) => {
        try {
            const { id, paymentId, update } = input
            const history = await ctx.db.paymentHistory.findUniqueOrThrow({ where: { id } })

            const transactions = []
            const updated = ctx.db.paymentHistory.update({ where: { id }, data: update })
            transactions.push(updated)

            if (update.amount) {
                const { amount } = update
                const diff = history.amount - amount
                const updatedPayment = ctx.db.payment.update({
                    where: { id: paymentId },
                    data: {
                        paid: diff > 0 ? { decrement: Math.abs(diff) } : { increment: Math.abs(diff) },
                        due: diff > 0 ? { increment: Math.abs(diff) } : { decrement: Math.abs(diff) },

                    }
                })
                transactions.push(updatedPayment)
            }

            await ctx.db.$transaction(transactions)

            return {
                success: true,
                message: "History updated successfully"
            }


        } catch (error) {
            return handlerError(error)
        }
    }),

    deleteHistory: protectedProcedure.input(deletePaymentHistorySchema).mutation(async ({ ctx, input }) => {
        try {
            const history = await ctx.db.paymentHistory.findUniqueOrThrow({ where: { id: input.id } })
            const transaction = []
            const del = ctx.db.paymentHistory.delete({ where: { id: input.id } })
            transaction.push(del)
            const amount = history.amount
            const updatedPayment = ctx.db.payment.update({
                where: { id: input.payment_id }, data: {
                    paid: { decrement: amount },
                    due: { increment: amount }
                }
            })
            transaction.push(updatedPayment)
            await ctx.db.$transaction(transaction)
            return {
                success: true,
                message: "History deleted successfully"
            }
        } catch (error) {
            return handlerError(error)
        }
    })

})