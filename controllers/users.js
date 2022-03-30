const { response } = require('express');
const { json } = require('express/lib/response');

const userGet = (req, res = response)=> {
    res.status(200).json({
        msg: 'get API - Controller'
    });
};
const userPost = (req, res = response)=> {

    const {nombre,edad} = req.body

    res.status(200).json({
        msg: 'post API - Controller',
        response: {
            nombre,
            edad
        }
    });
};
const userPut = (req, res = response)=> {
    res.status(200).json({
        msg: 'put API - Controller'
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