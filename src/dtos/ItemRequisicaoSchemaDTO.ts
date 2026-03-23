import { z } from "zod";

export const createItemRequisicaoSchemaDTO = z.object({
    descricao: z.string().trim().min(1).max(255),
    quantidade: z.number().positive(),
    unidade: z.string().trim().min(1).max(50),
    especificao: z.string().trim().max(500).optional().nullable(),
    requisicao_id: z.string().uuid()
});

export const updateItemRequisicaoSchemaDTO = createItemRequisicaoSchemaDTO
    .omit({ requisicao_id: true })
    .partial();

export type CreateItemRequisicaoSchemaDTO = z.infer<typeof createItemRequisicaoSchemaDTO>;
export type UpdateItemRequisicaoSchemaDTO = z.infer<typeof updateItemRequisicaoSchemaDTO>;
