import { type Prisma } from "@prisma/client"
import { number, z } from "zod"
import { createPaymentSchema, paymentQueryParams, updatePaymentSchema } from "~/schemas/payment"
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
            await ctx.db.paymentHistory.create({ data: { amount: input.paid, date: input.payment_date, collector_id: input.collector_id, payment_id: created.id } })
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

    all: protectedProcedure.input(paymentQueryParams).query(async ({ ctx, input }) => {
        try {
            let params: Prisma.PaymentFindManyArgs['where'] = { status: true }
            let take = 100

            if (input) {

                if (input.where) {
                    params = { ...input.where, status: true }
                }

                if (input.take) {
                    take = input.take
                }

            }

            return ctx.db.payment.findMany({
                where: params,
                include: {
                    shop: {
                        include: { region: true }
                    },
                    collector: true,
                    company: true
                },
                take
            })
        } catch (error) {
            console.log(error)
        }
    }),

    update: protectedProcedure.input(updatePaymentSchema).mutation(async ({ ctx, input }) => {
        try {
            const updated = await ctx.db.payment.update({
                where: { id: input.id }, data: input.update, include: {
                    shop: {
                        include: { region: true }
                    },
                    collector: true,
                    company: true
                }
            })
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
    }),

    verifyPayments: protectedProcedure.input(z.array(number())).mutation(async ({ ctx, input }) => {
        try {
            await ctx.db.payment.updateMany({ where: { id: { in: input } }, data: { verified: true } })
            return {
                success: true,
                message: "verification success"
            }
        } catch (error) {
            return {
                success: false,
                message: "verification failed"
            }
        }
    }),

    duePaymentsShop: protectedProcedure.input(z.number()).query(async ({ ctx, input }) => {
        const shop_id = input

        const payments = ctx.db.payment.findMany({
            where: {
                shop_id, status: true, due: {
                    gt: 0
                }
            },
            select: {
                id: true,
                payment_date: true,
                invoice_number: true,
                company: {
                    select: {
                        name: true
                    },

                },
                total: true,
                due: true
            }
        })

        return payments
    }),

    searchInvoice: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
        const payment = await ctx.db.payment.findUnique({
            where: { invoice_number: input }, select: {
                id: true,
                payment_date: true,
                invoice_number: true,
                company: {
                    select: {
                        name: true
                    },

                },
                total: true,
                due: true
            }
        })
        return payment
    })
})