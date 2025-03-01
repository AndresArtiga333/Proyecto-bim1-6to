import Categoria from './categoria.model.js';

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