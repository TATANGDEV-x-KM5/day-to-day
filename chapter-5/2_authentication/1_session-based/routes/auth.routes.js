const router = require('express').Router();
const { register } = require('../controllers/auth.controllers');

router.get('/register', (req, res) => res.render('register'));
router.post('/register', register);

module.exports = router;