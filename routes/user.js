const { Router } = require('express');
const {check} = require('express-validator')
const {  userGet, userPost, userDelete, userPatch, userPut, userUpdate } = require('../controllers/users');
const {validateInputs} = require('../middlewares/validate-inputs')

const router = Router()

router.get('/', userGet);

router.put('/:id', userPut);

router.post('/',[
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('password','El password debe ser mas de 6 caracteres').isLength({min: 6}),
    check('role','No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('email','email no válido').isEmail(),
    validateInputs
], userPost);

router.post('/', userUpdate);

router.patch('/', userPatch);

router.delete('/', userDelete);


module.exports = router