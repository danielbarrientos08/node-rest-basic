const jwt = require('jsonwebtoken')

const jwtGenerate = (uid='') => {

    return new Promise( (resolve,reject) => {
        const payload = {uid}

        jwt.sign(payload,process.env.JWT_SECRET_KEY, {
            expiresIn: '4h'
        },(err,token)=> {
            if(err){
                console.log(err)
                reject('No se pudo generar el JWT')
            }
            resolve(token)
        })

    })
}

module.exports = { jwtGenerate }