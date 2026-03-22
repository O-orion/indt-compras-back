import { z } from 'zod'

export const createSetorSchemaDTO = z.object({
    nome: z.string().trim().min(1).max(100),
    descricao: z.string({ error: "Descrição deve ser um texto" }).nullable()
})

export const updatedSetorSchemaDTO = createSetorSchemaDTO
    .partial()

export type CreateSetorSchemaDTO = z.infer<typeof createSetorSchemaDTO>;
export type UpdatedSetorSchemaDTO = z.infer<typeof updatedSetorSchemaDTO>;