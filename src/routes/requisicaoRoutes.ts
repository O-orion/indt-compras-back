import { Router } from "express";
import { appDataSource } from "../database/appDataSource.js";
import RequisicaoController from "../controllers/RequisicaoController.js";
import RequisicaoService from "../services/RequisicaoService.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createRequisicaoSchemaDTO, updateRequisicaoSchemaDTO } from "../dtos/RequisicaoSchemaDTO.js";

const router = Router();

const requisicaoService = new RequisicaoService(appDataSource);
const requisicaoController = new RequisicaoController(requisicaoService);

router.get("/", requisicaoController.findAll.bind(requisicaoController));
router.get("/:id", requisicaoController.findById.bind(requisicaoController));
router.post("/", validateBody(createRequisicaoSchemaDTO), requisicaoController.create.bind(requisicaoController));
router.put("/:id", validateBody(updateRequisicaoSchemaDTO), requisicaoController.update.bind(requisicaoController));
router.delete("/:id", requisicaoController.delete.bind(requisicaoController));

export default router;
