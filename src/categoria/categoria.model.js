import { Schema, model } from "mongoose";

const categoriaSchema = Schema({
    nombre:{
        type: String,
        required: [true, "El nombre de la categoria es requerido"]
    },
    descripcion:{
        type: String,
        required: [true, "La descripcion es requerida"]
    }
})

export default model("Categoria", categoriaSchema)
