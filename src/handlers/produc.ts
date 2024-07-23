import { Request , Response } from 'express'
import Product from '../models/Product.model'
import { param } from 'express-validator'

export const getProducts = async ( req : Request , res : Response ) => { 

    try {
        
        const products = await Product.findAll({
            order: [ 
                ['price' , 'DESC'] 
            ],
            limit: 2,
            attributes: { exclude : [ 'createdAt' , 'updatedAt' , 'availability']}
        })

        res.json({ data : products })

    } catch (error) {
        console.log( error )
    }

    res.json( 'desde get' )
}

export const getProductById = async ( req : Request , res : Response ) => { 

    try {

        const { id } = req.params
        const products = await Product.findByPk( id )

        if(!products) { // error
            return res.status(404).json({
                error : 'Producto No Encontrado'
            })
        }

        res.json({ data : products })

    } catch (error) {
        console.log( error )
    }

    res.json( 'desde get One' )
}

export const createProducto = async  (req : Request , res : Response) => { 

    try {

        const product = await Product.create( req.body )
        res.json({ data : product })
        
    } catch (error) {

        console.log( error )

    } 
    
}

export const updateProduct = async ( req : Request , res : Response) => { 
    
    // Comprobar registro
    const { id } = req.params
    const products = await Product.findByPk( id )

    if(!products) { // error
        return res.status(404).json({
            error : 'Producto No Encontrado'
        })
    }

    res.json({ data : products })

    // Actualizar registro
    await products.update(req.body) // actualizamos la instacia que capturamos
    await products.save() // insertamos la instancia ala base de datos

}

export const updateAvailability = async ( req : Request , res : Response) => { 
    
    // Comprobar registro
    const { id } = req.params
    const products = await Product.findByPk( id )

    if(!products) { // error
        return res.status(404).json({
            error : 'Producto No Encontrado'
        })
    }

    // Actualizar registro
    products.availability = !products.dataValues.availability // cambio de forma automatica al valor contrario que tenga en la db
    await products.save() // insertamos la instancia ala base de datos
    res.json({data : products})


}