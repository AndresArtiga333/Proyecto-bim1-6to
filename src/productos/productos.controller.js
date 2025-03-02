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

export const listarProductos = async (req, res) => {
    try{
        const {pid} = req.body;
        let producto = {};
        if(pid){
            producto = await Productos.findById(pid);
            if(!producto){
                return res.status(403).json({
                    success: false,
                    message: "El producto no existe"
                })
            }
            return res.status(200).json({
                success: true,
                producto
            })
        }else{
            const productos = await Productos.find({status: true});
            return res.status(200).json({
                success: true,
                productos
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