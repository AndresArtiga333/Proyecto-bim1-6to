import { Schema, model } from "mongoose";

const carritoSchema= Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: "User", 
        required: true,
        unique: true 
    },
    productos: [{
        producto: {
            type: Schema.Types.ObjectId,
            ref: "Producto", 
            required: true
        },
        cantidad: {
            type: Number,
            required: true,
            min: 1 
        }
    }],
    total: {
        type: Number
    }
},
{
    versionKey: false
})

export default model("Carrito", carritoSchema);