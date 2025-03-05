import bcrypt from "bcrypt";
import Usuarios from "./user.model.js"
import Productos from "../productos/productos.model.js"
import Categoria from "../categoria/categoria.model.js"
import Carrito from "../carrito/carrito.model.js"

export const agregarUsuario = async (req, res) =>{
    try{
        const data = req.body;
            const saltos = bcrypt.genSaltSync(10);
            const encryptedPassword = bcrypt.hashSync(data.contra, saltos)
            data.contra = encryptedPassword
        
            const user = await Usuarios.create(data)
        
            return res.status(201).json({
                message: "El usuario ha sido registrado",
                nombre: user.nombre,
                correo: user.correo
            });
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al agregar el usuario",
            error: err.message
        })
    }
}

export const actualizarUsuarios = async (req, res) =>{
    try{
        const {usuario} = req;
        const data = req.body;

        const usuarioActualizado = await Usuarios.findOneAndUpdate(
         usuario, {$set: data}, { new: true }
        );

        if (!usuarioActualizado) {
            return res.status(403).json({
                success: false,
                message: "No se puede editar a los administradores o el usuario no existe"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Usuario actualizado correctamente",
            usuarioActualizado
        });
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al actualizar contraseña",
            error: err.message
        })
    }
}

export const actualizarModoAdmin = async (req, res) =>{
    try{
        const{uid} = req.params;
        const data = req.body;
        const adminActualizar = await Usuarios.findOneAndUpdate(
            { _id: uid, rol: { $ne: "ADMIN" } }, {$set: data}, { new: true }
            );

            if (!adminActualizar) {
                return res.status(403).json({
                    success: false,
                    message: "No se puede editar a los administradores o el usuario no existe"
                });
            }

        return res.status(200).json({
            success: true,
            message: "Usuario",
            adminActualizar
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al actualizar el usuario",
            error: err.message
        })
    }
}

export const eliminarUsuarioModoAdmin = async (req, res) => {
    try{
        const { uid } = req.params
        
        const usuarioParaEliminar = await Usuarios.findOneAndUpdate(
            { _id: uid, rol: { $ne: "ADMIN" } }, {status: false}, { new: true }
            );

        if (!usuarioParaEliminar) {
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Usuario eliminado",
            usuarioParaEliminar
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el usuario",
            error: err.message
        })
    }
}

export const eliminarUsuario = async (req, res) =>{
    try{
        const {usuario} = req;
        const {contra} =req.body;
        const eliminarUsuario = await Usuarios.findById(usuario);
        if(!eliminarUsuario){
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            })
        }

        const valida = await bcrypt.compare(contra, usuario.contra);
        if (!valida) {
            return res.status(400).json({
                success: false,
                message: "No es tu contraseña"
            });
        }

        usuario.status = false;
        await usuario.save();

        return res.status(200).json({
            success: true,
            message: "Usuario eliminado"
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el usuario",
            error: err.message
        })
    }
}

export const explorarProductos = async (req, res) => {
    try {
        const { nombre, categoria, masVendidos, listarCategorias } = req.body;
        const filter = {};
 
        if (categoria) {
            filter.categoria = categoria;
        }
 
        if (nombre) {
            filter.nombre = nombre;
        }

        if(listarCategorias){
            const categorias = await Categoria.find({status: true});
            return res.status(200).json({
                success: true,
                categorias
            })
        }
 
        let orden = {};
        if (masVendidos) {
            orden.vendidos = -1;
        }
 
        const productos = await Productos.find(filter).sort(orden).populate("categoria", "nombre");
    
        if (productos.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No se encontraron productos con los filtros proporcionados"
            });
        }

        const productosAtributos = productos.map(producto => ({
            nombre: producto.nombre,
            precio: producto.precio,
            descripcion: producto.descripcion,
            stock: producto.stock,
            categoria: producto.categoria.nombre, 
            ventas: producto.vendidos
        }));

        return res.status(200).json({
            success: true,
            productos: productosAtributos
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error filtering products",
            error: err.message
        });
    }
};

export const agregarAlCarrito = async (req, res) => {
    try{
        const {usuario} = req;
        const {pid, cantidad} = req.body;

        const producto = await Productos.findById(pid);
        if(!producto){
            return res.status(404).json({
                success: false,
                message: "Producto no encontrado"
            })
        }
        if (producto.stock < cantidad) {
            return res.status(400).json({
                success: false,
                message: "No hay suficiente stock disponible"
            });
        }

        let carrito = await Carrito.findOne({usuario: usuario._id});
        if(!carrito){
            carrito = await Carrito.create({usuario: usuario._id, productos: []})
        }
        const productoEnCarrito = carrito.productos.find(p => p.producto.toString() === producto._id.toString());
        if(productoEnCarrito){
            const cantidadTotal = productoEnCarrito.cantidad + cantidad;

            if (cantidadTotal > producto.stock) {
                return res.status(400).json({
                    success: false,
                    message: "No hay suficiente stock para la cantidad solicitada"
                });
            }

            productoEnCarrito.cantidad += cantidad;
        } else {
            carrito.productos.push({producto: producto._id, cantidad});
        }

        let total = 0;
        for (let item of carrito.productos) {
            const productoData = await Productos.findById(item.producto); 
            total += productoData.precio * item.cantidad;  
        }
        carrito.total = total;
        await carrito.save();
        return res.status(201).json({
            success: true,
            message: "Producto agregado al carrito",
            carrito
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al agregar al carrito",
            error: err.message
        })
    }
}; 