import { Router } from 'express'
import { createProducto, getProducts, getProductById } from './handlers/produc'
import { body, param } from 'express-validator'
import { handleInputErrors } from './middleware'

const router = Router()

// Routing
router.get('/' , getProducts )

router.get('/:id' , 
    
    param('id').isInt().withMessage('ID no valido'),
    handleInputErrors,    

getProductById )

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

export default router