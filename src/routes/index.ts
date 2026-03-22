import { Router } from "express";
import usuarioRoutes from "./usuarioRoutes.js";
import setorRoutes from "./setorRoutes.js";

const routes = Router();

routes.use("/usuarios", usuarioRoutes);
routes.use("/setores", setorRoutes);

export default routes;
