import { z } from "zod";

export const createCotacaoSchemaDTO = z.object({
    fornecedor: z.string().trim().min(1).max(255),
    preco_unitario: z.number().positive(),
    prazo_entrega_dias: z.number().int().positive().optional(),
    selecionada: z.boolean().optional(),
    observacao: z.string().trim().max(500).optional().nullable()
});

export const updateCotacaoSchemaDTO = createCotacaoSchemaDTO.partial();

export type CreateCotacaoSchemaDTO = z.infer<typeof createCotacaoSchemaDTO>;
export type UpdateCotacaoSchemaDTO = z.infer<typeof updateCotacaoSchemaDTO>;
