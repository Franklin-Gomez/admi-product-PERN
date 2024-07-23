import { Request , Response } from 'express'
import Product from '../models/Product.model'

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

export const createProducto = async  (req : Request , res : Response) => { 

    try {

        const product = await Product.create( req.body )
        res.json({ data : product })
        
    } catch (error) {

        console.log( error )

    } 
    
}