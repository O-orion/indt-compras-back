import type { Request, Response } from "express";
import type SetorService from "../services/SetorService.js";
import type { CreateSetorSchemaDTO, UpdatedSetorSchemaDTO } from "../dtos/SetorChemaDTO.js";

const mapErrorToStatus = (message: string) => {
    const normalized = message.toLowerCase();
    if (normalized.includes("nao encontrado")) {
        return 404;
    }
    if (normalized.includes("ja cadastrado") || normalized.includes("existe um setor")) {
        return 409;
    }
    return 400;
};

const handleError = (res: Response, error: unknown) => {
    const message = error instanceof Error ? error.message : "Erro interno";
    const status = message === "Erro interno" ? 500 : mapErrorToStatus(message);
    return res.status(status).json({ message });
};

export default class SetorController {
    private setorService: SetorService;

    constructor(setorService: SetorService) {
        this.setorService = setorService;
    }

    async findAll(req: Request, res: Response) {
        try {
            const setores = await this.setorService.findAll();
            return res.status(200).json(setores);
        } catch (error) {
            return handleError(res, error);
        }
    }

    async findById(req: Request, res: Response) {
        try {
            const setor = await this.setorService.findById(req.params.id);
            if (!setor) {
                return res.status(404).json({ message: "Setor nao encontrado!" });
            }
            return res.status(200).json(setor);
        } catch (error) {
            return handleError(res, error);
        }
    }

    async create(req: Request, res: Response) {
        try {
            const setor = await this.setorService.createSetor(req.body as CreateSetorSchemaDTO);
            return res.status(201).json(setor);
        } catch (error) {
            return handleError(res, error);
        }
    }

    async update(req: Request, res: Response) {
        try {
            const setor = await this.setorService.updatedSetor(
                req.params.id,
                req.body as UpdatedSetorSchemaDTO
            );
            return res.status(200).json(setor);
        } catch (error) {
            return handleError(res, error);
        }
    }
}
