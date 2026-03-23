import { z } from "zod";
import { Urgencia } from "../types/Urgencia.js";
import { Status } from "../types/Status.js";

export const createRequisicaoSchemaDTO = z.object({
    numero: z.string().trim().min(1).max(50),
    titulo: z.string().trim().min(1).max(255),
    descricao: z.string().trim().min(1),
    justificativa: z.string().trim().min(1),
    urgencia: z.nativeEnum(Urgencia),
    status: z.nativeEnum(Status),
    prazo_necessidade: z.coerce.date(),
    aprovado_em: z.coerce.date().optional().nullable(),
    comentario_aprovacao: z.string().trim().optional().nullable(),
    valor_total_aprovado: z.number().positive().optional().nullable(),
    setor_id: z.string().uuid(),
    solicitante_id: z.string().uuid(),
    aprovador_id: z.string().uuid().optional().nullable(),
    comprador_id: z.string().uuid().optional().nullable()
});

export const updateRequisicaoSchemaDTO = createRequisicaoSchemaDTO.partial();

export type CreateRequisicaoSchemaDTO = z.infer<typeof createRequisicaoSchemaDTO>;
export type UpdateRequisicaoSchemaDTO = z.infer<typeof updateRequisicaoSchemaDTO>;
