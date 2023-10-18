const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

module.exports = {
    register: async (req, res, next) => {
        try {
            let { name, email, password, password_confirmation } = req.body;
            if (password != password_confirmation) {
                req.flash('error', 'please ensure that the password and password confirmation match!');
                return res.redirect('/register');
            }

            let userExist = await prisma.user.findUnique({ where: { email } });
            if (userExist) {
                req.flash('error', 'user has already been used!');
                return res.redirect('/register');
            }

            let encryptedPassword = await bcrypt.hash(password, 10);
            await prisma.user.create({
                data: {
                    name,
                    email,
                    password: encryptedPassword
                }
            });

            res.redirect('/login');
        } catch (err) {
            next(err);
        }
    },

    authUser: async (email, password, done) => {
        try {
            let user = await prisma.user.findUnique({ where: { email } });
            if (!user) {
                return done(null, false, { message: 'invalid email or password!' });
            }

            let isPasswordCorrect = await bcrypt.compare(password, user.password);
            if (!isPasswordCorrect) {
                return done(null, false, { message: 'invalid email or password!' });
            }

            return done(null, user);
        } catch (err) {
            return done(null, false, { message: err.message });
        }
    }
};