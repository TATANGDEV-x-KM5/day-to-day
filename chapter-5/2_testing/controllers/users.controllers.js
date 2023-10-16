const { createUser, getUserById } = require('../libs/users.libs');

module.exports = {
    create: async (req, res, next) => {
        try {
            let { name, email, password } = req.body;

            try {
                let user = await createUser(name, email, password);

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
    },

    getUserById: async (req, res, next) => {
        try {
            let { id } = req.params;
            try {
                let user = await getUserById(Number(id));

                return res.status(200).json({
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
            return res.status(400).json({
                status: false,
                message: err,
                data: null
            });
        }
    }
};