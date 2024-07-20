import { Router } from 'express'

const router = Router()

// Routing
router.get('/hola' , (req , res) => { 

    res.json( 'desde get' )

})

router.post('/' , (req , res) => { 

    res.json( 'desde post' )
    
})

export default router