import { Request , Response } from 'express'
import Product from '../models/Product.model'
import { check , validationResult } from 'express-validator'

export const createProducto = async  (req : Request , res : Response) => { 

    // Validation
    await check('name')
        .notEmpty().withMessage('El nombre de Producto no puede ir vacio').run(req)

    await check('price')
        .isNumeric().withMessage('valor no valido')
        .notEmpty().withMessage('El precio de Producto no puede ir vacio')
        .custom( value => value > 0).withMessage('Precio n ovalido')
        .run(req)


    let errors = validationResult(req) 

    if( !errors.isEmpty()) {
        return  res.status(400).json({errors : errors.array()})
    }


    const product = await Product.create( req.body )
    res.json({ data : product })
    
}