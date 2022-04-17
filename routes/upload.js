const { Router } = require('express');
const { check } = require('express-validator')

const { validateInputs } = require('../middlewares/validate-inputs')
const { uploadFile } = require('../controllers/upload')

const router = Router()

router.post('/', uploadFile) 


module.exports = router