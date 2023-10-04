require('dotenv').config();
const express = require('express');
const app = express();
const { PORT = 3000 } = process.env;

app.use(express.urlencoded());

app.listen(PORT, () => console.log('listening on port', PORT));