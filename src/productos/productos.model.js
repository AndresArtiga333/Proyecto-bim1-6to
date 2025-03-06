import { Schema, model } from "mongoose";

const productoSchema = Schema({
    nombre:{
        type: String,
        required: [true, "El nombre es requerido"],
        unique: true
    },
    precio:{
        type: Number,
        required: [true, "El precio es requerido"]
    },
    descripcion:{
        type: String,
        required: [true, "La descripcion es requerida"]
    },
    categoria:{
        type: Schema.Types.ObjectId,
        ref: "Categoria",
        required: true
    },
    stock: {
        type: Number,
        required: [true, "El stock del producto es requerido"],
        min: [0, "El stock no puede ser negativo"],
        default: 0
    },
    vendidos: {
        type: Number,
        default: 0
    },
    status:{
        type: Boolean,
        default: true
    }
},
{
    versionKey: false
})

productoSchema.methods.toJSON = function(){
    const {_id, ...producto} = this.toObject()
    producto.pid = _id
    return producto
}

export default model("Producto", productoSchema)