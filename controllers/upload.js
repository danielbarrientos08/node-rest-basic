
const { response } = require('express')
const { uploadFileHelper } = require('../helpers')
const { User, Product} = require('../models');
const path = require('path')
const fs = require('fs')


const uploadFile = async(req, res = response) => {

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
            model = await Product.findById(id);
            if (!model) {
                return res.status(400).json({msg: `No existe un producto con id : ${id}`});
            }
            break;
        default:
            return res.status(500).json({msg: 'Algo salio mal :C '});
    }
    //subir archivos

    if (model.img) {
        const imgPath = path.join(__dirname, '../uploads', collection,model.img);
        if( fs.existsSync(imgPath)) {
            fs.unlinkSync(imgPath);
        }
    }
  
    model.img = await uploadFileHelper(req.files,undefined, collection);
    model.save();
    res.json({ model })
}

module.exports = { uploadFile, updateImage }