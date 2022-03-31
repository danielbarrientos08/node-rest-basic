
const Role = require('../models/role')
const User = require('../models/user')

const existsRole = async (name = '')=>{
    const existsRole = await Role.findOne({name})
    if(! existsRole){
        throw  new Error(`El rol ${name} no existe.`)
    }
}

const uniqueEmail = async(email='') => {
    //Verificar si el correo existe
    const existsEmail = await User.findOne({email})
    if(existsEmail){
        throw  new Error(`El email ${email} ya está en uso.`)
    }
}


module.exports = {
    existsRole,
    uniqueEmail
}