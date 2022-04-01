const { Router } = require('express');
const { check } = require('express-validator');
const { createCategory, updateCategory,listCategories, getCategory,deleteCategory } = require('../controllers/category');
const { unique, existsCategory } = require('../helpers/db-validators');


const {validateInputs, validateJWT,hasRole} = require('../middlewares');



const router = Router()

//listar categorias
router.get('/', listCategories)

//Obtener una categoria
router.get('/:id',[
    check('id','No es un id válido. ').isMongoId(),
    check('id').custom( existsCategory ),
    validateInputs
], getCategory)

//Crear una categoria
router.post('/',[
    validateJWT,
    check('name','El nombre es requerido').not().isEmpty(),
    validateInputs
], createCategory)

//Actualizar una categoria-persona con token
router.put('/:id',[
    check('id','No es un id válido. ').isMongoId(),
    validateJWT,
    check('id').custom( existsCategory ),
    hasRole('ADMIN_ROLE'),
    check('name','El nombre es requerido').not().isEmpty(),
    validateInputs
], updateCategory)

//Eliminar una categoria-ADMIN
router.delete('/:id',[
    check('id','No es un id válido. ').isMongoId(),
    validateJWT,
    check('id').custom( existsCategory ),
    validateInputs
], deleteCategory)

module.exports = router