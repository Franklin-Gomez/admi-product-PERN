// configuracion del servidor
import express from "express";
import router from "./router";
import db from "./config/db";
import colors from 'colors';
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./config/swagger";

// Conectar a base de datos
export async function  connectDB () { 
    try {
        
        await db.authenticate() // verificamos que la connectio is OK
        db.sync()
        //console.log(colors.blue.bold('Conexion exitosa a la DB'))

    } catch (error) {
        //console.log( error );
        console.log(colors.red.bold('hubo un error al conectar a la DB'))
    }
}

connectDB()

// Instancia de express
const server = express()

// leer datos de formularios
server.use(express.json())

server.use('/api/products', router )

// Docs , documentacion
server.use('/docs' , swaggerUi.serve , swaggerUi.setup(swaggerSpec) )

export default server