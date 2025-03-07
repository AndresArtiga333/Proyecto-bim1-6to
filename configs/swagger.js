import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    swaggerDefinition:{
        openapi: "3.0.0",
        info:{
            titulo: "Proyecto bimestal 1",
            version: "1.0.0",
            descripcion: "Api para la gestion de una tienda de productos",
            contacto:{
                nombre: "Andres Artiga",
                correo: "aartiga-2020246@kinal.edu.gt"
            }
        },
        servers:[
            {
                url: "http://127.0.0.1:3000/proyectoBim/v1"
            }
        ]
    },
    apis:[
        "./src/auth/auth.routes.js",
        "./src/user/user.routes.js",
        "./src/categoria/categoria.routes.js",
        "./src/productos/productos.routes.js",
        "./src/factura/factura.routes.js"
    ]
}

const swaggerDocs = swaggerJSDoc(options);

export {swaggerDocs, swaggerUi}