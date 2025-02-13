import { Schema, model } from "mongoose";

const userSchema = Schema({
    nombre:{
        type: String,
        required: [true, "El nombre es requerido"],
        maxLength: [25, "Solo menos de 25 caracteres"]
    },
    apellido:{
        type: String,
        required:[true, "El nombre es requerido"],
        maxLength: [25, "Solo menos de 25 caracteres"]
    },
    correo:{
        type: String,
        required:[true, "El nombre es requerido"],
        unique: true
    },
    contra:{
        type:String,
        required: [true, "La contraseña es requerida"]
    },
    telefono:{
        type: String,
        minLength: 8,
        maxLength: 8,
        required: true
    },
    rol:{
        type: String,
        required: true,
        enum: ["ADMIN", "CLIENT"],
        default: "CLIENT"
    },
    status:{
        type: Boolean,
        default: true
    }
})

userSchema.methods.toJSON = function(){
    const {contra, _id, ...usuario} = this.toObject()
    usuario.uid = _id
    return usuario
}

export default model("User", userSchema)