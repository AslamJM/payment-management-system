
import { z } from "zod";

export const createPaymentSchema = z.object({
    invoice_number: z.string(),
    due: z.number(),
    free: z.number(),
    discount: z.number(),
    paid: z.number(),
    saleable_return: z.number(),
    market_return: z.number(),
    total: z.number(),
    payment_status: z.enum(["PAID", "DUE", "CANCELLED"]),
    collector_id: z.number(),
    company_id: z.number(),
    shop_id: z.number(),
    payment_date: z.date()

})

export const updatePaymentSchema = z.object({
    id: z.number(),
    update: createPaymentSchema.partial()

})

export const createPaymentHistorySchema = z.object({
    amount: z.number(),
    date: z.date(),
    payment_id: z.number(),
    collector_id: z.number()
})

export type CreatePaymentInput = z.infer<typeof createPaymentSchema>
export type UpdatePaymentInput = z.infer<typeof updatePaymentSchema>