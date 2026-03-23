import type { Request, Response } from "express";
import type RequisicaoService from "../services/RequisicaoService.js";
import type { CreateRequisicaoSchemaDTO, UpdateRequisicaoSchemaDTO } from "../dtos/RequisicaoSchemaDTO.js";
import { AppError } from "../errors/AppError.js";

export default class RequisicaoController {
    private requisicaoService: RequisicaoService;

    constructor(requisicaoService: RequisicaoService) {
        this.requisicaoService = requisicaoService;
    }

    async findAll(_req: Request, res: Response) {
        const requisicoes = await this.requisicaoService.findAll();
        return res.status(200).json(requisicoes);
    }

    async findById(req: Request, res: Response) {
        const requisicao = await this.requisicaoService.findById(req.params.id as string);
        if (!requisicao) {
            throw new AppError("Requisicao nao encontrada!", 404);
        }
        return res.status(200).json(requisicao);
    }

    async create(req: Request, res: Response) {
        const requisicao = await this.requisicaoService.create(req.body as CreateRequisicaoSchemaDTO);
        return res.status(201).json(requisicao);
    }

    async update(req: Request, res: Response) {
        const requisicao = await this.requisicaoService.update(
            req.params.id as string,
            req.body as UpdateRequisicaoSchemaDTO
        );
        return res.status(200).json(requisicao);
    }

    async delete(req: Request, res: Response) {
        await this.requisicaoService.delete(req.params.id as string);
        return res.status(204).send();
    }
}
