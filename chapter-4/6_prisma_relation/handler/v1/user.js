const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { getPagination } = require('../../helpers');

module.exports = {
    createUser: async (req, res, next) => {
        try {
            let { name, email } = req.body;

            let existUser = await prisma.user.findUnique({ where: { email } });
            if (existUser) {
                return res.status(400).json({
                    status: false,
                    message: 'Email is already used!',
                    data: null
                });
            }

            let newUser = await prisma.user.create({
                data: {
                    name: name,
                    email: email
                }
            });

            res.status(201).json({
                status: true,
                message: 'Created',
                data: newUser
            });
        } catch (err) {
            next(err);
        }
    },

    // get all users
    getAllUsers: async (req, res, next) => {
        try {
            let { limit = 10, page = 1 } = req.query;
            limit = Number(limit);
            page = Number(page);

            let users = await prisma.user.findMany({
                skip: (page - 1) * limit,
                take: limit,
            });
            const { _count } = await prisma.user.aggregate({
                _count: { id: true }
            });

            let pagination = getPagination(req, _count.id, page, limit);

            res.status(200).json({
                status: true,
                message: 'OK',
                data: { pagination, users }
            });
        } catch (err) {
            next(err);
        }
    },

    // get user detail
    getUserDetail: async (req, res, next) => {
        try {
            let { id } = req.params;
            let user = await prisma.user.findUnique({ where: { id: Number(id) } });

            if (!user) {
                return res.status(400).json({
                    status: false,
                    message: 'Bad Request',
                    data: 'no user found with id ' + id
                });
            }

            res.status(200).json({
                status: true,
                message: 'OK',
                data: user
            });
        } catch (err) {
            next(err);
        }
    },

    // update user
    updateUser: async (req, res, next) => {
        try {
            let { id } = req.params;
            let { name, email } = req.body;

            let user = await prisma.user.findUnique({ where: { id: Number(id) } });
            if (!user) {
                return res.status(400).json({
                    status: false,
                    message: 'Email doesn\'t exist!',
                    data: null
                });
            }

            let updateOperation = await prisma.user.update({
                where: { id: Number(id) },
                data: { name, email }
            });

            res.status(200).json({
                status: true,
                message: 'OK',
                data: updateOperation
            });
        } catch (err) {
            next(err);
        }
    },

    // delete user
    deleteUser: async (req, res, next) => {
        try {
            let { id } = req.params;

            let deleteOperation = await prisma.user.delete({
                where: { id: Number(id) }
            });

            res.status(200).json({
                status: true,
                message: 'OK',
                data: deleteOperation
            });
        } catch (err) {
            next(err);
        }
    }
};