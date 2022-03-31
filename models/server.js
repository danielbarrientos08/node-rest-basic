const express = require('express');
const cors = require('cors')
const {dbConnection} = require('../database/config')

require('dotenv').config()


class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT 
        this.usersRoutesPath = '/api/users'
        this.authRoutesPath = '/api/auth'


        //Conectar a base de datos
        this.connectDB()

        //Middlewares
        this.middlewares()

        //Rutas
        this.routes()
    }

    async connectDB() {
        await dbConnection()
    }

    middlewares() {

        //CORS  
        this.app.use(cors())
        //Parseo y lectura del Body
        this.app.use(express.json())
        //Directorio público
        this.app.use( express.static('public'))
    }

    routes() {
       this.app.use(this.usersRoutesPath,require('../routes/user'))
       this.app.use(this.authRoutesPath,require('../routes/auth'))
    }

    listen () {
        this.app.listen(this.port, ()=>{
            console.log('SERVER ON PORT ',this.port)
        })
    }
}

module.exports = Server