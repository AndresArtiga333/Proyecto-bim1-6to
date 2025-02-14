import { Schema, model } from "mongoose";

const productoSchema = Schema({
    nombre:{
        type: String,
        required: [true, "El nombre del producto es requerido"],
        maxLength: [30, "El nombre no puede exceder los 25 caracteres"]
    },
    descripcion:{
        type: String,
        required: [true, "La descripcion es requerida"],
        maxLength: [50, "La descripcion no puede pasar de 50 caracteres"]
    },
    precio:{
        type: String,
        required: [true, "El precio es requerido"]
    },
    categoria:{
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    stock:{
        type: Number
    }
})

export default model("Productos", productoSchema)