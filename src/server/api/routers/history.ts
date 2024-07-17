import { createPaymentHistorySchema } from "~/schemas/payment"
import {
    createTRPCRouter,
    protectedProcedure,
} from "~/server/api/trpc"

export const historyRouter = createTRPCRouter({
    create: protectedProcedure.input(createPaymentHistorySchema).mutation(async ({ ctx, input }) => {
        try {
            const created = await ctx.db.paymentHistory.create({
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
    })

})