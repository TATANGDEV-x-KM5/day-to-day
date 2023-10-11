require('dotenv').config();
const swaggerUi = require('swagger-ui-express');
const express = require('express');
const app = express();
const YAML = require('yaml');

const fs = require("fs");
const file = fs.readFileSync('./swagger.yaml', 'utf8');
const swaggerDocument = YAML.parse(file);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('listening on port', PORT));