'use strict'

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { dbConnection } from "./mongo.js";
import apiLimiter from "../src/middlewares/rate-limit-validator.js";
import authRoutes from "../src/auth/auth.routes.js"
import userRoutes from "../src/user/user.routes.js"
import categoriaRoutes from "../src/categoria/categoria.routes.js"
import productosRoutes from "../src/productos/productos.routes.js"
import facturaRoutes from "../src/factura/factura.routes.js"
import { swaggerDocs, swaggerUi } from "./swagger.js";

const middlewares = (app) => {
    app.use(express.urlencoded({extended: false}))
    app.use(express.json())
    app.use(cors())
    app.use(helmet())
    app.use(morgan("dev"))
    app.use(apiLimiter)
}

const routes = (app) =>{
    app.use("/proyectoBim/v1/auth", authRoutes)
    app.use("/proyectoBim/v1/user", userRoutes)
    app.use("/proyectoBim/v1/categoria", categoriaRoutes)
    app.use("/proyectoBim/v1/productos", productosRoutes)
    app.use("/proyectoBim/v1/factura", facturaRoutes)
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))

}

const conectarDB = async () =>{
    try{
        await dbConnection()
    }catch(err){
        console.log(`Database connection failed: ${err}`)
        process.exit(1)
    }
}

export const initServer = () => {
    const app = express()
    try{
        middlewares(app)
        conectarDB()
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running on port ${process.env.PORT}`)
    }catch(err){
        console.log(`Server init failed: ${err}`)
    }
}