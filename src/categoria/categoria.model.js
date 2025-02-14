import { Schema, model } from "mongoose";

const cateSchema = Schema({
    nombre:{
        type: String,
        required: [true, "El nombre es requerido"],
        maxlength: [30, "La categoria no puede pasar de 30 caracteres"]
    },
    descripcion:{
        type: String,
        required: [true, "La categoria es requerida"],
        maxlength: [50, "La descripcion no puede pasar de 50 caracteres"]
    },
    status:{
        type: Boolean,
        default: true
    }
})

export default model("Categoria", cateSchema)