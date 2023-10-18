const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { PrismaClient } = require('@prisma/client');
const { authUser } = require('../controllers/auth.controllers');
const prisma = new PrismaClient();

passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
    let user = await prisma.user.findUnique({ where: { id } });
    done(null, user);
});
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, authUser));

module.exports = passport;