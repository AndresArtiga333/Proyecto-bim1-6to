import { Router } from "express";
import { agregarUsuario, actualizarUsuarios, eliminarUsuario, actualizarModoAdmin,
     eliminarUsuarioModoAdmin, explorarProductos, agregarAlCarrito, finalizarCompra } from "./user.controller.js";
import { crearUsuarioValidator ,actualizarUsuarioValidator, eliminarUsuarioValidator
    ,eliminarUsuarioModoAdminValidator, actualizarAdminValidator,  explorarProductosValidator,
    carritoValidator, finalizarCompraValidator} from "../middlewares/user-validator.js";

const router = Router();

/**
 * @swagger
 * /user/agregarUsuario:
 *   post:
 *     summary: Agregar un nuevo usuario
 *     tags: [Usuario]
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
 *                 description: Nombre del usuario
 *                 example: "Daniel"
 *               apellido:
 *                 type: string
 *                 description: Apellido del usuario
 *                 example: "Tum"
 *               correo:
 *                 type: string
 *                 description: Correo del usuario
 *                 example: "dtum@gmail.com"
 *               contra:
 *                 type: string
 *                 description: Contraseña del usuario
 *                 example: "1234"
 *               telefono:
 *                 type: string
 *                 description: Teléfono del usuario
 *                 example: "12345678"
 *               nit:
 *                 type: string
 *                 description: NIT del usuario
 *                 example: "09876543"
 *     responses:
 *       201:
 *         description: El usuario ha sido registrado
 *       500:
 *         description: Error al agregar el usuario
 *     roles:
 *       - ADMIN
 */
router.post("/agregarUsuario", crearUsuarioValidator, agregarUsuario);

/**
 * @swagger
 * /user/actualizarUsuario:
 *   put:
 *     summary: Actualizar un usuario existente
 *     tags: [Usuario]
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
 *                 description: Nombre del usuario
 *                 example: "David"
 *               apellido:
 *                 type: string
 *                 description: Apellido del usuario
 *                 example: "Coloma"
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *       403:
 *         description: No se puede editar a los administradores o el usuario no existe
 *       500:
 *         description: Error al actualizar el usuario
 *     roles:
 *       - CLIENT
 *       - ADMIN
 */
router.put("/actualizarUsuario/", actualizarUsuarioValidator, actualizarUsuarios);

/**
 * @swagger
 * /user/actualizarModoAdmin/{uid}:
 *   put:
 *     summary: Actualizar un usuario a modo admin
 *     tags: [Usuario]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: boolean
 *                 description: Estado del usuario
 *                 example: true
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *       403:
 *         description: No se puede editar a los administradores o el usuario no existe
 *       500:
 *         description: Error al actualizar el usuario
 *     roles:
 *       - ADMIN
 */
router.put("/actualizarModoAdmin/:uid", actualizarAdminValidator, actualizarModoAdmin);

/**
 * @swagger
 * /user/eliminarUsuarioModoAdmin/{uid}:
 *   patch:
 *     summary: Eliminar un usuario en modo admin
 *     tags: [Usuario]
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
 *         description: Usuario eliminado correctamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error al eliminar el usuario
 *     roles:
 *       - ADMIN
 */
router.patch("/eliminarUsuarioModoAdmin/:uid", eliminarUsuarioModoAdminValidator, eliminarUsuarioModoAdmin);

/**
 * @swagger
 * /user/eliminarUsuario:
 *   patch:
 *     summary: Eliminar un usuario
 *     tags: [Usuario]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contra:
 *                 type: string
 *                 description: Contraseña del usuario
 *                 example: "1234"
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error al eliminar el usuario
 *     roles:
 *       - CLIENT
 *       - ADMIN
 */
router.patch("/eliminarUsuario/", eliminarUsuarioValidator, eliminarUsuario);

/**
 * @swagger
 * /user/explorarProductos:
 *   get:
 *     summary: Explorar productos
 *     tags: [Usuario]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 description: Nombre del producto (opcional)
 *                 example: "Sillon"
 *               categoria:
 *                 type: string
 *                 description: ID de la categoría (opcional)
 *                 example: "67ca4959e1534dc9a8ed2950"
 *               masVendidos:
 *                 type: boolean
 *                 description: Filtrar por productos más vendidos (opcional)
 *                 example: true
 *               listarCategorias:
 *                 type: boolean
 *                 description: Listar categorías (opcional)
 *                 example: true
 *     responses:
 *       200:
 *         description: Productos obtenidos con éxito
 *       404:
 *         description: No se encontraron productos con los filtros proporcionados
 *       500:
 *         description: Error al explorar productos
 *     roles:
 *       - CLIENT
 *       - ADMIN
 */
router.get("/explorarProductos", explorarProductosValidator, explorarProductos);

/**
 * @swagger
 * /user/agregarAlCarrito:
 *   post:
 *     summary: Agregar un producto al carrito
 *     tags: [Usuario]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pid:
 *                 type: string
 *                 description: ID del producto
 *                 example: "67ca51021402bce8baca75bc"
 *               cantidad:
 *                 type: number
 *                 description: Cantidad del producto
 *                 example: 1
 *     responses:
 *       201:
 *         description: Producto agregado al carrito
 *       400:
 *         description: No hay suficiente stock disponible
 *       404:
 *         description: Producto no encontrado
 *       500:
 *         description: Error al agregar al carrito
 *     roles:
 *       - CLIENT
 *       - ADMIN
 */
router.post("/agregarAlCarrito", carritoValidator, agregarAlCarrito);

/**
 * @swagger
 * /user/finalizarCompra:
 *   post:
 *     summary: Finalizar compra
 *     tags: [Usuario]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               metodoPago:
 *                 type: string
 *                 description: Método de pago
 *                 example: "TARJETA"
 *     responses:
 *       201:
 *         description: Compra completada con éxito
 *       400:
 *         description: El carrito está vacío o no existe
 *       404:
 *         description: Usuario o producto no encontrado
 *       500:
 *         description: Error al finalizar la compra
 *     roles:
 *       - CLIENT
 *       - ADMIN
 */
router.post("/finalizarCompra", finalizarCompraValidator, finalizarCompra);

export default router;