var express = require('express');
var router = express.Router();
const { create, getUserById } = require('../controllers/users.controllers');

router.post('/', create);
router.get('/:id', getUserById);

module.exports = router;
