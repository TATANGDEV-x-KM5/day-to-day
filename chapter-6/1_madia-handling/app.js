require('dotenv').config();
const express = require('express');
const app = express();

app.use('/images', express.static('public/images'));
app.use('/videos', express.static('public/videos'));
app.use('/documents', express.static('public/documents'));

const mediaRouter = require('./routes/media.routes.js');
app.use('/api/v1', mediaRouter);

const { PORT = 3000 } = process.env;
app.listen(PORT, () => console.log('listening on port', PORT));