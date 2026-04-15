import { Router } from "express";
import { appDataSource } from "../database/appDataSource.js";
import UsuarioController from "../controllers/UsuarioController.js";
import { UsuarioService } from "../services/UsuarioService.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createUserSchema, updateUserSchema } from "../dtos/CreateUserSchemaDTO.js";
import { ensureAuth } from "../middlewares/ensureAuth.js";
import { Perfil } from "../types/Perfil.js";
import { ensureRole } from "../middlewares/ensureRole.js";

const router = Router();

const usuarioService = new UsuarioService(appDataSource);
const usuarioController = new UsuarioController(usuarioService);

router.get("/", ensureAuth,ensureRole(Perfil.GESTOR, Perfil.SOLICITANTE),  usuarioController.findAllUser.bind(usuarioController));
router.get("/:id", ensureAuth, usuarioController.findUserById.bind(usuarioController));
router.post("/", ensureAuth, validateBody(createUserSchema), usuarioController.createUser.bind(usuarioController));
router.put("/:id", ensureAuth, validateBody(updateUserSchema), usuarioController.updateUser.bind(usuarioController));

export default router;
