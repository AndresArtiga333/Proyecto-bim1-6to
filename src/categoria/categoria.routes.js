import { Router } from "express";
import { agregarCategoria, listarCategorias, editarCategoria, eliminarCategoria } from "./categoria.controller.js";
import { agergarCategoriaValidator, listarCategoriasValidator, editarCategoriaValidator, eliminarCategoriaValidator } from "../middlewares/categoria-validator.js";

const router = Router();

/**
 * @swagger
 * /categoria/agregarCategoria:
 *   post:
 *     summary: Agregar una nueva categoría
 *     tags: [Categoria]
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
 *                 description: Nombre de la categoría
 *                 example: "Electrónica"
 *     responses:
 *       200:
 *         description: Categoria agregada correctamente
 *       500:
 *         description: Error al agregar la categoria
 *     roles:
 *       - ADMIN
 */
router.post("/agregarCategoria", agergarCategoriaValidator, agregarCategoria);

/**
 * @swagger
 * /categoria/listarCategorias:
 *   get:
 *     summary: Listar todas las categorías
 *     tags: [Categoria]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de categorías
 *       500:
 *         description: Error al listar las categorias
 *     roles:
 *       - ADMIN
 */
router.get("/listarCategorias", listarCategoriasValidator, listarCategorias);

/**
 * @swagger
 * /categoria/editarCategoria/{cid}:
 *   put:
 *     summary: Editar una categoría existente
 *     tags: [Categoria]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la categoría
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre de la categoría
 *                 example: "Electrodomésticos"
 *     responses:
 *       200:
 *         description: Categoria actualizada correctamente
 *       403:
 *         description: La categoria no existe
 *       500:
 *         description: Error al actualizar la categoria
 *     roles:
 *       - ADMIN
 */
router.put("/editarCategoria/:cid", editarCategoriaValidator, editarCategoria);

/**
 * @swagger
 * /categoria/eliminarCategoria/{cid}:
 *   patch:
 *     summary: Eliminar una categoría existente
 *     tags: [Categoria]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la categoría
 *     responses:
 *       200:
 *         description: Categoria eliminada correctamente
 *       403:
 *         description: La categoria no existe
 *       500:
 *         description: Error al eliminar la categoria
 *     roles:
 *       - ADMIN
 */
router.patch("/eliminarCategoria/:cid", eliminarCategoriaValidator, eliminarCategoria);

export default router;