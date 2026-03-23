import type { DataSource, Repository } from "typeorm";
import { Cotacao } from "../entities/Cotacao.js";
import type { CreateCotacaoSchemaDTO, UpdateCotacaoSchemaDTO } from "../dtos/CotacaoSchemaDTO.js";
import { AppError } from "../errors/AppError.js";

export default class CotacaoService {
    private cotacaoRepo: Repository<Cotacao>;

    constructor(dataSource: DataSource) {
        this.cotacaoRepo = dataSource.getRepository(Cotacao);
    }

    async findAll() {
        return await this.cotacaoRepo.find();
    }

    async findById(id: string) {
        return await this.cotacaoRepo.findOne({ where: { id } });
    }

    async create(data: CreateCotacaoSchemaDTO) {
        const payload: Partial<Cotacao> = {
            fornecedor: data.fornecedor,
            preco_unitario: data.preco_unitario,
            ...(data.prazo_entrega_dias !== undefined
                ? { prazo_entrega_dias: data.prazo_entrega_dias }
                : {}),
            ...(data.selecionada !== undefined
                ? { selecionada: data.selecionada }
                : {}),
            ...(data.observacao !== undefined
                ? { observacao: data.observacao }
                : {})
        };

        const novaCotacao = this.cotacaoRepo.create(payload);
        return await this.cotacaoRepo.save(novaCotacao);
    }

    async update(id: string, data: UpdateCotacaoSchemaDTO) {
        const cotacao = await this.findById(id);
        if (!cotacao) {
            throw new AppError("Cotacao nao encontrada!", 404);
        }

        const updates = Object.fromEntries(
            Object.entries(data).filter(([, value]) => value !== undefined)
        ) as Partial<Cotacao>;

        const cotacaoAtualizada = this.cotacaoRepo.merge(cotacao, updates);
        return await this.cotacaoRepo.save(cotacaoAtualizada);
    }

    async delete(id: string) {
        const result = await this.cotacaoRepo.delete(id);
        if (result.affected === 0) {
            throw new AppError("Cotacao nao encontrada!", 404);
        }
    }
}
