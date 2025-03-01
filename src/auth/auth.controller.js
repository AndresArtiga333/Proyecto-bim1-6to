import bcrypt from "bcrypt";
import Usuario from "../user/user.model.js"
import { generateJWT } from "../helpers/generate-jwt.js";

export const register = async (req, res) =>{
    try{
        const data = req.body;
        const saltos = bcrypt.genSaltSync(10);
        const encryptedPassword = bcrypt.hashSync(data.contra, saltos)
        data.contra = encryptedPassword

        const user = await Usuario.create(data)

        return res.status(201).json({
            message: "El usuario ha sido registrado",
            nombre: user.nombre,
            correo: user.correo
        });
    }catch(err){
        return res.status(500).json({
            message: "User registration failed",
            error: err.message
        });
    }
}

export const login = async (req, res) =>{
    try{
        const {correo, contra} = req.body
        const user = await Usuario.findOne({correo})

        if (!user) {
            return res.status(404).json({
                message: "Usuario no encontrado"
            });
        }


        const contraseñaValida = await bcrypt.compare(contra, user.contra);
        if (!contraseñaValida) {
            return res.status(400).json({
                message: "Credenciales inválidas",
                error: "Contraseña incorrecta"
            });
        }

        const token = await generateJWT(user._id)

        return res.status(200).json({
            success: true,
            message: "Login exitoso",
            userDetails: {
                token: token
            }
        })

    }catch(err){
        return res.status(500).json({
            message: "Login failed",
            error: err.message
        });
    }
}
    