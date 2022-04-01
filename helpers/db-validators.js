
const { Category,Role, User } = require('../models')


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

const existsUser = async (id = '')=>{
    const existsUser = await User.findById(id)
    if(! existsUser){
        throw  new Error(`El usuario con id ${id} no existe.`)
    }
}

const existsCategory = async (id = '')=>{
    const existCategory = await Category.findById(id)
    if(! existCategory || existCategory.status == false){
        
        throw  new Error(`La categoría con id ${id} no existe o esta bloqueada.`)
    }
}

const unique =   (input=null,model=null,ignoreId=null)=> {

    return async (req, res = response, next)=>{

        if(input!=null && model!= null ){
            throw  new Error(`los parámetros input y model son requeridos`)
        }

        const existsValue = await model.findOne(input)
        console.log('El valor es: ',existsValue)

        // if( ! roles.includes(req.user.role)){
        //     return res.status(401).json({
        //         msg:`El servicio require uno de estos roles:  ${roles}`
        //     })
        // }

        next()
    }
}

module.exports = {
    existsRole,
    uniqueEmail,
    existsUser,
    unique,
    existsCategory

}
