import { body } from "express-validator";
import { validarCampos } from "./validar-campos.js";
import { handleErrors } from "./handleErrors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";

export const editarFacturaValidator = [
    validateJWT,
    hasRoles("ADMIN"),
    body("productos").notEmpty().withMessage("El producto es requerido"),
    body("productos").isArray().withMessage("El producto debe ser un arreglo"),
    body("metodoPago").optional(),
    validarCampos,
    handleErrors
]

export const listarFacturasUsuarioValidator = [
    validateJWT,
    hasRoles("CLIENT", "ADMIN"),
    validarCampos,
    handleErrors
]