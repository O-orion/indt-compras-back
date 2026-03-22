import type { Request, Response } from "express";
import type { UsuarioService } from "../services/UsuarioService.js";
import type { CreateUserSchemaDTO, UpdateUserSchemaDTO } from "../dtos/CreateUserSchemaDTO.js";

const mapErrorToStatus = (message: string) => {
    const normalized = message.toLowerCase();
    if (normalized.includes("nao encontrado")) {
        return 404;
    }
    if (normalized.includes("ja cadastrado")) {
        return 409;
    }
    return 400;
};

const handleError = (res: Response, error: unknown) => {
    const message = error instanceof Error ? error.message : "Erro interno";
    const status = message === "Erro interno" ? 500 : mapErrorToStatus(message);
    return res.status(status).json({ message });
};

export default class UsuarioController {
    private userService: UsuarioService;

    constructor(userService: UsuarioService) {
        this.userService = userService;
    }

    async findAllUser(req: Request, res: Response) {
        try {
            const users = await this.userService.findAll();
            return res.status(200).json(users);
        } catch (error) {
            return handleError(res, error);
        }
    }

    async findUserById(req: Request, res: Response) {
        try {
            const user = await this.userService.findById(req.params.id as string);
            if (!user) {
                return res.status(404).json({ message: "Usuario nao encontrado!" });
            }
            return res.status(200).json(user);
        } catch (error) {
            return handleError(res, error);
        }
    }

    async createUser(req: Request, res: Response) {
        try {
            const user = await this.userService.createUsuario(req.body as CreateUserSchemaDTO);
            return res.status(201).json(user);
        } catch (error) {
            return handleError(res, error);
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            const user = await this.userService.updateUsuario(
                req.params.id as string,
                req.body as UpdateUserSchemaDTO
            );
            return res.status(200).json(user);
        } catch (error) {
            return handleError(res, error);
        }
    }
}
