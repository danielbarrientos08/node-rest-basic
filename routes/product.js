const { Router } = require('express');
const { check } = require('express-validator');
const { createProduct, updateProduct,listProducts, getProduct,deleteProduct } = require('../controllers/product');
const {  existsProduct } = require('../helpers/db-validators');


const {validateInputs, validateJWT,hasRole} = require('../middlewares');



const router = Router()

//listar categorias
router.get('/', listProducts)

//Obtener una categoria
router.get('/:id',[
    check('id','No es un id válido. ').isMongoId(),
    check('id').custom( existsProduct ),
    validateInputs
], getProduct)

//Crear una categoria
router.post('/',[
    validateJWT,
    check('name','El nombre es requerido').not().isEmpty(),
    validateInputs
], createProduct)

//Actualizar una categoria-persona con token
router.put('/:id',[
    check('id','No es un id válido. ').isMongoId(),
    validateJWT,
    check('id').custom( existsProduct ),
    check('name','El nombre es requerido').not().isEmpty(),
    validateInputs
], updateProduct)

//Eliminar una categoria-ADMIN
router.delete('/:id',[
    check('id','No es un id válido. ').isMongoId(),
    validateJWT,
    hasRole('ADMIN_ROLE'),
    check('id').custom( existsProduct ),
    validateInputs
], deleteProduct)

module.exports = router