
const { response } = require('express')
const { uploadFileHelper } = require('../helpers')

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

module.exports = { uploadFile }