
const { response } = require('express')
const { uploadFileHelper } = require('../helpers')
const { User, Product} = require('../models');

const uploadFile = async(req, res = response) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.myFile) {
        res.status(400).json({msg:'No files were uploaded.'});
        return;
    }
    try {
        // const name = await uploadFileHelper(req.files,['txt','pdf'],'textos');
        const name = await uploadFileHelper(req.files,undefined,'imgs');
        res.json({ name })
    } catch (error) {
        res.status(400).json({msg:error})
    }
}

const updateImage = async(req, res = response) => {

    const { id, collection } = req.params;
    let model;
    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if (!model) {
                return res.status(400).json({msg: `No existe el usuario con id : ${id}`});
            }
            break;
        case 'products':
            console.log('entro a case products');
            model = await Product.findById(id);
            if (!model) {
                return res.status(400).json({msg: `No existe un producto con id : ${id}`});
            }
            break;
        default:
            return res.status(500).json({msg: 'Algo salio mal :C '});
    }
    console.log('el file es: ',req.files);
    model.img = await uploadFileHelper(req.files,undefined, collection);
    model.save();
    res.json({ model })
}

module.exports = { uploadFile, updateImage }