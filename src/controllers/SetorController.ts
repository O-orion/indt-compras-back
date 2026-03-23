import type { Request, Response } from "express";
import type SetorService from "../services/SetorService.js";
import type { CreateSetorSchemaDTO, UpdatedSetorSchemaDTO } from "../dtos/SetorChemaDTO.js";
import { AppError } from "../errors/AppError.js";

export default class SetorController {
    private setorService: SetorService;

    constructor(setorService: SetorService) {
        this.setorService = setorService;
    }

    async findAll(_req: Request, res: Response) {
        const setores = await this.setorService.findAll();
        return res.status(200).json(setores);
    }

    async findById(req: Request, res: Response) {
        const setor = await this.setorService.findById(req.params.id as string);
        if (!setor) {
            throw new AppError("Setor nao encontrado!", 404);
        }
        return res.status(200).json(setor);
    }

    async create(req: Request, res: Response) {
        const setor = await this.setorService.createSetor(req.body as CreateSetorSchemaDTO);
        return res.status(201).json(setor);
    }

    async update(req: Request, res: Response) {
        const setor = await this.setorService.updatedSetor(
            req.params.id as string,
            req.body as UpdatedSetorSchemaDTO
        );
        return res.status(200).json(setor);
    }
}
