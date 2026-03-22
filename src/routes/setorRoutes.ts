import { Router } from "express";
import { appDataSource } from "../database/appDataSource.js";
import SetorController from "../controllers/SetorController.js";
import SetorService from "../services/SetorService.js";

const router = Router();

const setorService = new SetorService(appDataSource);
const setorController = new SetorController(setorService);

router.get("/", setorController.findAll.bind(setorController));
router.get("/:id", setorController.findById.bind(setorController));
router.post("/", setorController.create.bind(setorController));
router.put("/:id", setorController.update.bind(setorController));

export default router;
