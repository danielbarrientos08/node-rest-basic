const bcryptjs = require("bcryptjs");
const { response } = require("express");
const { jwtGenerate } = require("../helpers/generate-jwt");
const { googleVerify } = require("../helpers/google-verify");
const User = require('../models/user')

const login = async(req,res = response) => {

    const { email, password } = req.body

    try {

        const user =  await User.findOne({email:email})

        if(user && bcryptjs.compareSync(password,user.password)){
            if(! user.status){
                return res.status(401).json({ msg:' usuario estado:false' })
            }
            //generar JWT
            const token = await jwtGenerate(user.id)   

            return res.status(200).json({user,token})    
        }
        
        return res.status(401).json({ msg: 'email o contraseña incorrecto.' })
  
    } catch (error) {
        
        console.log(error)
        return res.status(500).json({
            msg:'Algo salió mal'
        })
    }
}

const googleSignIn = async (req, res = response)=> {

    const { id_token } = req.body

    try {

        const { name,email,img} = await googleVerify( id_token )

        let user = await User.findOne({email: email})

        if(! user){

            const data = {
               name,
               email,
               img,
               password: ':P',
               google:true,
               role:'USER_ROLE'
            }

            user = new User(data)
            await user.save()
        }

        if( ! user.status){
            return response.status(401).json({
                msg:'El usuario se encuentra bloqueado - status:false'
            })
        }

        //generar JWT
        const token = await jwtGenerate(user.id)   


        res.status(200).json({
           user,
           token
        })

    } catch (error) {
        res.status(400).json({
            msg:'El token  de google no es válido'
        })
    }

}


module.exports = {
    login,
    googleSignIn
}