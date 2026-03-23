import { Router } from "express";
import { appDataSource } from "../database/appDataSource.js";
import ItemRequisicaoController from "../controllers/ItemRequisicaoController.js";
import ItemRequisicaoService from "../services/ItemRequisicaoService.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createItemRequisicaoSchemaDTO, updateItemRequisicaoSchemaDTO } from "../dtos/ItemRequisicaoSchemaDTO.js";

const router = Router();

const itemService = new ItemRequisicaoService(appDataSource);
const itemController = new ItemRequisicaoController(itemService);

router.get("/", itemController.findAll.bind(itemController));
router.get("/:id", itemController.findById.bind(itemController));
router.post("/", validateBody(createItemRequisicaoSchemaDTO), itemController.create.bind(itemController));
router.put("/:id", validateBody(updateItemRequisicaoSchemaDTO), itemController.update.bind(itemController));
router.delete("/:id", itemController.delete.bind(itemController));

export default router;
