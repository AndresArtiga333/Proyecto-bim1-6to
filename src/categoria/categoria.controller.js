import Productos from "../productos/productos.model.js";
import Categorias from "../categoria/categoria.model.js";
import Usuarios from "../user/user.model.js"

export const agregarCategoria = async (req, res) =>{
    try{
        const {uid} = req.params;
        const {nombre, descripcion} = req.body;

        const usuario = await Usuarios.findById(uid);
        if(!usuario || usuario.rol === "CLIENT"){
            return res.status(403).json({
                success: false,
                message: "Usuario no encontrado o no es un administardor"
            });
        }
        const nuevaCategoria = new Categorias({nombre, descripcion});
        await nuevaCategoria.save();

        res.status(200).json({
            success: true,
            message: "Categoria agregada exitosamente",
            nuevaCategoria
        })
        
    }catch(err){
        res.status(500).json({
            success: false,
            msg: 'Error al agregar la categoria',
            error: err.message
        });
    }
}

export const listarCategorias = async (req, res) => {
    try {
        const categorias = await Categorias.find();
        res.status(200).json({
            success: true,
            categorias
        })
    } catch (error) {
        res.status(500).json({
            success: false, 
            message: "Error al listar las categorias",
            error: error.message });
    }
};

export const actualiarCategoria = async (req, res) =>{
    try{
        const {uid, cid} = req.params;
        const data = req.body;

        const usuario = await Usuarios.findById(uid);

        if(usuario.rol === "CLIENT"){
            return res.status(403).json({
                success: false,
                message: "Solo los administradores pueden actualizar las categorias"
            });
        }
        const categoria = await Categorias.findOneAndUpdate(
            { _id: cid}, {$set: data}, { new: true }
        );

        if(!categoria){
            return res.status(404).json({
                success: false,
                message: "Categoria no encontrada"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Categoria actualizada",
            categoria
        });
    }catch(err){
        res.status(500).json({
            success: false, 
            message: "Error al listar las categorias",
            error: err.message 
        });
    }
};

export const elimianrCategoria = async (req, res) =>{
    try{
        const {uid, cid} = req.params;

        const usuario = await Usuarios.findById(uid);

        if(!usuario || usuario.rol === "CLIENT"){
            return res.status(403).json({
                success: false,
                message: "Usuario no encontrado o no es un administardor"
            });
        }

        const defaultCategoria = await Categorias.findOne({nombre: "default"})
        if(!defaultCategoria){
            res.status(404).json({
                success: false,
                message: "Primero crea una categoria con este nombre: default"
            })
        }
        await Productos.updateMany({ categoria: cid }, { categoria: defaultCategoria._id });

        const categoria = await Categorias.findByIdAndUpdate(cid, {status: false}, {new: true})

        return res.status(200).json({
            success: true,
            message: "Categoria eliminada",
            categoria
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Error al eliminar la categoria",
            error: err.message
        })
    }
}