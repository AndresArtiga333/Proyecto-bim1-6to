export const soloListarCategoria = (valor, {req}) =>{
    if (valor) {
        const { nombre, categoria, masVendidos } = req.body;
        if (nombre || categoria || masVendidos) {
            throw new Error("Si se especifica 'listarCategorias', no se pueden usar otros parámetros.");
        }
    }
    return true;
};
