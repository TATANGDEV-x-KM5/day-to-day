require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const { PORT = 3000 } = process.env;

app.use(morgan('dev'));
app.use(express.json());

const authRouter = require('./routes/auth.routes');
app.use('/api/v1/auth', authRouter);

app.listen(PORT, () => console.log('Listening on port', PORT));