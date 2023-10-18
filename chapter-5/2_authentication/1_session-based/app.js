require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');
const session = require('express-session');
const flash = require('express-flash');
const { PORT = 3000, SESSION_SECRET_KEY } = process.env;

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');
app.use(session({
    secret: SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: true
}));

const passport = require('./libs/passport.js')
app.use(passport.initialize())
app.use(passport.session())
app.use(flash());

const authRouter = require('./routes/auth.routes');
app.use(authRouter);

app.listen(PORT, () => console.log('Listening on port', PORT));