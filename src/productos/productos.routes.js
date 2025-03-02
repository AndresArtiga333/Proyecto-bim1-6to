import { Router } from "express";
import { agregarProducto, listarYBuscarProductos, editarProducto, productosAgotados, productosMasVendidos
    , eliminarProducto
 } from "./productos.controller.js";
import { agergarProductosValidator, validatorGeneral } from "../middlewares/productos-validator.js";

const router = Router()

router.post("/agregarProducto", agergarProductosValidator, agregarProducto)

router.get("/listarYBuscarProductos", validatorGeneral, listarYBuscarProductos)

router.put("/editarProducto/:pid", validatorGeneral, editarProducto)

router.get("/productosAgotados", validatorGeneral, productosAgotados)

router.get("/productosMasVendidos", validatorGeneral, productosMasVendidos)

router.patch("/eliminarProducto/:pid", validatorGeneral, eliminarProducto)

export default router