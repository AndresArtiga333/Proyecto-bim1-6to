import bcrypt from "bcrypt";
import Usuarios from "./user.model.js"

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
        const eliminarUsuario = await Usuarios.findOneAndUpdate(usuario, {status: false}, {new: true})
        if(!eliminarUsuario){
            return res.status(404).json({
                success: false,
                message: "Usuario no encontrado"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Usuario eliminado",
            eliminarUsuario
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el usuario",
            error: err.message
        })
    }
}