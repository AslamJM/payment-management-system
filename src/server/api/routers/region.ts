import { endOfMonth, startOfMonth } from "date-fns"
import _ from "underscore"
import { z } from "zod"
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
    }),

    paymentsPieChart: protectedProcedure.query(async ({ ctx }) => {
        const date = new Date()
        const payments = await ctx.db.payment.findMany({
            where: {
                payment_date: {
                    gte: startOfMonth(date),
                    lte: endOfMonth(date)
                },
                status: true,
                verified: true
            },

            select: {
                id: true,
                total: true,
                shop: {
                    select: {
                        region: {
                            select: { name: true }
                        }
                    }
                }
            }
        })

        const grouped = _.groupBy(payments, p => p.shop.region.name)
        const response: Array<{
            region: string
            total: number
        }> = []

        _.forEach(grouped, (v, k) => {
            response.push({
                region: k,
                total: v.reduce((a, c) => a + c.total, 0)
            })
        })
        return response
    })
})