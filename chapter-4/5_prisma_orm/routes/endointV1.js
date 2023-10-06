const express = require('express');
const router = express.Router();
const { createUser, getAllUsers, getUserDetail, updateUser, deleteUser } = require('../handler/v1/user');

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

module.exports = router;