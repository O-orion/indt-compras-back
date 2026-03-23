import type { DataSource, Repository } from "typeorm";
import { ItemRequisicao } from "../entities/ItemRequisicao.js";
import { Requisicao } from "../entities/Requisicao.js";
import type { CreateItemRequisicaoSchemaDTO, UpdateItemRequisicaoSchemaDTO } from "../dtos/ItemRequisicaoSchemaDTO.js";
import { AppError } from "../errors/AppError.js";

export default class ItemRequisicaoService {
    private itemRepo: Repository<ItemRequisicao>;
    private requisicaoRepo: Repository<Requisicao>;

    constructor(dataSource: DataSource) {
        this.itemRepo = dataSource.getRepository(ItemRequisicao);
        this.requisicaoRepo = dataSource.getRepository(Requisicao);
    }

    async findAll() {
        return await this.itemRepo.find({ relations: { requisicao: true } });
    }

    async findById(id: string) {
        return await this.itemRepo.findOne({ where: { id }, relations: { requisicao: true } });
    }

    async create(data: CreateItemRequisicaoSchemaDTO) {
        const requisicao = await this.requisicaoRepo.findOne({ where: { id: data.requisicao_id } });
        if (!requisicao) {
            throw new AppError("Requisicao nao encontrada!", 404);
        }

        const novoItem = this.itemRepo.create({
            descricao: data.descricao,
            quantidade: data.quantidade,
            unidade: data.unidade,
            especificao: data.especificao ?? null,
            requisicao
        });

        return await this.itemRepo.save(novoItem);
    }

    async update(id: string, data: UpdateItemRequisicaoSchemaDTO) {
        const item = await this.itemRepo.findOne({ where: { id } });
        if (!item) {
            throw new AppError("Item de requisicao nao encontrado!", 404);
        }

        const updates = Object.fromEntries(
            Object.entries(data).filter(([, value]) => value !== undefined)
        ) as Partial<ItemRequisicao>;

        const itemAtualizado = this.itemRepo.merge(item, updates);
        return await this.itemRepo.save(itemAtualizado);
    }

    async delete(id: string) {
        const result = await this.itemRepo.delete(id);
        if (result.affected === 0) {
            throw new AppError("Item de requisicao nao encontrado!", 404);
        }
    }
}
