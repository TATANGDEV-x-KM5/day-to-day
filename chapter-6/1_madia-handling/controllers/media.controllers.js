const imagekit = require('../libs/imagekit');
const path = require('path');

module.exports = {
    singleUpload: (req, res) => {
        let folder = req.file.destination.split('public/')[1];
        const fileUrl = `${req.protocol}://${req.get('host')}/${folder}/${req.file.filename}`;

        return res.json({
            status: true,
            message: 'OK',
            error: null,
            data: { file_url: fileUrl }
        });
    },

    multiUpload: (req, res) => {
        let fileUrls = [];
        req.files.forEach(file => {
            let folder = file.destination.split('public/')[1];
            const fileUrl = `${req.protocol}://${req.get('host')}/${folder}/${file.filename}`;
            fileUrls.push(fileUrl);
        });

        return res.json({
            status: true,
            message: 'OK',
            error: null,
            data: { file_urls: fileUrls }
        });
    },


    imagekit: async (req, res, next) => {
        try {
            console.log('uploading...');
            let strFile = req.file.buffer.toString('base64');

            let { url } = await imagekit.upload({
                fileName: Date.now() + path.extname(req.file.originalname),
                file: strFile
            });

            return res.json({
                status: true,
                message: 'OK',
                error: null,
                data: { file_url: url }
            });
        } catch (err) {
            next(err);
        }
    }
};