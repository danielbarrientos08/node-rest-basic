const { response } = require('express')

const userGet = (req, res = response)=> {
    res.status(200).json({
        msg: 'get API - Controller'
    });
};
const userPost = (req, res = response)=> {
    res.status(200).json({
        msg: 'post API - Controller'
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