import { Router } from "express";
import { agregarCategoria, listarCategorias, editarCategoria, eliminarCategoria } from "./categoria.controller.js";
import { agergarCategoriaValidator, listarCategoriasValidator, editarCategoriaValidator, eliminarCategoriaValidator } from "../middlewares/categoria-validator.js";

const router = Router()

router.post("/agregarCategoria", agergarCategoriaValidator, agregarCategoria)

router.get("/listarCategorias", listarCategoriasValidator, listarCategorias)

router.put("/editarCategoria/:cid", editarCategoriaValidator, editarCategoria)

router.patch("/eliminarCategoria/:cid", eliminarCategoriaValidator, eliminarCategoria)
export default router