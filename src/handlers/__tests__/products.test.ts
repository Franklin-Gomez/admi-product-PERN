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