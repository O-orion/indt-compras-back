import type { DataSource, Repository } from "typeorm";
import { Requisicao } from "../entities/Requisicao.js";
import { Usuario } from "../entities/Usuario.js";
import { Setor } from "../entities/Setor.js";
import type { CreateRequisicaoSchemaDTO, UpdateRequisicaoSchemaDTO } from "../dtos/RequisicaoSchemaDTO.js";
import { AppError } from "../errors/AppError.js";

export default class RequisicaoService {
    private requisicaoRepo: Repository<Requisicao>;
    private usuarioRepo: Repository<Usuario>;
    private setorRepo: Repository<Setor>;

    constructor(dataSource: DataSource) {
        this.requisicaoRepo = dataSource.getRepository(Requisicao);
        this.usuarioRepo = dataSource.getRepository(Usuario);
        this.setorRepo = dataSource.getRepository(Setor);
    }

    async findAll() {
        return await this.requisicaoRepo.find({
            relations: {
                solicitante: true,
                aprovador: true,
                comprador: true,
                setor: true,
                itens: true
            }
        });
    }

    async findById(id: string) {
        return await this.requisicaoRepo.findOne({
            where: { id },
            relations: {
                solicitante: true,
                aprovador: true,
                comprador: true,
                setor: true,
                itens: true
            }
        });
    }

    async findByNumero(numero: string) {
        return await this.requisicaoRepo.findOne({ where: { numero } });
    }

    async create(data: CreateRequisicaoSchemaDTO) {
        const existente = await this.findByNumero(data.numero);
        if (existente) {
            throw new AppError("Numero de requisicao ja cadastrado!", 409);
        }

        const solicitante = await this.usuarioRepo.findOne({ where: { id: data.solicitante_id } });
        if (!solicitante) {
            throw new AppError("Solicitante nao encontrado!", 404);
        }

        const setor = await this.setorRepo.findOne({ where: { id: data.setor_id } });
        if (!setor) {
            throw new AppError("Setor nao encontrado!", 404);
        }

        const aprovador = data.aprovador_id
            ? await this.usuarioRepo.findOne({ where: { id: data.aprovador_id } })
            : null;
        if (data.aprovador_id && !aprovador) {
            throw new AppError("Aprovador nao encontrado!", 404);
        }

        const comprador = data.comprador_id
            ? await this.usuarioRepo.findOne({ where: { id: data.comprador_id } })
            : null;
        if (data.comprador_id && !comprador) {
            throw new AppError("Comprador nao encontrado!", 404);
        }

        const novaRequisicao = this.requisicaoRepo.create({
            numero: data.numero,
            titulo: data.titulo,
            descricao: data.descricao,
            justificativa: data.justificativa,
            urgencia: data.urgencia,
            status: data.status,
            prazo_necessidade: data.prazo_necessidade,
            aprovado_em: data.aprovado_em ?? null,
            comentario_aprovacao: data.comentario_aprovacao ?? null,
            valor_total_aprovado: data.valor_total_aprovado ?? null,
            solicitante,
            setor,
            aprovador,
            comprador
        });

        return await this.requisicaoRepo.save(novaRequisicao);
    }

    async update(id: string, data: UpdateRequisicaoSchemaDTO) {
        const requisicao = await this.requisicaoRepo.findOne({ where: { id } });
        if (!requisicao) {
            throw new AppError("Requisicao nao encontrada!", 404);
        }

        if (data.numero && data.numero !== requisicao.numero) {
            const existente = await this.findByNumero(data.numero);
            if (existente) {
                throw new AppError("Numero de requisicao ja cadastrado!", 409);
            }
        }

        const { solicitante_id, setor_id, aprovador_id, comprador_id, ...rest } = data;

        const updates = Object.fromEntries(
            Object.entries(rest).filter(([, value]) => value !== undefined)
        ) as Partial<Requisicao>;

        Object.assign(requisicao, updates);

        if (solicitante_id) {
            const solicitante = await this.usuarioRepo.findOne({ where: { id: solicitante_id } });
            if (!solicitante) {
                throw new AppError("Solicitante nao encontrado!", 404);
            }
            requisicao.solicitante = solicitante;
        }

        if (setor_id) {
            const setor = await this.setorRepo.findOne({ where: { id: setor_id } });
            if (!setor) {
                throw new AppError("Setor nao encontrado!", 404);
            }
            requisicao.setor = setor;
        }

        if (aprovador_id !== undefined) {
            if (aprovador_id === null) {
                requisicao.aprovador = null;
            } else {
                const aprovador = await this.usuarioRepo.findOne({ where: { id: aprovador_id } });
                if (!aprovador) {
                    throw new AppError("Aprovador nao encontrado!", 404);
                }
                requisicao.aprovador = aprovador;
            }
        }

        if (comprador_id !== undefined) {
            if (comprador_id === null) {
                requisicao.comprador = null;
            } else {
                const comprador = await this.usuarioRepo.findOne({ where: { id: comprador_id } });
                if (!comprador) {
                    throw new AppError("Comprador nao encontrado!", 404);
                }
                requisicao.comprador = comprador;
            }
        }

        return await this.requisicaoRepo.save(requisicao);
    }

    async delete(id: string) {
        const result = await this.requisicaoRepo.delete(id);
        if (result.affected === 0) {
            throw new AppError("Requisicao nao encontrada!", 404);
        }
    }
}
