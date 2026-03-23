import { Router } from "express";
import usuarioRoutes from "./usuarioRoutes.js";
import setorRoutes from "./setorRoutes.js";
import authRoutes from "./authRoutes.js";
import cotacaoRoutes from "./cotacaoRoutes.js";
import itemRequisicaoRoutes from "./itemRequisicaoRoutes.js";
import requisicaoRoutes from "./requisicaoRoutes.js";
import { ensureAuth } from "../middlewares/ensureAuth.js";

const routes = Router();

routes.use("/auth", authRoutes);
//routes.use(ensureAuth);
routes.use("/usuarios", usuarioRoutes);
routes.use("/setores", setorRoutes);
routes.use("/cotacoes", cotacaoRoutes);
routes.use("/itens-requisicao", itemRequisicaoRoutes);
routes.use("/requisicoes", requisicaoRoutes);

export default routes;
