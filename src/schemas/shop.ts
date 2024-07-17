import { z } from "zod";

export const createShopSchema = z.object({
    name: z.string().min(1, "name is required"),
    address: z.string().min(1, "name is required"),
    region_id: z.number()
})

export const updateShopSchema = z.object({
    id: z.number(),
    update: z.object({
        name: z.string().min(1, "name is required").optional(),
        address: z.string().min(1, "name is required").optional(),
        region_id: z.number().optional(),
        status: z.boolean().optional()
    })
})

export type CreateShopInput = z.infer<typeof createShopSchema>
export type UpdateShopInput = z.infer<typeof updateShopSchema>