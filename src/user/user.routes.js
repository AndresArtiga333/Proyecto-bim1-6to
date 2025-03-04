import { Router } from "express";
import { agregarUsuario, actualizarUsuarios, eliminarUsuario, actualizarModoAdmin,
     eliminarUsuarioModoAdmin, explorarProductos, agregarAlCarrito } from "./user.controller.js";
import { crearUsuarioValidator ,actualizarUsuarioValidator, eliminarUsuarioValidator
    ,eliminarUsuarioModoAdminValidator, actualizarAdminValidator, validadorGeneralUsuario, explorarProductosValidator,
    carritoValidator} from "../middlewares/user-validator.js";

const router = Router()

router.post("/agregarUsuario", crearUsuarioValidator, agregarUsuario)

router.put ("/actualizarUsuario/", actualizarUsuarioValidator, actualizarUsuarios)

router.put("/actualizarModoAdmin/:uid", actualizarAdminValidator, actualizarModoAdmin )

router.patch("/eliminarUsuarioModoAdmin/:uid", eliminarUsuarioModoAdminValidator, eliminarUsuarioModoAdmin)

router.patch("/eliminarUsuario/", eliminarUsuarioValidator, eliminarUsuario)

router.get("/explorarProductos", explorarProductosValidator, explorarProductos)

router.post("/agregarAlCarrito", carritoValidator, agregarAlCarrito)

export default router