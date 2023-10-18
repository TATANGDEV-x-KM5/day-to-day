const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcrypt');

module.exports = {
    register: async (req, res, next) => {
        try {
            let { name, email, password, password_confirmation } = req.body;
            if (password != password_confirmation) {
                return res.render('register', { messages: 'password and password confirmation should be the same!' });
            }

            let userExist = await prisma.user.findUnique({ where: { email } });
            if (userExist) {
                return res.render('register');
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
    }
};