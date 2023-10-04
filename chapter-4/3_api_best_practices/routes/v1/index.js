const express = require('express');
const router = express.Router();
const { create, index, show, update, destroy } = require('../../handlers/v1/posts');

router.get('/', (req, res) => {
    res.status(200).json({
        status: true,
        message: 'welcome to api v1'
    });
});

router.post('/posts', create);
router.get('/posts', index);
router.get('/posts/:postId', show);
router.put('/posts/:postId', update);
router.delete('/posts/:postId', destroy);

module.exports = router;