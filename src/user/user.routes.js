import { Router } from "express";
import { actualizarUsuarios, eliminarUsuario } from "./user.controller.js";
import { actualizarUsuarioValidator, eliminarUsuarioValidator} from "../middlewares/user-validator.js";

const router = Router()

router.put ("/actualizarUsuario/:uid", actualizarUsuarioValidator, actualizarUsuarios)

router.patch("/eliminarUsuario/:uid", eliminarUsuarioValidator, eliminarUsuario)

export default router