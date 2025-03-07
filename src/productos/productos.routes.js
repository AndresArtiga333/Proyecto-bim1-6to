import { Router } from "express";
import { agregarProducto, listarYBuscarProductos, editarProducto, productosAgotados, productosMasVendidos
    , eliminarProducto
 } from "./productos.controller.js";
import { agergarProductosValidator, validatorGeneral } from "../middlewares/productos-validator.js";

const router = Router()

/**
 * @swagger
 * /productos/agregarProducto:
 *   post:
 *     summary: Agregar un nuevo producto
 *     tags: [Producto]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del producto
 *                 example: "Sillon"
 *               precio:
 *                 type: number
 *                 description: Precio del producto
 *                 example: 10
 *               descripcion:
 *                 type: string
 *                 description: Descripción del producto
 *                 example: "Sillon cómodo"
 *               categoria:
 *                 type: string
 *                 description: ID de la categoría
 *                 example: "67ca4959e1534dc9a8ed2950"
 *               stock:
 *                 type: number
 *                 description: Stock del producto
 *                 example: 100
 *     responses:
 *       200:
 *         description: Producto agregado correctamente
 *       500:
 *         description: Error al agregar el producto
 *     roles:
 *       - ADMIN
 */
router.post("/agregarProducto", agergarProductosValidator, agregarProducto)

/**
 * @swagger
 * /productos/listarYBuscarProductos:
 *   get:
 *     summary: Listar y buscar productos
 *     tags: [Producto]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pid:
 *                 type: string
 *                 description: ID del producto (opcional)
 *                 example: "67ca4e4f1402bce8baca75b0"
 *     responses:
 *       200:
 *         description: Lista de productos obtenida con éxito
 *       403:
 *         description: El producto no existe
 *       500:
 *         description: Error al listar los productos
 *     roles:
 *       - ADMIN
 */
router.get("/listarYBuscarProductos", validatorGeneral, listarYBuscarProductos)

/**
 * @swagger
 * /productos/editarProducto/{pid}:
 *   put:
 *     summary: Editar un producto existente
 *     tags: [Producto]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: pid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del producto
 *                 example: "Leche deslactosada"
 *               precio:
 *                 type: number
 *                 description: Precio del producto
 *                 example: 15
 *               descripcion:
 *                 type: string
 *                 description: Descripción del producto
 *                 example: "Leche sin lactosa"
 *               stock:
 *                 type: number
 *                 description: Stock del producto
 *                 example: 50
 *     responses:
 *       200:
 *         description: Producto actualizado correctamente
 *       403:
 *         description: El producto no existe
 *       500:
 *         description: Error al actualizar el producto
 *     roles:
 *       - ADMIN
 */
router.put("/editarProducto/:pid", validatorGeneral, editarProducto)

/**
 * @swagger
 * /productos/productosAgotados:
 *   get:
 *     summary: Listar productos agotados
 *     tags: [Producto]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de productos agotados obtenida con éxito
 *       500:
 *         description: Error al listar los productos agotados
 *     roles:
 *       - ADMIN
 */
router.get("/productosAgotados", validatorGeneral, productosAgotados)

/**
 * @swagger
 * /productos/productosMasVendidos:
 *   get:
 *     summary: Listar productos más vendidos
 *     tags: [Producto]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               limite:
 *                 type: number
 *                 description: Límite de productos a listar (opcional)
 *                 example: 10
 *     responses:
 *       200:
 *         description: Lista de productos más vendidos obtenida con éxito
 *       500:
 *         description: Error al listar los productos más vendidos
 *     roles:
 *       - ADMIN
 */
router.get("/productosMasVendidos", validatorGeneral, productosMasVendidos)

/**
 * @swagger
 * /productos/eliminarProducto/{pid}:
 *   patch:
 *     summary: Eliminar un producto existente
 *     tags: [Producto]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: pid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del producto
 *     responses:
 *       200:
 *         description: Producto eliminado correctamente
 *       403:
 *         description: El producto no existe
 *       500:
 *         description: Error al eliminar el producto
 *     roles:
 *       - ADMIN
 */
router.patch("/eliminarProducto/:pid", validatorGeneral, eliminarProducto)

export default router