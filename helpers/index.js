const dbValidators = require('./db-validators');
const jwtGenerate  = require('./generate-jwt');
const googleVerify = require('./google-verify');
const uploadFile   = require('./upload-file');

module.exports = {
    ...dbValidators,
    ...jwtGenerate,
    ...googleVerify,
    ...uploadFile
}