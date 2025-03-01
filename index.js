import { config } from "dotenv";
import { initServer } from "./configs/server.js"
import { crearAdmin } from "./configs/crearAdmin.js";
import { crearCategoriaDefault } from "./configs/crearCategoriaDefault.js";

config()
initServer()
crearAdmin()
crearCategoriaDefault()