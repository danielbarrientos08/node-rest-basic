var express = require('express');

require('dotenv').config()


class Server {

    constructor() {
        this.app = express()
        this.port = process.env.PORT 

        //Middlewares
        this.middlewares()

        //Rutas
        this.routes()
    }

    middlewares() {
        //Directorio público
        this.app.use( express.static('public'))
    }

    routes() {
        this.app.get('/api', (req, res)=> {
            res.send('hello world');
          });
    }

    listen () {
        this.app.listen(this.port, ()=>{
            console.log('SERVER ON PORT ',this.port)
        })
    }
}

module.exports = Server