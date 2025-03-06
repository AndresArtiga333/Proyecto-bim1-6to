import { Router } from "express";
import { agregarUsuario, actualizarUsuarios, eliminarUsuario, actualizarModoAdmin,
     eliminarUsuarioModoAdmin, explorarProductos, agregarAlCarrito, finalizarCompra } from "./user.controller.js";
import { crearUsuarioValidator ,actualizarUsuarioValidator, eliminarUsuarioValidator
    ,eliminarUsuarioModoAdminValidator, actualizarAdminValidator,  explorarProductosValidator,
    carritoValidator, finalizarCompraValidator} from "../middlewares/user-validator.js";

const router = Router()

router.post("/agregarUsuario", crearUsuarioValidator, agregarUsuario)

router.put ("/actualizarUsuario/", actualizarUsuarioValidator, actualizarUsuarios)

router.put("/actualizarModoAdmin/:uid", actualizarAdminValidator, actualizarModoAdmin )

router.patch("/eliminarUsuarioModoAdmin/:uid", eliminarUsuarioModoAdminValidator, eliminarUsuarioModoAdmin)

router.patch("/eliminarUsuario/", eliminarUsuarioValidator, eliminarUsuario)

router.get("/explorarProductos", explorarProductosValidator, explorarProductos)

router.post("/agregarAlCarrito", carritoValidator, agregarAlCarrito)

router.post("/finalizarCompra", finalizarCompraValidator, finalizarCompra)

export default router