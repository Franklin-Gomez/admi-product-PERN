import { Router } from 'express'
import { createProducto } from './handlers/produc'
import { body } from 'express-validator'

const router = Router()

// Routing
router.get('/hola' , (req , res) => { 

    res.json( 'desde get' )

})

router.post('/' ,
    
    // Validation
    body('name')
    .notEmpty().withMessage('El nombre de Producto no puede ir vacio'),

    body('price')
        .isNumeric().withMessage('valor no valido')
        .notEmpty().withMessage('El precio de Producto no puede ir vacio')
        .custom( value => value > 0).withMessage('Precio n ovalido'),

    createProducto )

export default router