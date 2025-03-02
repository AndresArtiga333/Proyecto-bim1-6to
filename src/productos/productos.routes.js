import { Router } from "express";
import { agregarProducto, listarProductos } from "./productos.controller.js";
import { agergarProductosValidator, validatorGeneral } from "../middlewares/productos-validator.js";

const router = Router()

router.post("/agregarProducto", agergarProductosValidator, agregarProducto)

router.get("/listarProductos", validatorGeneral, listarProductos)

export default router