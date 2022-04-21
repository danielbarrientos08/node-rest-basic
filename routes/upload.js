const { Router } = require('express');
const { check } = require('express-validator')

const { validateInputs, validateFileUpload } = require('../middlewares');
const { uploadFile, showImage, updateImageCloudinary } = require('../controllers/upload');
const { validCollections} = require('../helpers/db-validators');

const router = Router()

router.post('/',validateFileUpload, uploadFile) 
router.put('/:collection/:id',[
    validateFileUpload,
    check('id','El id debe ser de Mongo').isMongoId(),
    check('collection').custom(c => validCollections(c,['users','products'])),
    validateInputs
], updateImageCloudinary) 

router.get('/:collection/:id',[
    check('id','El id debe ser de Mongo').isMongoId(),
    check('collection').custom(c => validCollections(c,['users','products'])),
    validateInputs
],showImage)

module.exports = router