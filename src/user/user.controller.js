import Usuarios from "./user.model.js"

export const actualizarUsuarios = async (req, res) =>{
    try{
        const {uid} = req.params;
        const data = req.body;

        const usuarioActualizado = await Usuarios.findOneAndUpdate(
        { _id: uid, rol: { $ne: "ADMIN" } }, {$set: data}, { new: true }
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

export const eliminarUsuario = async (req, res) => {
    try{
        const { uid } = req.params
        
        const user = await Usuarios.findByIdAndUpdate(uid, {status: false}, {new: true})

        if (!user || user.rol === "ADMIN") {
            return res.status(403).json({
                success: false,
                message: "No se puede editar a los administradores o el usuario no existe"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Usuario eliminado",
            user
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: "Error al eliminar el usuario",
            error: err.message
        })
    }
}