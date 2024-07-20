// archivo principal 
import server from "./server";

const port = process.env.PORT || 4000

server.listen(port, () => { 
    console.log( `desde el puerto ${port} `)
})