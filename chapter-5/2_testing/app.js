var express = require('express');
var logger = require('morgan');

var usersRouter = require('./routes/users.routes');

var app = express();

app.use(logger('dev'));
app.use(express.json());

app.use('/api/v1/users', usersRouter);

module.exports = app;
