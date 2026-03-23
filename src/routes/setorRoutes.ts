import { Router } from "express";
import { appDataSource } from "../database/appDataSource.js";
import SetorController from "../controllers/SetorController.js";
import SetorService from "../services/SetorService.js";
import { validateBody } from "../middlewares/validateBody.js";
import { createSetorSchemaDTO, updatedSetorSchemaDTO } from "../dtos/SetorChemaDTO.js";

const router = Router();

const setorService = new SetorService(appDataSource);
const setorController = new SetorController(setorService);

router.get("/", setorController.findAll.bind(setorController));
router.get("/:id", setorController.findById.bind(setorController));
router.post("/", validateBody(createSetorSchemaDTO), setorController.create.bind(setorController));
router.put("/:id", validateBody(updatedSetorSchemaDTO), setorController.update.bind(setorController));

export default router;
