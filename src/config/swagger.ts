import swaggerJSDoc from "swagger-jsdoc";

const options : swaggerJSDoc.Options = { 
    swaggerDefinition : { 
        openapi : '3.0.2', // los lineamientos que seguiremos 
        tags : [ // nombre de nuestra API y lo  la que vamos a documentar
            {
                name : 'Products',
                description : 'API operations related to products'
            }
        ],
        info : { 
            title : 'REST API Node.js / Express / TypeScript',
            version : '1.0.0',
            descripcion : 'API Docs for Products'
        }
    },
    apis : [ // doonde estan los endpoinst que queremos documentar
        './src/router.ts'
    ]
}

const swaggerSpec = swaggerJSDoc( options )
export default swaggerSpec