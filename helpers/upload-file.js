const {v4: uuidv4 } = require('uuid')
const path = require('path')

const uploadFileHelper = (files, validExtensions = ['png','jpg','jpeg','gif'],subPath = '') => {

    return new Promise((resolve, reject) => {
        const { myFile } = files;
        const partName = myFile.name.split('.');
        const extension = partName[partName.length -1];

        if (!validExtensions.includes(extension)) {
            return reject(`La extensión ${ extension } no está permitida en:  ${validExtensions}`)
        }

        const newName = uuidv4() + '.' + extension;
        const uploadPath = path.join( __dirname, '../uploads/',subPath ,newName);
        myFile.mv(uploadPath, (err) => {
            if(err) {
                reject(err)
            }
            resolve(newName)
        })
    })
}

module.exports = {
    uploadFileHelper
}