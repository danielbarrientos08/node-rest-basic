const mongoose = require('mongoose')
require('dotenv').config()



const dbConnection = async() => {

    try {
       await mongoose.connect(process.env.MONGODB_CNN,{
           useNewUrlParser: true,
           useUnifiedTopology:true
         
       })

       console.log('Base de datos online');
        
    } catch (error) {
        console.log('el error es: ',error)
        throw new Error('Error al conectar con la base de datos') 
    }

}

module.exports = {
    dbConnection
}