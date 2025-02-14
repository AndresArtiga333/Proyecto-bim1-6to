import { Router } from "express";
import { agregarCategoria, listarCategorias, actualiarCategoria, elimianrCategoria } from "./categoria.controller";

const router = Router();

router.post("/agregarCategoria/:uid", agregarCategoria);

router.get("/listarCategorias", listarCategorias);

router.put("/actualiarCategoria/:uid/:cid", actualiarCategoria);

router.patch("/eliminarCategoria/:uid/:cid", elimianrCategoria)
