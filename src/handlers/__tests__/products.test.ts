import request from "supertest";
import server from "../../server";

describe('POST /api/products',() => { 

    it('soud display validation errors' , async () => {

        const response = await request(server).post('/api/products/').send({})

        // debe ser igual
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(4)

        // no debe ser igual
        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(2)
    })

    it('should display price = 0 or negative' , async () => { 
        const response = await request(server).post('/api/products').send({
            name : "Monitor Curvo",
            price : 0
        })

        // debe ser igual
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)

        // no debe ser igual
        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(2)
    }) 

    it('should display price is lowe than 0 or string' , async () => { 
        const response = await request(server).post('/api/products').send({
            name : "Monitor Curvo",
            price : "hola"
        })

        // debe ser igual
        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(2)

        // no debe ser igual
        expect(response.status).not.toBe(404)
        expect(response.body.errors).not.toHaveLength(1)
    }) 



    it('should create a new product' , async () => { 
        const response = await request(server).post('/api/products').send({
            name : "Mouse - Testing",
            price : 50
        })

        // debe ser igual
        expect(response.status).toBe(201)
        expect(response.body).toHaveProperty('data')
    
        
        // no debe ser igual 
        expect(response.status).not.toBe(200)
        expect(response.status).not.toBe(404)
        expect(response.body).not.toHaveProperty('error')
    
    })
})