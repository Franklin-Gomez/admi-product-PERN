// configuracion del servidor
import express from "express";
import router from "./router";
import db from "./config/db";

// Conectar a base de datos
async function  connectDB () { 
    try {
        
        await db.authenticate() // verificamos que la connectio is OK
        db.sync()
        console.log('Conexion exitosa a la DB')

    } catch (error) {
        console.log( error );
        console.log('hubo un error al conectar a la DB')
    }
}

connectDB()

const server = express()

server.use('/api/products', router )


export default server