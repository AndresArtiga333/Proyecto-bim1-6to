import { Router } from "express";
import { agregarProducto, listarYBuscarProductos, editarProducto, productosAgotados } from "./productos.controller.js";
import { agergarProductosValidator, validatorGeneral } from "../middlewares/productos-validator.js";

const router = Router()

router.post("/agregarProducto", agergarProductosValidator, agregarProducto)

router.get("/listarYBuscarProductos", validatorGeneral, listarYBuscarProductos)

router.put("/editarProducto/:pid", validatorGeneral, editarProducto)

router.get("/productosAgotados", validatorGeneral, productosAgotados)

export default router