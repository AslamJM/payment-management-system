import { endOfMonth, startOfMonth } from "date-fns"
import { handlerError } from "~/lib/handleError"
import { createCompanySchema, updateCompanySchema } from "~/schemas/company"
import {
    createTRPCRouter,
    protectedProcedure,
} from "~/server/api/trpc"

export const companyRouter = createTRPCRouter({
    create: protectedProcedure.input(createCompanySchema).mutation(async ({ ctx, input }) => {
        try {
            const created = await ctx.db.company.create({
                data: input
            })
            return {
                success: true,
                data: created,
                message: "created successfully"
            }
        } catch (error) {
            return handlerError(error)
        }
    }),

    all: protectedProcedure.query(async ({ ctx }) => {
        return ctx.db.company.findMany({})
    }),

    update: protectedProcedure.input(updateCompanySchema).mutation(async ({ ctx, input }) => {
        try {
            const updated = await ctx.db.company.update({ where: { id: input.id }, data: input.update })
            return {
                success: true,
                data: updated,
                message: "updated successfully"
            }
        } catch (error) {
            return handlerError(error)
        }
    }),

    paymentsThisMonth: protectedProcedure.query(async ({ ctx }) => {
        const companies = await ctx.db.company.findMany({
            where: { status: true }, select: {
                id: true,
                name: true,
                payments: {
                    select: {
                        total: true,
                        due: true,
                        paid: true
                    },
                    where: {
                        payment_date: {
                            gte: startOfMonth(new Date()),
                            lte: endOfMonth(new Date())
                        }
                    }
                }
            }
        })

        return companies.filter(c => c.payments.length > 0).map(c => ({
            id: c.id,
            name: c.name,
            total: c.payments.reduce((acc, p) => acc + p.total, 0),
            due: c.payments.reduce((acc, p) => acc + p.due, 0),
            paid: c.payments.reduce((acc, p) => acc + p.paid, 0),
        }))
    })
})