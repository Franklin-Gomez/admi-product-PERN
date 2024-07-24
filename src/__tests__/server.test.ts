import server from "../server"
import request from "supertest"

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
