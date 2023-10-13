const { createUser } = require('../libs/users.libs');

module.exports = {
    create: async (req, res, next) => {
        try {
            let { email, password } = req.body;

            try {
                let user = await createUser(email, password);

                return res.status(201).json({
                    status: false,
                    message: 'OK',
                    data: user
                });
            } catch (err) {
                return res.status(400).json({
                    status: false,
                    message: err,
                    data: null
                });
            }
        } catch (err) {
            next(err);
        }
    }
};