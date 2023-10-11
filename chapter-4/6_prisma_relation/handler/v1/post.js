const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

module.exports = {
    createPost: async (req, res, next) => {
        try {
            let { title, categories, authorId } = req.body;

            let newCategories = [];
            categories.forEach(c => {
                newCategories.push({
                    category: {
                        connectOrCreate: {
                            where: { id: c.id },
                            create: { name: c.name }
                        }
                    }
                });
            });

            let newPosts = await prisma.post.create({
                data: {
                    title,
                    author: {
                        connect: {
                            id: authorId
                        }
                    },
                    categories: {
                        create: newCategories
                    }
                },
            });

            res.status(200).json(newPosts);
        } catch (err) {
            next(err);
        }
    },

    getPosts: async (req, res, next) => {
        try {
            let { id } = req.params;
            let post = await prisma.post.findUnique({
                where: { id: Number(id) }
            });

            res.status(200).json(post);
        } catch (err) {
            next(err);
        }
    }
};