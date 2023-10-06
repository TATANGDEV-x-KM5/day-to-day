const express = require('express');
const router = express.Router();
const { createUser, getAllUsers, getUserDetail, updateUser, deleteUser } = require('../handler/v1/user');
const { createPost, getPosts } = require('../handler/v1/post');

router.get('/', (req, res) => {
    res.status(200).json({
        status: true,
        message: 'welcome to learn prisma api',
        data: null
    });
});

router.post('/users', createUser);
router.get('/users', getAllUsers);
router.get('/users/:id', getUserDetail);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

router.post('/posts', createPost);
router.get('/posts/:id', getPosts);

module.exports = router;