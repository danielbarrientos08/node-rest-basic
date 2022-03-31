const { Schema, model } = require('mongoose')

const RoleSchema = Schema({
    name:{
        type: String,
        required: [true,'El nombre es obligatorio'],
        unique: true
    },
})


module.exports = model('Role',RoleSchema)