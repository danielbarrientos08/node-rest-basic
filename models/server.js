var express = require('express');
var cors = require('cors')
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

        this.app.use(cors())
        //Directorio público
        this.app.use( express.static('public'))
    }

    routes() {
        this.app.get('/api', (req, res)=> {
            res.status(200).json({
                msg: 'get API'
            });
        });
        this.app.put('/api', (req, res)=> {
            res.status(200).json({
                msg: 'put API'
            });
        });
        this.app.post('/api', (req, res)=> {
            res.status(200).json({
                msg: 'post API'
            });
        });
        this.app.patch('/api', (req, res)=> {
            res.status(200).json({
                msg: 'patch API'
            });
        });
        this.app.delete('/api', (req, res)=> {
            res.status(200).json({
                msg: 'delete API'
            });
        });
    }

    listen () {
        this.app.listen(this.port, ()=>{
            console.log('SERVER ON PORT ',this.port)
        })
    }
}

module.exports = Server