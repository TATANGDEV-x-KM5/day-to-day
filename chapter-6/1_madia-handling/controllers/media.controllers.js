module.exports = {
    imageUpload: (req, res) => {
        const imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`;

        return res.json({
            status: true,
            message: 'OK',
            error: null,
            data: { image_url: imageUrl }
        });
    }
};