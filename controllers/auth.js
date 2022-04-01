const bcryptjs = require("bcryptjs");
const { response } = require("express");
const { jwtGenerate } = require("../helpers/generate-jwt");
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

    return res.status(200).json({
        msg:'todo ok',
        id_token
    })
}


module.exports = {
    login,
    googleSignIn
}