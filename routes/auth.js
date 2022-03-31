const { Router } = require('express');
const { check } = require('express-validator')
const { login } = require('../controllers/auth')

const { validateInputs } = require('../middlewares/validate-inputs')

const router = Router()

router.post('/login',[
    check('email','El email no es válido').isEmail(),
    check('password','El password es requerido').not().isEmpty(),
    validateInputs
],login );

module.exports = router