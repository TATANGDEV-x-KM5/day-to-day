const router = require('express').Router();
const { register, login, whoami, googleOauth2 } = require('../controllers/auth.controllers');
const { restrict } = require('../middlewares/auth.middlewares');
const passport = require('../libs/passport');

router.post('/register', register);
router.post('/login', login);
router.get('/whoami', restrict, whoami);

router.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
);
router.get('/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/api/v1/auth/google',
        session: false
    }),
    googleOauth2
);

module.exports = router;