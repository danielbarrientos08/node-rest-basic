const { Router } = require('express');
const { check } = require('express-validator')
const {  userGet, userPost, userDelete, userPatch, userPut, userUpdate } = require('../controllers/users');
const { existsRole,uniqueEmail,existsUser } = require('../helpers/db-validators');

// const { validateInputs } = require('../middlewares/validate-inputs');
// const { validateJWT } = require('../middlewares/validate-jwt');
// const { isAdminRole, hasRole } = require('../middlewares/validate-roles');

const {validateInputs, validateJWT, isAdminRole,hasRole} = require('../middlewares')


const router = Router()

router.get('/', userGet);

router.put('/:id',[
    check('id','No es un id válido. ').isMongoId(),
    check('id').custom( existsUser ),
    check('role').custom( existsRole ),
    validateInputs
] ,userPut);

router.post('/',[
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('password','El password debe ser mas de 6 caracteres').isLength({min: 6}),
    // check('role','No es un rol válido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('role').custom( existsRole ),
    check('email').custom( uniqueEmail ),
    check('email','email no válido').isEmail(),
    validateInputs
], userPost);



router.patch('/', userPatch);

router.delete('/:id',[
    validateJWT,
    // isAdminRole,
    hasRole('ADMIN_ROLE','USER_ROLE'),
    check('id','No es un id válido. ').isMongoId(),
    check('id').custom( existsUser ),
    validateInputs
], userDelete);


module.exports = router