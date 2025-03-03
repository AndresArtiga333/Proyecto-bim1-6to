import Productos from './productos.model.js';
import Categoria from '../categoria/categoria.model.js';

export const agregarProducto = async (req, res) => {
    try{
        const {nombre, precio, descripcion, categoria, stock} = req.body;
        const producto = await Productos.create({nombre, precio, descripcion, categoria, stock});

        const productoConCategoria = await Productos.findById(producto._id).populate("categoria", "nombre");
        return res.status(200).json({
            success: true,
            message: "Producto agregado correctamente",
            datos: {
                nombre: productoConCategoria.nombre,
                precio: productoConCategoria.precio,
                descripcion: productoConCategoria.descripcion,
                stock: productoConCategoria.stock,
                categoria: productoConCategoria.categoria.nombre // Nombre de la categoría
            }
        });
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al agregar el producto",
            error: err.message
        })
    }
}

export const listarYBuscarProductos = async (req, res) => {
    try{
        const {pid} = req.body;
        let producto = {};
        if(pid){
            producto = await Productos.findById(pid).populate("categoria", "nombre");
            if(!producto){
                return res.status(403).json({
                    success: false,
                    message: "El producto no existe"
                })
            }
            return res.status(200).json({
                success: true,
                datos:{
                    nombre: producto.nombre,
                    precio: producto.precio,
                    descripcion: producto.descripcion,
                    stock: producto.stock,
                    categoria: producto.categoria.nombre
                }
            })
        }else{
            const productos = await Productos.find({status: true}).populate("categoria", "nombre").populate("categoria", "nombre");
            const productosAtributos = productos.map(producto => ({
                nombre: producto.nombre,
                precio: producto.precio,
                descripcion: producto.descripcion,
                stock: producto.stock,
                categoria: producto.categoria.nombre
            }));
            return res.status(200).json({
                success: true,
                productos: productosAtributos
            })
        }
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al listar los productos",
            error: err.message
        })
    }
}

export const editarProducto = async (req, res) => {
    try{
        const {pid} = req.params;
        const data = req.body;
        const productoActualizado = await Productos.findByIdAndUpdate(pid, {$set: data}, {new: true}).populate("categoria", "nombre");

        if(!productoActualizado){
            return res.status(403).json({
                success: false,
                message: "El producto no existe"
            })
        }
        const producto = {
            nombre: productoActualizado.nombre,
            precio: productoActualizado.precio,
            descripcion: productoActualizado.descripcion,
            stock: productoActualizado.stock,
            categoria: productoActualizado.categoria.nombre 
        };

        return res.status(200).json({
            success: true,
            message: "Producto actualizado correctamente",
            producto: producto
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al actualizar el producto",
            error: err.message
        })
    }
}

export const productosAgotados = async (req, res) => {
    try{
        const productosAgotados = await Productos.find({stock: 0}).populate("categoria", "nombre");

        if (productosSinStock.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No hay productos sin stock"
            });
        }
        const productosAtributos = productosAgotados.map(producto => ({
            nombre: producto.nombre,
            precio: producto.precio,
            descripcion: producto.descripcion,
            stock: producto.stock,
            categoria: producto.categoria.nombre
        }));
        return res.status(200).json({
            success: true,
            productos: productosAtributos
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al listar los productos agotados",
            error: err.message
        })
    }
}

export const productosMasVendidos = async (req, res) => {
    try{
        const {limite} = req.body;
        const productosMasVendidos = await Productos.find({vendidos: {$gt: 0}}).sort({vendidos: -1})
        .limit(limite ? parseInt(limite) : 10).populate("categoria", "nombre");
        if (productosMasVendidos.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No hay productos más vendidos"
            });
        }
        const productosAtributos = productosMasVendidos.map(producto => ({
            nombre: producto.nombre,
            precio: producto.precio,
            descripcion: producto.descripcion,
            vendidos: producto.vendidos,
            stock: producto.stock,
            categoria: producto.categoria.nombre
        }));
        return res.status(200).json({
            success: true,
            productos: productosAtributos
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al listar los productos más vendidos",
            error: err.message
        })
    }
}

export const eliminarProducto = async (req, res) => {
    try{
        const {pid} = req.params;
        if(!pid){
            return res.status(403).json({
                success: false,
                message: "El producto no existe"
            })
        }
        const productoEliminado = await Productos.findByIdAndUpdate(pid, { status: false }, { new: true }).populate("categoria", "nombre");
        const respuesta = {
        nombre: productoEliminado.nombre, 
                status: productoEliminado.status
            };

        return res.status(200).json({
            success: true,
            message: "Producto eliminado correctamente",
            producto: respuesta
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el producto",
            error: err.message
        })
    }
}