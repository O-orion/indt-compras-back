import type { RequestHandler } from "express";
import type { Perfil } from "../types/Perfil.js";
import { AppError } from "../errors/AppError.js";


//usuario - gestor,comprador

export const ensureRole = (...papeisPermitidos: Perfil[]): RequestHandler => {

    return (req, res, next) => {

        if(!req.auth) {
            throw new AppError("Não autenticado!", 401);
        }

        if ( !papeisPermitidos.includes(req.auth.perfil)  ) {
            throw new AppError("Não autorizado!", 403)
        }

        next();
    }

} 
