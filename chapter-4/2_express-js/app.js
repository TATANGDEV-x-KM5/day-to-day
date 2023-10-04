const express = require('express');
const app = express();
const port = 3000;
const mainRouter = require('./routes/index');
const morgan = require('morgan');

// application level middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});
app.use(express.json()); // built-in middleware
app.use(express.urlencoded()); // built-in middleware
app.use(morgan('dev')); // third party middleware

app.get('/', (req, res) => {
    console.log(data);
    res.send('Hello world!');
});

app.use(mainRouter);

// Error Handling Middleware -> 404 - Not found
app.use((req, res, next) => {
    res.status(404).json({
        status: false,
        message: 'endpoint not found!',
    });
});

// Error Handling Middleware -> 500 - Internal Server Error
app.use((err, req, res, next) => {
    res.status(500).json({
        status: false,
        message: err.message,
    });
});

app.listen(port, () => {
    console.log('app listening on port ' + port);
});