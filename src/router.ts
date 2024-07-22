import { Router } from 'express'
import { createProducto } from './handlers/produc'

const router = Router()

// Routing
router.get('/hola' , (req , res) => { 

    res.json( 'desde get' )

})

router.post('/' , createProducto )

export default router