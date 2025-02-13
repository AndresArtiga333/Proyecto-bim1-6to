import { body, param } from "express-validator";
import { correoExists, userExists } from "../helpers/db-validators.js";
import { validarCampos } from "./validar-campos.js";
import { handleErrors } from "./handleErrors.js";

export const registerValidator = [
    body("nombre").notEmpty().withMessage("El nombre es requerido"),
    body("correo").notEmpty().withMessage("El email es requerido"),
    body("correo").isEmail().withMessage("No es un email válido"),
    body("correo").custom(correoExists),
    /*body("password").isStrongPassword({
        minLength: 8,
        minLowercase:1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }),*/
    validarCampos,
    handleErrors
]

export const actualizarUsuarioValidator = [
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    param("uid").custom(userExists),
    validarCampos,
    handleErrors
]

export const eliminarUsuarioValidator = [
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB")
]