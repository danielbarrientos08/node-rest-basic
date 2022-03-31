const { Schema, model } = require('mongoose')

const UserSchema = Schema({
    name:{
        type: String,
        required: [true,'El nombre es obligatorio'],
        unique: false
    },
    email:{
        type: String,
        required: [true,'El correo es obligatorio'],
        unique: true
    },
    password:{
        type: String,
        required: [true,'El contraseña es obligatoria'],
        
    },
    img:{
        type: String,
    },
    role:{
        type: String,
        required: [true,'Rol requerido'],
        enum: ['ADMIN_ROLE','USER_ROLE']
    },
    status:{
        type: Boolean,
        default: true,
    },
    google:{
        type: Boolean,
        default: false,
    },
})


module.exports = model('User',UserSchema)