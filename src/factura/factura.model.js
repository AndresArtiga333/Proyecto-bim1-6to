import { Schema, model } from "mongoose";

const facturaSchema = new Schema({
    usuario: {
        type: Schema.Types.ObjectId,
        ref: "User",  
        required: true
    },
    productos: [{
        producto: {
            type: Schema.Types.ObjectId,
            ref: "Producto",  
            required: true
        },
        nombre: {
            type: String,
            required: true
        },
        cantidad: {
            type: Number,
            required: true
        },
        precio: {
            type: Number,
            required: true
        }
    }],
    total: {
        type: Number,
        required: true
    },
    metodoPago: {
        type: String,
        required: true,
        enum: ["TARJETA", "EFECTIVO"]
    },
    fechaCompra: {
        type: Date,
        default: Date.now
    }
}, {
    versionKey: false
});

export default model("Factura", facturaSchema);