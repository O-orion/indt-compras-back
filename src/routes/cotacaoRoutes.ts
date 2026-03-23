import { Router } from "express";
import { appDataSource } from "../database/appDataSource.js";
import CotacaoController from "../controllers/CotacaoController.js";
import CotacaoService from "../services/CotacaoService.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createCotacaoSchemaDTO, updateCotacaoSchemaDTO } from "../dtos/CotacaoSchemaDTO.js";

const router = Router();

const cotacaoService = new CotacaoService(appDataSource);
const cotacaoController = new CotacaoController(cotacaoService);

router.get("/", cotacaoController.findAll.bind(cotacaoController));
router.get("/:id", cotacaoController.findById.bind(cotacaoController));
router.post("/", validateBody(createCotacaoSchemaDTO), cotacaoController.create.bind(cotacaoController));
router.put("/:id", validateBody(updateCotacaoSchemaDTO), cotacaoController.update.bind(cotacaoController));
router.delete("/:id", cotacaoController.delete.bind(cotacaoController));

export default router;
