// config http
require('dotenv').config();
const express = require('express');
const app = express();

app.set('view engine', 'ejs');
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/chat', (req, res) => res.render('index'));

// config websocket
const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', (client) => {
    console.log('new user connected!');

    // subscribe topik 'chat message'
    client.on('chat message', msg => {
        io.emit('chat message', msg);
    });
});

const { PORT } = process.env;
server.listen(PORT, () => {
    console.log(`server running at http://localhost:${PORT}`);
});