const express = require('express');
const router = express.Router();
const { } = require('../handler/v1/user');

router.get('/', (req, res) => {
    res.status(200).json({
        status: true,
        message: 'welcome to learn prisma api',
        data: null
    });
});

module.exports = router;