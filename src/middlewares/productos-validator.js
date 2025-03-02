import { body } from "express-validator";
import { validarCampos } from "./validar-campos.js";
import { handleErrors } from "./handleErrors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";

export const agergarProductosValidator = [
    validateJWT,
    hasRoles("ADMIN"),
    body("nombre").notEmpty().withMessage("El nombre es requerido"),
    body("precio").notEmpty().withMessage("El precio es requerido"),
    body("descripcion").notEmpty().withMessage("La descripcion es requerida"),
    body("categoria").isMongoId().withMessage("La categoria requiere un id de mongo valido"),
    body("stock").notEmpty().withMessage("El stock es requerido"),
    validarCampos,
    handleErrors
]

export const validatorGeneral = [
    validateJWT,
    hasRoles("ADMIN"),
    validarCampos,
    handleErrors
]