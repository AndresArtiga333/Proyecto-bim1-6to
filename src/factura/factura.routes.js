import { Router } from "express";
import { editarFactura, listarFacturasUsuario } from "./factura.controller.js";
import { editarFacturaValidator, listarFacturasUsuarioValidator } from "../middlewares/factura-validator.js";

const router = Router()

router.put("/editarFactura/:fid", editarFacturaValidator, editarFactura)

router.get("/listarFacturasUsuario/:uid",listarFacturasUsuarioValidator, listarFacturasUsuario)

export default router