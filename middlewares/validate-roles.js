const { response } = require("express")


const isAdminRole = (req, res = response, next) => {
   
    if(! req.user){
        return res.status(500).json({
            msg: 'Se quiere validar el role sin verificar el token'
        })
    }

    const { role, name} = req.user

    if( role !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${ name} no es administrador `
        })
    }

    next()

}

const hasRole = (...roles)=> {

    return (req, res = response, next)=>{

        if(! req.user){
            return res.status(500).json({
                msg: 'Se quiere validar el role sin verificar el token'
            })
        }

        if( ! roles.includes(req.user.role)){
            return res.status(401).json({
                msg:`El servicio require uno de estos roles:  ${roles}`
            })
        }

        next()
    }
}

module.exports = {
    isAdminRole,
    hasRole
}