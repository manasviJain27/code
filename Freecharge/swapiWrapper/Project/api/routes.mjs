import { Router } from "express";
import authRoutes from "./swapi/routes.mjs";
const router = new Router();

authRoutes(router);

export default router;
