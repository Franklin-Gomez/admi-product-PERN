import { Table , Column , Model , DataType , Default } from 'sequelize-typescript'

//Decoradores
@Table({
    tableName : 'products' // nombre de la tabla
})

class Product extends Model { 
    @Column({ type : DataType.STRING(100)}) // agregandole type
    declare name : string

    @Column({ type : DataType.FLOAT}) // FLOAT o INTEGER
    declare price : number 

    @Default(true) // en caso tal  no  se lo pasa por el body
    @Column({type : DataType.BOOLEAN})
    declare availability: boolean
}

export default Product