const { response,request } = require('express');
const { json } = require('express/lib/response');

const bcryptjs = require('bcryptjs')

const User = require('../models/user')

const userGet = (req, res = response)=> {

    const {q,page} =req.query
    res.status(200).json({
        msg: 'get API - Controller',
        q,
        page
    });
};

const userPost = async(req, res = response)=> {

   

    const {name,email,password,role} = req.body

    const user = new User({name,email,password,role})


    //Encriptar password
    const salt = bcryptjs.genSaltSync(10)
    user.password = bcryptjs.hashSync(password,salt)

    await user.save()

    res.status(201).json({
        user
    });
};


const userPut = async (req, res = response)=> {

    const { id } = req.params
    const {_id, password, google,email, ...resto} = req.body

    if( password){
        //Encriptar password
        const salt = bcryptjs.genSaltSync(10)
        resto.password = bcryptjs.hashSync(password,salt)
    }
    
    const user = await User.findByIdAndUpdate(id,resto)
    
    res.status(200).json({
        msg: 'datos actualizados',
        user
      
    });
};
const userPatch = (req, res = response)=> {
    res.status(200).json({
        msg: 'patch API - Controller'
    });
};
const userDelete = (req, res = response)=> {
    res.status(200).json({
        msg: 'delete API - Controller'
    });
};
const userUpdate = (req, res = response)=> {
    res.status(200).json({
        msg: 'update API - Controller'
    });
};


module.exports = {
    userGet,
    userDelete,
    userPatch,
    userPut,
    userUpdate,
    userPost
}