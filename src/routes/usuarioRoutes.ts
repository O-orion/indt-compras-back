import { Router } from "express";
import { appDataSource } from "../database/appDataSource.js";
import UsuarioController from "../controllers/UsuarioController.js";
import { UsuarioService } from "../services/UsuarioService.js";

const router = Router();

const usuarioService = new UsuarioService(appDataSource);
const usuarioController = new UsuarioController(usuarioService);

router.get("/", usuarioController.findAllUser.bind(usuarioController));
router.get("/:id", usuarioController.findUserById.bind(usuarioController));
router.post("/", usuarioController.createUser.bind(usuarioController));
router.put("/:id", usuarioController.updateUser.bind(usuarioController));

export default router;
