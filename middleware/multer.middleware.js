const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + Path2D.extname(file.originalname));
    }
});

exports.upload = (field) => {
    return multer({ storage: storage }).single(field);
}