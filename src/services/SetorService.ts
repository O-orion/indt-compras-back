import { DataSource, type Repository } from "typeorm";
import { Setor } from "../entities/Setor.js";
import type { CreateSetorSchemaDTO, UpdatedSetorSchemaDTO } from "../dtos/SetorChemaDTO.js";
import { AppError } from "../errors/AppError.js";

export default class SetorService {
    private setorRepo: Repository<Setor>;

    constructor(dataSource: DataSource) {
        this.setorRepo = dataSource.getRepository(Setor);
    }

    async findAll() {
        return await this.setorRepo.find({ relations: { usuarios: true, requisicoes: true } });
    }

    async findById(id: string) {
        return this.setorRepo.findOne({ where: { id } });
    }

    async findByNome(nome: string) {
        return this.setorRepo.findOne({ where: { nome } });
    }

    async createSetor(dataSetor: CreateSetorSchemaDTO) {
        const setor = await this.findByNome(dataSetor.nome);
        if (setor) {
            throw new AppError("Setor ja cadastrado!", 409);
        }

        const novoSetor = await this.setorRepo.save(dataSetor);
        return novoSetor;
    }

    async updatedSetor(id: string, dataSetor: UpdatedSetorSchemaDTO) {
        const setor = await this.findById(id);

        if (!setor) {
            throw new AppError("Setor nao foi encontrado!", 404);
        }

        if (dataSetor.nome !== undefined) {
            const setorCadastrado = await this.findByNome(dataSetor.nome);

            if (setorCadastrado) {
                throw new AppError("Ja existe um setor com este nome", 409);
            }
        }

        const updates = Object.fromEntries(
            Object.entries(dataSetor).filter(([, value]) => value !== undefined)
        ) as Partial<Setor>;

        const setorAtualizado = this.setorRepo.merge(setor, updates);
        return await this.setorRepo.save(setorAtualizado);
    }
}
