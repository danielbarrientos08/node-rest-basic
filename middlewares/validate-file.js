const validateFileUpload = ( req, res = response, next ) => {

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.myFile) {
      
        return  res.status(400).json({msg:'No files were uploaded - myFile'});
    }
    next()
}

module.exports = {
    validateFileUpload
}