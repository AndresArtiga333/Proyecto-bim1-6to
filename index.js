import { config } from "dotenv";
import { initServer } from "./configs/server.js"
import { crearAdmin } from "./configs/crearAdmin.js";

config()
initServer()
crearAdmin()