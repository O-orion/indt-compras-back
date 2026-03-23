import type { Request, Response } from "express";
import type CotacaoService from "../services/CotacaoService.js";
import type { CreateCotacaoSchemaDTO, UpdateCotacaoSchemaDTO } from "../dtos/CotacaoSchemaDTO.js";
import { AppError } from "../errors/AppError.js";

export default class CotacaoController {
    private cotacaoService: CotacaoService;

    constructor(cotacaoService: CotacaoService) {
        this.cotacaoService = cotacaoService;
    }

    async findAll(_req: Request, res: Response) {
        const cotacoes = await this.cotacaoService.findAll();
        return res.status(200).json(cotacoes);
    }

    async findById(req: Request, res: Response) {
        const cotacao = await this.cotacaoService.findById(req.params.id as string);
        if (!cotacao) {
            throw new AppError("Cotacao nao encontrada!", 404);
        }
        return res.status(200).json(cotacao);
    }

    async create(req: Request, res: Response) {
        const cotacao = await this.cotacaoService.create(req.body as CreateCotacaoSchemaDTO);
        return res.status(201).json(cotacao);
    }

    async update(req: Request, res: Response) {
        const cotacao = await this.cotacaoService.update(
            req.params.id as string,
            req.body as UpdateCotacaoSchemaDTO
        );
        return res.status(200).json(cotacao);
    }

    async delete(req: Request, res: Response) {
        await this.cotacaoService.delete(req.params.id as string);
        return res.status(204).send();
    }
}
