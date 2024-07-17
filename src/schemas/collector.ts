import { z } from "zod";

export const createCollectorSchema = z.object({
    name: z.string().min(1, "name is required"),
    phone: z.string().min(1, "phone number is required"),
    email: z.string().optional(),
})

export const updateCollectorSchema = z.object({
    id: z.number(),
    update: z.object({
        name: z.string().min(1, "name is required").optional(),
        phone: z.string().min(1, "phone number is required").optional(),
        email: z.string().optional(),
        status: z.boolean().optional()
    })
})

export type CreateCollectorInput = z.infer<typeof createCollectorSchema>
export type UpdateCollectorInput = z.infer<typeof updateCollectorSchema>