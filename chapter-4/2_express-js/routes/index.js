const express = require('express');
const router = express.Router();

// router level middleware
router.use((req, res, next) => {
    console.log('Time :', Date.now());
    next();
});

router.get('/products', (req, res) => {
    res.json([
        { id: 1, name: 'apple' },
        { id: 2, name: 'samsung' },
        { id: 3, name: 'huawei' }
    ]);
});

router.get('/users', (req, res) => {
    res.json([
        { id: 1, name: 'sabrina' },
        { id: 2, name: 'naura' },
        { id: 3, name: 'nayla' }
    ]);
});

router.get('/orders', (req, res) => {
    res.json([
        { id: 1, product_id: 3, user_id: 1 },
        { id: 2, product_id: 2, user_id: 2 },
        { id: 3, product_id: 1, user_id: 3 }
    ]);
});

router.post('/orders', (req, res) => {
    res.json(req.body);
});

module.exports = router;