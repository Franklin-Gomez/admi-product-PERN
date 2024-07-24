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

//=========================================================

describe('GET /api/products ' , () => { 
    it( 'get a JSON response with products ' , async () => { 
        const response  = await request(server).get('/api/products/')

        expect(response.body).toHaveProperty('data')
        expect(response.status).toBe(200)
        expect(response.headers['content-type']).toMatch(/json/)

        expect(response.status).not.toBe(404)

    })
})

describe('GET /api/products/:id' , () => { 
    it('should return a 404 response for a non-existent product' , async () => { 
        const productId = 2000
        const response = await request(server).get(`/api/products/${productId}`)

        // lo esperado
        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toBe("Producto No Encontrado")

        // lo no esperado
    })

    it('should return 404 response for a invalid id', async () => { 
        const productId = 'hola'
        const response = await request(server).get(`/api/products/${productId}`)

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toBe("ID no valido")
    })

    it('should return 200  when get a product', async () => { 
        const response = await request(server).get(`/api/products/1`)

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
    })
})