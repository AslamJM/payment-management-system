import { endOfMonth, startOfMonth } from "date-fns"
import _ from "underscore"
import { z } from "zod"
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
                data: input,
                include: { region: true }
            })

            return {
                success: true,
                data: created,
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
            const updated = await ctx.db.shop.update({ where: { id: input.id }, data: input.update, include: { region: true } })
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

    search: protectedProcedure.input(z.string()).query(async ({ ctx, input }) => {
        const shop = await ctx.db.shop.findFirst({
            where: { name: input }, select: {
                payments: {
                    select: {
                        id: true, invoice_number: true, total: true, payment_date: true,
                        due: true, company: { select: { name: true } }
                    },
                    where: { payment_status: "DUE" }
                }
            }
        })
        return shop?.payments
    }),

    duePaymentsForMonth: protectedProcedure.query(async ({ ctx }) => {
        const paymnents = await ctx.db.payment.findMany({
            where: {
                due_date: {
                    gte: startOfMonth(new Date()),
                    lte: endOfMonth(new Date())
                },
                verified: true,
                status: true,
                due: {
                    gt: 0
                }
            },

            select: {
                id: true,
                shop: {
                    select: {
                        name: true,
                        id: true
                    }
                },
                due: true,
                due_date: true
            }
        })

        return paymnents

    })
})