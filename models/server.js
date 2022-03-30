var express = require('express');
var cors = require('cors')
require('dotenv').config()


class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT 
        this.usersRoutesPath = '/api/users'

        //Middlewares
        this.middlewares()

        //Rutas
        this.routes()
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
    }

    listen () {
        this.app.listen(this.port, ()=>{
            console.log('SERVER ON PORT ',this.port)
        })
    }
}

module.exports = Server