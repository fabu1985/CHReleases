const multer = require('multer');
const { dirname } = require('node:path');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null,`${dirname(__dirname)}/public/uploads` )
    },
    filename: function(req, file, cb) {
        cb(null,`${Date.now()}-${file.originalname}` )
    }
});

/*
/// otra opciones para importar 
module.exports = {
    uploader
}*/

exports.uploader = multer ({
    storage
});