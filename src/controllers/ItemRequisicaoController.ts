import type { Request, Response } from "express";
import type ItemRequisicaoService from "../services/ItemRequisicaoService.js";
import type { CreateItemRequisicaoSchemaDTO, UpdateItemRequisicaoSchemaDTO } from "../dtos/ItemRequisicaoSchemaDTO.js";
import { AppError } from "../errors/AppError.js";

export default class ItemRequisicaoController {
    private itemService: ItemRequisicaoService;

    constructor(itemService: ItemRequisicaoService) {
        this.itemService = itemService;
    }

    async findAll(_req: Request, res: Response) {
        const itens = await this.itemService.findAll();
        return res.status(200).json(itens);
    }

    async findById(req: Request, res: Response) {
        const item = await this.itemService.findById(req.params.id as string);
        if (!item) {
            throw new AppError("Item de requisicao nao encontrado!", 404);
        }
        return res.status(200).json(item);
    }

    async create(req: Request, res: Response) {
        const item = await this.itemService.create(req.body as CreateItemRequisicaoSchemaDTO);
        return res.status(201).json(item);
    }

    async update(req: Request, res: Response) {
        const item = await this.itemService.update(
            req.params.id as string,
            req.body as UpdateItemRequisicaoSchemaDTO
        );
        return res.status(200).json(item);
    }

    async delete(req: Request, res: Response) {
        await this.itemService.delete(req.params.id as string);
        return res.status(204).send();
    }
}
