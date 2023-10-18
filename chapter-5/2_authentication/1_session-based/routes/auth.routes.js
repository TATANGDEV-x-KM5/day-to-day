const router = require('express').Router();
const { register } = require('../controllers/auth.controllers');
const passport = require('../libs/passport');
const { restrict } = require('../middlewares/auth.middlewares');

router.get('/dashboard', restrict, (req, res) => res.render('dashboard', { user: req.user }));

router.get('/register', (req, res) => res.render('register'));
router.post('/register', register);

router.get('/login', (req, res) => res.render('login'));
router.post('/login', passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login'
}));

module.exports = router;