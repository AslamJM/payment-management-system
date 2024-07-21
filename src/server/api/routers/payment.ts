import { type Prisma } from "@prisma/client"
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
    })
})