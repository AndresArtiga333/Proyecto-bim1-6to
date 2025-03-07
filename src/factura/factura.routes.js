import { Router } from "express";
import { editarFactura, listarFacturasUsuario } from "./factura.controller.js";
import { editarFacturaValidator, listarFacturasUsuarioValidator } from "../middlewares/factura-validator.js";

const router = Router();

/**
 * @swagger
 * /factura/editarFactura/{fid}:
 *   put:
 *     summary: Editar una factura existente
 *     tags: [Factura]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: fid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la factura
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               productos:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     producto:
 *                       type: string
 *                       description: ID del producto
 *                       example: "67ca4e4f1402bce8baca75b0"
 *                     cantidad:
 *                       type: number
 *                       description: Cantidad del producto
 *                       example: 2
 *               metodoPago:
 *                 type: string
 *                 description: Método de pago
 *                 example: "TARJETA"
 *     responses:
 *       200:
 *         description: Factura actualizada con éxito
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Factura o producto no encontrado
 *       500:
 *         description: Error al editar la factura
 *     roles:
 *       - ADMIN
 */
router.put("/editarFactura/:fid", editarFacturaValidator, editarFactura);

/**
 * @swagger
 * /factura/listarFacturasUsuario/{uid}:
 *   get:
 *     summary: Listar facturas por usuario
 *     tags: [Factura]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Facturas obtenidas con éxito
 *       404:
 *         description: Usuario o facturas no encontradas
 *       500:
 *         description: Error al listar las facturas
 *     roles:
 *       - CLIENT
 *       - ADMIN
 */
router.get("/listarFacturasUsuario/:uid", listarFacturasUsuarioValidator, listarFacturasUsuario);

export default router;