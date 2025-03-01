import Categoria from '../src/categoria/categoria.model.js';

export const crearCategoriaDefault = async() =>{
    try{
        const categoriaExistente = await  Categoria.findOne({ nombre: "default" });
 
        if(categoriaExistente){
            console.log("Ya se creo una categoria por default");
            return;
        }
 
        const categoriaDatos ={
            nombre: "default"
        };
 
        const nuevaCategoria = new Categoria(categoriaDatos);
        await nuevaCategoria.save();
        console.log("Categoria creada exitosamente")
    }catch(err){
        console.error("Error al crear la categoria por defecto:", err.message);
    }
}