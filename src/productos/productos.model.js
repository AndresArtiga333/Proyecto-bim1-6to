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


productoSchema.methods.estaAgotado = function () {
    return this.stock === 0;
};

productoSchema.methods.actualizarStock = async function (cantidadVendida) {
    if (cantidadVendida > this.stock) {
        throw new Error("No hay suficiente stock para realizar la venta");
    }
    this.stock -= cantidadVendida;
    this.vendidos += cantidadVendida;
    await this.save();
};

productoSchema.methods.toJSON = function(){
    const {_id, ...producto} = this.toObject()
    producto.pid = _id
    return producto
}

export default model("Producto", productoSchema)