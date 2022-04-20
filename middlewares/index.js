const validateInputs     = require('../middlewares/validate-inputs');
const validateJWT        = require('../middlewares/validate-jwt');
const validateRoles      = require('../middlewares/validate-roles');
const validateFileUpload = require('../middlewares/validate-file');


module.exports = {
    ...validateInputs,
    ...validateJWT,
    ...validateRoles,
    ...validateFileUpload,
}

