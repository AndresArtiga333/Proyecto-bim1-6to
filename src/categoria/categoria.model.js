import { Schema, model } from "mongoose";

const categoriaSchema = Schema({
    nombre:{
        type: String,
        required: [true, "El nombre es requerido"],
        unique: true
    },
    status:{
        type: Boolean,
        default: true
    }
})

categoriaSchema.methods.toJSON = function(){
    const {_id, ...categoria} = this.toObject()
    categoria.cid = _id
    return categoria
}

export default model("Categoria", categoriaSchema)