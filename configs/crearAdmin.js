import bcrypt from "bcrypt"
import Usuarios from "../src/user/user.model.js"

export const crearAdmin = async() =>{
    try{
        const adminExistente = await Usuarios.findOne({ rol: "ADMIN" });

        if (adminExistente) {
            console.log("Ya existe un administrador en la base de datos.");
            return;
        }

        const adminDatos = {
            nombre: "Admin",
            apellido: "PorDefecto",
            username: "admin",
            correo: "admin@gmail.com",
            contra: "admin",
            rol: "ADMIN"
        };

        const saltos = await bcrypt.genSalt(10);
        adminDatos.contra = await bcrypt.hash(adminDatos.contra, saltos);

        const nuevoAdmin = new Usuarios(adminDatos);
        await nuevoAdmin.save();

        console.log("Administrador por defecto creado exitosamente.");
    }catch(err){
        console.error("Error al crear el administrador por defecto:", err.message);
    }
}