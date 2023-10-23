const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/images');
    },
    filename: function (req, file, cb) {
        const filename = Date.now() + path.extname(file.originalname);
        cb(null, filename);
    }
});

module.exports = {
    imageStorage: multer({
        storage: storage,
        fileFilter: (req, file, callback) => {
            const allowedMimeTypes = ['image/png', 'image/jpeg'];

            if (!allowedMimeTypes.includes(file.mimetype)) {
                const err = new Error(`Only ${allowedMimeTypes.join(', ')} allowed to upload!`);
                return callback(err, false);
            }
            callback(null, true);
        },
        onError: (err, next) => {
            next(err);
        }
    })
};