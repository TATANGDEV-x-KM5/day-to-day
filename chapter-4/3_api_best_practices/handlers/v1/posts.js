const pool = require('../../externals/postgres');
const getPagination = require('../../helpers/pagination');

async function create(req, res, next) {
    try {
        const { title, body } = req.body;
        let result = await pool.query("INSERT INTO posts (title, body) values ($1, $2) RETURNING *;", [title, body]);
        res.status(201).json({
            status: true,
            message: 'Created!',
            data: result.rows[0]
        });
    } catch (err) {
        next(err);
    }
}

async function index(req, res, next) {
    try {
        let { limit = 10, page = 1 } = req.query;

        let result = await pool.query('SELECT * FROM posts ORDER BY id LIMIT $1 OFFSET $2', [limit, (page - 1) * limit]);
        let count = await pool.query(`SELECT count(*) FROM posts`);
        let pagination = getPagination(req, parseInt(count.rows[0].count), parseInt(page), parseInt(limit));

        res.status(200).json({
            status: true,
            message: 'OK!',
            data: { pagination, posts: result.rows }
        });
    } catch (err) {
        next(err);
    }
}

async function show(req, res, next) {
    try {
        const { postId } = req.params;
        let result = await pool.query("SELECT * FROM posts WHERE id = $1;", [postId]);
        if (!result.rows.length) {
            return res.status(400).json({
                status: false,
                message: `post with id ${postId} is doesn't exist!`,
                data: null
            });
        }

        res.status(200).json({
            status: true,
            message: 'OK!',
            data: result.rows[0]
        });
    } catch (err) {
        next(err);
    }
}

async function update(req, res, next) {
    try {
        const { postId } = req.params;
        const { title, body } = req.body;
        let result = await pool.query("UPDATE posts SET title = $1, body = $2 WHERE id = $3;", [title, body, postId]);
        if (!result.rowCount) {
            return res.status(400).json({
                status: false,
                message: `post with id ${postId} is doesn't exist!`,
                data: null
            });
        }

        res.status(200).json({
            status: true,
            message: 'OK!',
            data: null
        });
    } catch (err) {
        next(err);
    }
}

async function destroy(req, res, next) {
    try {
        const { postId } = req.params;
        let result = await pool.query("DELETE FROM posts WHERE id = $1;", [postId]);
        if (!result.rowCount) {
            return res.status(400).json({
                status: false,
                message: `post with id ${postId} is doesn't exist!`,
                data: null
            });
        }

        res.status(200).json({
            status: true,
            message: 'OK!',
            data: null
        });
    } catch (err) {
        next(err);
    }
}

module.exports = { create, index, show, update, destroy };