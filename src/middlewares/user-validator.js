import { body, param } from "express-validator";
import { correoExists, userExists } from "../helpers/db-validators.js";
import { validarCampos } from "./validar-campos.js";
import { handleErrors } from "./handleErrors.js";
import { validateJWT } from "./validate-jwt.js";
import { hasRoles } from "./validate-roles.js";
import { soloListarCategoria } from "../helpers/categoria-helper.js";

export const registerValidator = [
    body("nombre").notEmpty().withMessage("El nombre es requerido"),
    body("apellido").notEmpty().withMessage("El apellido es requerido"),
    body("telefono").notEmpty().withMessage("El teléfono es requerido"),
    body("nit").notEmpty().withMessage("El NIT es requerido"),
    body("nit").isLength({ min: 8, max: 8 }).withMessage("El NIT debe tener 8 caracteres"),
    body("correo").notEmpty().withMessage("El email es requerido"),
    body("correo").isEmail().withMessage("No es un email válido"),
    body("correo").custom(correoExists),
    /*body("contra").isStrongPassword({
        minLength: 8,
        minLowercase:1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
    }),*/
    validarCampos,
    handleErrors
]

export const crearUsuarioValidator = [
    validateJWT,
    hasRoles("ADMIN"),
    body("nombre").notEmpty().withMessage("El nombre es requerido"),
    body("correo").notEmpty().withMessage("El email es requerido"),
    body("correo").isEmail().withMessage("No es un email válido"),
    body("correo").custom(correoExists),
    body("telefono").notEmpty().withMessage("El teléfono es requerido"),
    body("nit").notEmpty().withMessage("El NIT es requerido"),
    body("nit").isLength({ min: 8, max: 8 }).withMessage("El NIT debe tener 8 caracteres"),
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

export const loginValidator = [
    body("correo").isEmail().withMessage("Correo en formato invalido"),
    validarCampos,
    handleErrors
];

export const actualizarUsuarioValidator = [
    validateJWT,
    hasRoles("CLIENT", "ADMIN"),
    validarCampos,
    handleErrors
]

export const actualizarAdminValidator = [
    validateJWT,
    hasRoles("ADMIN"),
    validarCampos,
    handleErrors
]

export const eliminarUsuarioModoAdminValidator = [
    validateJWT,
    hasRoles("ADMIN"),
    param("uid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    validarCampos,
    handleErrors
]

export const eliminarUsuarioValidator = [
    validateJWT,
    hasRoles("ADMIN", "CLIENT"),
    validarCampos,
    handleErrors
]

export const validadorGeneralUsuario = [
    validateJWT,
    hasRoles("CLIENT", "ADMIN"),
    validarCampos,
    handleErrors
]

export const carritoValidator = [
    validateJWT,
    hasRoles("CLIENT", "ADMIN"),
    body("pid").isMongoId().withMessage("No es un ID válido de MongoDB"),
    body("cantidad").isInt({ min: 1 }).withMessage("La cantidad debe ser un número entero positivo mayor que 0"),
    validarCampos,
    handleErrors
]

export const explorarProductosValidator = [
    validateJWT,
    hasRoles("CLIENT", "ADMIN"),
    body('nombre').optional().isString().withMessage("El nombre debe ser una cadena de texto"),
    body('categoria').optional().isMongoId().withMessage("La categoría no es válida"),
    body('masVendidos').optional().isBoolean().withMessage("El parámetro 'masVendidos' debe ser un valor booleano"),
    body('listarCategorias').optional().isBoolean().withMessage("El parámetro 'listarCategorias' debe ser un valor booleano")
    .custom(soloListarCategoria),
    validarCampos,
    handleErrors
]

export const finalizarCompraValidator = [
    validateJWT,
    hasRoles("CLIENT", "ADMIN"),
    body("metodoPago").notEmpty().withMessage("El método de pago es requerido"),
    validarCampos,
    handleErrors
]