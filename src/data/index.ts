import { exit } from 'node:process'
import db from '../config/db'

//exit - detiene la ejecucion de un codigo node.js

const clearDB = async () => { 

    try {
    
        await db.sync({force : true})
        console.log('datos eliminados correctamente')
        exit(0) // finalizo el programa Correctamente
    
    } catch (error) {

        console.log( error )
        exit(1) // finalizo el programa con errores
    }

}

if( process.argv[2] ===  '--clear') { 
    clearDB()
}
