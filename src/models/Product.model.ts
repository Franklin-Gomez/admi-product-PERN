import { Table , Column , Model , DataType } from 'sequelize-typescript'

//Decoradores
@Table({
    tableName : 'products' // nombre de la tabla
})

class Product extends Model { 
    @Column({ type : DataType.STRING(100)}) // agregandole type
    name : string

    @Column({ type : DataType.FLOAT(6,2)}) // FLOAT o INTEGER
    price : number 

    @Column({type : DataType.BOOLEAN})
    availability : boolean
}

export default Product