import request from "supertest";
import server , { connectDB }from "../../server";
import db from "../../config/db";

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

//=========================================================

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

//=========================================================

describe('PUT /api/products/:id' , () => { 

    it(' should check a valid ID in the URL', async () => { 
        const response = await request(server).put('/api/products/not-valid-url').send({  
            id: 1,
            name: "Mouse - Testing",
            availability : true,
            price: 50
        })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toMatch("ID no valido")

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })



    it(' should display validation error messages when updating a product', async () => { 
        const response = await request(server).put('/api/products/1').send({})

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(5)
        expect(response.body.errors[0].msg).toMatch("El nombre de Producto no puede ir vacio")

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })

    it(' should validate that the price is greater than 0', async () => { 
        const response = await request(server).put('/api/products/1').send({  
          id: 1,
          name: "Mouse - Testing",
          availability : true,
          price: -50
        })

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors).toHaveLength(1)
        expect(response.body.errors[0].msg).toMatch("Precio n ovalido")

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })

    
    it(' should return a 404 for a non-existent product', async () => { 
        const response = await request(server).put('/api/products/400').send({  
          id: 1,
          name: "Mouse - Testing",
          availability : true,
          price: 350
        })

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body).toMatchObject({error : "Producto No Encontrado"})
        expect(response.body.error).toMatch("Producto No Encontrado")

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')
    })

    it(' should return a 404 for a non-existent product', async () => { 
        const response = await request(server).put('/api/products/1').send({  
          id: 1,
          name: "Mouse - Testing - actualizado",
          availability : true,
          price: 350
        })

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toHaveProperty('createdAt')

        expect(response.status).not.toBe(404)
        expect(response.body).not.toHaveProperty('error')
    })
})

//=========================================================

describe('PATCH /api/products/:id', () => {
    it('should return a 404 response for a non-existing product' ,  async () => { 
        const response = await request(server).patch('/api/products/10')

        expect(response.status).toBe(404)
        expect(response.body.error).toBe('Producto No Encontrado')

        expect(response.status).not.toBe(200)
        expect(response.body).not.toHaveProperty('data')

    })

    it('should update the pdoruc availability' , async () => { 
        const response = await request(server).patch('/api/products/1').send({
            "id": 1,
            "name": "Mouse - Testing",
            "price": 550
        })

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
    })
})

//=========================================================

describe('DELETE /api/products/:id',() => { 
    it('should check a valid ID' , async () => { 
        const response = await request(server).delete('/api/products/no-valid-id').send({})

        expect(response.status).toBe(400)
        expect(response.body).toHaveProperty('errors')
        expect(response.body.errors[0].msg).toMatch('ID no valido')
    })

    it('should return a 404 response for a non-existent product' , async () => { 
        const response = await request(server).delete('/api/products/200').send({})

        expect(response.status).toBe(404)
        expect(response.body).toHaveProperty('error')
        expect(response.body.error).toMatch('Producto No Encontrado')
    })

    it('should delete the product' , async () => { 
        const response = await request(server).delete('/api/products/1').send({})

        expect(response.status).toBe(200)
        expect(response.body).toHaveProperty('data')
        expect(response.body.data).toMatch('Producto Eliminado')
    })
})

//=========================================================

