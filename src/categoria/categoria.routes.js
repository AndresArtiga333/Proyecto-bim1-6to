import { Router } from "express";
import { agregarCategoria, listarCategorias } from "./categoria.controller.js";
import { agergarCategoriaValidator } from "../middlewares/categoria-validator.js";

const router = Router()

router.post("/agregarCategoria", agergarCategoriaValidator, agregarCategoria)

router.get("/listarCategorias", listarCategorias)

export default router