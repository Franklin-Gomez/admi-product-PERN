// configuracion del servidor
import express from "express";
import router from "./router";
import db from "./config/db";
import colors from 'colors';
import swaggerUi from "swagger-ui-express";
import swaggerSpec , { swaggerUiOptions } from "./config/swagger";
import cors , { CorsOptions} from 'cors'
import morgan from 'morgan'

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

// Permitir Conexiones
const corsOption : CorsOptions = { 
    origin: function( origin , callback) { 

        // origin - quien esta haciendo la peticion
        // callback - permitir la conexion

        if( origin === process.env.FRONTEND_URL){
            // aceptamos la conexion
            callback( null , true)
        } else { 
            // rechazamos la conexion
            callback( new Error('Error de Cors') )
        }
        
    }
}
server.use( cors( corsOption ))


// leer datos de formularios
server.use(express.json())

server.use(morgan('dev'))

server.use('/api/products', router )

// Docs , documentacion
server.use('/docs' , swaggerUi.serve , swaggerUi.setup(swaggerSpec , swaggerUiOptions)  )

export default server