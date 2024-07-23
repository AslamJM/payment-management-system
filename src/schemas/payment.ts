
import { z } from "zod";

import {
    type Region,
    type Payment,
    type Shop,
    type Collector,
    type Company,

} from "@prisma/client";

export type WholePayment = Payment & { company: Company; shop: Shop & { region: Region }; collector: Collector }

export const zNumber = z.string().transform((val) => val === "" ? 0 : Number(val)).refine(val => !isNaN(Number(val)), {
    message: "not a number"
})

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

export const paymentSchemaRhf = z.object({
    invoice_number: z.string(),
    due: z.number(),
    free: z.number(),
    discount: z.number(),
    paid: z.number(),
    saleable_return: z.number(),
    market_return: z.number(),
    total: z.number(),
    payment_status: z.enum(["PAID", "DUE", "CANCELLED"]),
    collector_id: z.number().nullable(),
    company_id: z.number().nullable(),
    shop_id: z.number().nullable(),
    payment_date: z.date(),
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

const paymentQueryWhere = z.object({
    collector_id: z.number(),
    shop_id: z.number(),
    company_id: z.number(),
    invoice_number: z.string(),
    payment_status: z.enum(["PAID", "DUE", "CANCELLED"]),
    payment_date: z.object({
        gt: z.date(),
        lt: z.date(),
        equals: z.date()
    }).partial(),
    verified: z.boolean(),
    shop: z.object({
        region_id: z.number()
    }).optional()

}).partial()

export const paymentQueryParams = z.object({
    where: paymentQueryWhere,
    take: z.number().optional()
}).partial()




export type PaymentQueryParams = z.infer<typeof paymentQueryParams>
export type CreatePaymentInput = z.infer<typeof paymentSchemaRhf>
export type UpdatePaymentInput = z.infer<typeof updatePaymentSchema>
export type PaymentQueryWhere = z.infer<typeof paymentQueryWhere>

export type PaymentCreate = z.infer<typeof createPaymentSchema>

export function createDefaultValues(data: WholePayment | null): CreatePaymentInput {
    if (!data) {
        return {
            total: 0, paid: 0, discount: 0, due: 0,
            free: 0, market_return: 0,
            saleable_return: 0, invoice_number: "",
            payment_status: "PAID", payment_date: new Date(),
            collector_id: null, company_id: null, shop_id: null
        }
    }
    return {
        total: data.total, paid: data.paid, discount: data.discount, due: data.due,
        free: data.free, market_return: data.market_return,
        saleable_return: data.saleable_return, invoice_number: data.invoice_number,
        payment_status: data.payment_status, payment_date: data.payment_date,
        collector_id: data.collector_id, company_id: data.company_id, shop_id: data.shop_id
    }
}