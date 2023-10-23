const router = require('express').Router();
const { imageStorage, videoStorage, documentStorage } = require('../libs/multer');
const { singleUpload, multiUpload } = require('../controllers/media.controllers');

router.post('/storage/images', imageStorage.single('image'), singleUpload);
router.post('/storage/videos', videoStorage.single('video'), singleUpload);
router.post('/storage/documents', documentStorage.single('document'), singleUpload);

router.post('/storage/multi/images', imageStorage.array('image'), multiUpload);


module.exports = router;