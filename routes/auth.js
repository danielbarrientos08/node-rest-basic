const { Router } = require('express');
const { check } = require('express-validator')
const { login, googleSignIn } = require('../controllers/auth')

const { validateInputs } = require('../middlewares/validate-inputs')

const router = Router()

router.post('/login',[
    check('email','El email no es válido').isEmail(),
    check('password','El password es requerido').not().isEmpty(),
    validateInputs
],login );

router.post('/google',[

    check('id_token','El ID TOKEN DE GOOGLE ES REQUERDO').not().isEmpty(),
    validateInputs
],googleSignIn );

module.exports = router