import { z } from "zod";

export const createRegionSchema = z.object({
    name: z.string().min(1, "name is required")
})

export const updateRegionSchema = z.object({
    id: z.number(),
    update: z.object({
        name: z.string().min(1, "name is required").optional(),
        status: z.boolean().optional()
    })
})


export type CreateRegionInput = z.infer<typeof createRegionSchema>
export type UpdateRegionInput = z.infer<typeof updateRegionSchema>