
const Role = require('../models/role')

const existRole = async (name = '')=>{
    const existsRole = await Role.findOne({name})
    if(! existsRole){
        throw  new Error(`El rol ${name} no existe.`)
    }
}


module.exports = {
    existRole
}
