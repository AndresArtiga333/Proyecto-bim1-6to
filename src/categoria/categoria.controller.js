import Categoria from './categoria.model.js';
import Productos from '../productos/productos.model.js';

export const agregarCategoria = async (req, res) => {
    try{
        const {nombre} = req.body;
        const categoria = await Categoria.create({nombre});

        const guardarCategoria = await categoria.save();
        return res.status(200).json({
            message: "Categoria agregada correctamente",
            categoria: guardarCategoria.nombre
        })

    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al agregar la categoria",
            error: err.message
        })
    }
}

export const listarCategorias = async (req, res) => {
    try{
        const categorias = await Categoria.find({status: true});
        return res.status(200).json({
            success: true,
            categorias
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al listar las categorias",
            error: err.message
        })
    }
}

export const editarCategoria = async (req, res) => {
    try{
        const {cid} = req.params;
        const data = req.body;
        const categoriaActualizada = await Categoria.findByIdAndUpdate(cid, {$set: data}, {new: true});

        if(!categoriaActualizada){
            return res.status(403).json({
                success: false,
                message: "La categoria no existe"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Categoria actualizada correctamente",
            categoriaActualizada
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al actualizar la categoria",
            error: err.message
        })
    }
}

export const eliminarCategoria = async (req, res) => {
    try{
        const {cid} = req.params;

        const categoriaDefault = await Categoria.findOne({ nombre: "default" });
        if (!categoriaDefault) {
            return res.status(500).json({
                success: false,
                message: "La categoría 'default' no existe"
            });
        }
        await Productos.updateMany(
            { categoria: cid }, 
            { categoria: categoriaDefault._id } 
        );

        const categoria = await Categoria.findByIdAndUpdate(cid, {status: false}, {new: true});
        if(!categoria){
            return res.status(403).json({
                success: false,
                message: "La categoria no existe"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Categoria eliminada correctamente"
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al eliminar la categoria",
            error: err.message
        })
    }
}