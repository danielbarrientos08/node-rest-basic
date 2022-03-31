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

    //Verificar si el correo existe
    const existsEmail = await User.findOne({email})
    if(existsEmail){
        return res.status(422).json({
            error:'El email ya esta en uso.'
        })
    }
    //Encriptar password
    const salt = bcryptjs.genSaltSync(10)
    user.password = bcryptjs.hashSync(password,salt)

    await user.save()

    res.status(201).json({
        user
    });
};


const userPut = (req, res = response)=> {

    const {id,q} = req.params

    res.status(200).json({
        msg: 'put API - Controller',
        id,
        q
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