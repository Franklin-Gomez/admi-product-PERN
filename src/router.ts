import { Router } from 'express'
import { createProducto, getProducts, getProductById, updateProduct , updateAvailability, deleteProduct } from './handlers/produc'
import { body, param } from 'express-validator'
import { handleInputErrors } from './middleware'

const router = Router()

/** 
* @swagger
* components:
*       schemas:
*           Product:
*               type: object
*               properties:
*                       id : 
*                           type: integer
*                           description: The Product ID
*                           example: 1
*                       name : 
*                           type: string
*                           description: The Product name
*                           example: Monitor Curvo
*                       price : 
*                           type: integer
*                           description: The Product Price
*                           example: 400
*                       availability : 
*                           type: boolean
*                           description: The Product availability
*                           example: true
*/

/**
* @swagger
* /api/products:
*      get:
*           summary: Get a list of products
*           tags:
*               - Products
*           description: Return a list of products
*           responses:
*               200:
*                   description: Successful response
*                   content:
*                       application/json:
*                           schema:
*                               type: array
*                               items:
*                                   $ref: '#/components/schemas/Product'
* 
*  
*/

// Routing
router.get('/' , getProducts )

/**
* @swagger
* /api/products/{id}:
*      get:
*          summary: Get a Product by ID
*          tags:
*             - Products
*          description: Return a product based on ID
*          parameters:
*             - in: path 
*               name: id
*               descripcion: The ID of the product to retrieve 
*               required: true
*               schema:
*                 type: integer
*          responses:
*               200:
*                   description: Successful response
*                   content:
*                       application/json:
*                           schema:
*                              $ref: '#/components/schemas/Product'
*               404:
*                   description : Not found
*               400:
*                   description : Bad Request - Invalid ID
*  
*/

router.get('/:id' , 

    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,    

getProductById )

/**
* @swagger
* /api/products:
*      post:
*          summary: Create Product
*          tags:
*             - Products
*          description: Returns a new record in the database
*          requestBody:
*               required: true
*               content:
*                   application/json:
*                       schema:
*                           type: object
*                           properties:
*                               name:
*                                   type: string              
*                                   example: "Monitor Curvo 49 pulgadas"
*                               price:
*                                  type : number
*                                  example: 2000
*          responses:
*               201:
*                   description: Product created successfully
*                   content:
*                       application/json:
*                           schema:
*                               type: array
*                               items:
*                                   $ref: '#/components/schemas/Product'
*               400:
*                   description : Bad Request - Invalid  input data
*/

router.post( '/' ,
    
    // Validation
    body('name')
        .notEmpty().withMessage('El nombre de Producto no puede ir vacio'),

    body('price')
        .isNumeric().withMessage('valor no valido')
        .notEmpty().withMessage('El precio de Producto no puede ir vacio')
        .custom( value => value > 0).withMessage('Precio n ovalido'),

    handleInputErrors,

createProducto )

/**
* @swagger
* /api/products/{id}:
*      put:
*          summary: updates a product with user input
*          tags:
*             - Products
*          description: Returns a new record in the database
*          parameters:
*             - in: path 
*               name: id
*               descripcion: The ID of the product to retrieve 
*               required: true
*               schema:
*                 type: integer
*          requestBody:
*               required: true
*               content:
*                   application/json:
*                       schema:
*                           type: object
*                           properties:
*                               name:
*                                   type: string              
*                                   example: "Monitor Curvo 49 pulgadas"
*                               price:
*                                  type : number
*                                  example: 2000
*                               availability:
*                                   type: boolean
*                                   example: true
*          responses:
*               200:
*                   description: Product update successfully
*                   content:
*                       application/json:
*                           schema:
*                              $ref: '#/components/schemas/Product'
*               400:
*                   description : Bad Request - Invalid ID or input data
*               404:
*                   description : Product Not Found
*/

router.put('/:id' , 
    param('id').isInt().withMessage('ID no valido'),

    // Validation
    body('name')
        .notEmpty().withMessage('El nombre de Producto no puede ir vacio'),

    body('price')
        .isNumeric().withMessage('valor no valido')
        .notEmpty().withMessage('El precio de Producto no puede ir vacio')
        .custom( value => value > 0).withMessage('Precio n ovalido'),

    body('availability')
        .isBoolean().withMessage('No es un booleano'),
    
    handleInputErrors,       
    
updateProduct )

router.patch('/:id' , 
        
    param('id').isInt().withMessage('ID no valido'),

    handleInputErrors,
    
updateAvailability )

router.delete('/:id' , 
    
    param('id').isInt().withMessage('ID no valido'),

    handleInputErrors,

deleteProduct )


export default router