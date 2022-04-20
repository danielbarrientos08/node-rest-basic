const { Router } = require('express');
const { check } = require('express-validator')

const { validateInputs } = require('../middlewares/validate-inputs');
const { uploadFile,updateImage } = require('../controllers/upload');
const { validCollections} = require('../helpers/db-validators');

const router = Router()

router.post('/', uploadFile) 
router.put('/:collection/:id',[
    check('id','El id debe ser de Mongo').isMongoId(),
    check('collection').custom(c => validCollections(c,['users','products'])),
    validateInputs
], updateImage) 


module.exports = router