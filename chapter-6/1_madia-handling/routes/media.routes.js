const router = require('express').Router();
// const multer = require('multer');
// const upload = multer();
const { imageStorage } = require('../libs/multer');
const { imageUpload } = require('../controllers/media.controllers');

router.post('/storage/images', imageStorage.single('image'), imageUpload);

module.exports = router;