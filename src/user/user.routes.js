import { Router } from "express";
import { agregarUsuario, actualizarUsuarios, eliminarUsuario, actualizarModoAdmin, eliminarUsuarioModoAdmin } from "./user.controller.js";
import { crearUsuarioValidator ,actualizarUsuarioValidator, eliminarUsuarioValidator,eliminarUsuarioModoAdminValidator, actualizarAdminValidator} from "../middlewares/user-validator.js";

const router = Router()

router.post("/agregarUsuario", crearUsuarioValidator, agregarUsuario)

router.put ("/actualizarUsuario/", actualizarUsuarioValidator, actualizarUsuarios)

router.put("/actualizarModoAdmin/:uid", actualizarAdminValidator, actualizarModoAdmin )

router.patch("/eliminarUsuarioModoAdmin/:uid", eliminarUsuarioModoAdminValidator, eliminarUsuarioModoAdmin)

router.patch("/eliminarUsuario/", eliminarUsuarioValidator, eliminarUsuario)

export default router