// config http
require('dotenv').config();
const express = require('express');
const app = express();
const fs = require('fs');

app.set('view engine', 'ejs');
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// app.get('/chat', (req, res) => res.render('index'));
app.get('/', (req, res) => res.render('home'));
app.get('/notification', (req, res) => {
    let { user_id } = req.query;
    let db = require('./db.json');
    let notifications = db.notifications;
    if (user_id) {
        notifications = notifications.filter(i => i.user_id == user_id);
    }

    res.render('notification', { notifications, user_id });
});

// config websocket
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.post('/notification', (req, res) => {
    console.log('run');
    let { user_id, title, body } = req.body;
    let db = require('./db.json');

    let newNotification = {
        id: db.notification_id++,
        user_id, title, body
    };
    db.notifications.push(newNotification);

    // save to database
    fs.writeFileSync('./db.json', JSON.stringify(db, null, 4));

    // kirimkan notifikasi baru
    io.emit(`user-${user_id}`, newNotification);

    res.json({
        status: true,
        data: newNotification
    });
});

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