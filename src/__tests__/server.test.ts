import server ,  { connectDB } from "../server"
import request  from "supertest"
import db from "../config/db"

describe('GET /api' , () => { 
    it('should send back a json response' , async () => { 
        const res = await request(server).get('/api')
        //console.log( res ) // ver respuesta

        // lo que debe ser
        expect(res.status).toBe(200) // status 200 es OK
        expect(res.headers['content-type']).toMatch(/json/) // que la respuesta sea tipo .json
        expect(res.body.msg).toBe('desde api')

        // lo que no debe ser
        expect(res.status).not.toBe(404)
        expect(res.headers['content-type']).not.toMatch(/html/) 
        expect(res.body.msg).not.toBe('Desde API') 
    })
})

//=========================================================

jest.mock("../config/db") // creando el mock , importanto la conexion e la instancia de sequelize

describe('connectDB' , () => { 
    it('should handle database connection error' , async () => { 
        jest.spyOn( db , 'authenticate')// spyOn crea la funcion simulado , simula la funcion de authenticate - espera que se ejecuta authenticate
            .mockRejectedValueOnce(new Error('Hubo un error al conectar a la BD')) // negamos la promesa para que caiga en el error

        const consoleSpy = jest.spyOn( console ,'log') // revisara el console.log que tenemos en el catch

        await connectDB() // mandamos a llamar la conexion para que se i nicie la ejecucion

        expect( consoleSpy ).toHaveBeenCalledWith( // esperamos que el spy en la consola tenga ese texto
            expect.stringContaining('hubo un error al conectar a la DB')
        )
    })
})
