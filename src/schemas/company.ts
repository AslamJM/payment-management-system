import { z } from "zod";

export const createCompanySchema = z.object({
    name: z.string().min(1, "name is required")
})

export const updateCompanySchema = z.object({
    id: z.number(),
    update: z.object({
        name: z.string().min(1, "name is required").optional(),
        status: z.boolean().optional()
    })
})

export type CreateCompanyInput = z.infer<typeof createCompanySchema>
export type UpdateCompanyInput = z.infer<typeof updateCompanySchema>