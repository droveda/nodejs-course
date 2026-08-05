require('dotenv').config();

const { webcrypto } = require('crypto');
global.crypto = webcrypto;

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const csrf = require('csurf');
const flash = require('connect-flash');

const User = require('./models/user');

const uri = process.env.MONGODB_URI;

const app = express();
const store = new MongoDBStore({
    uri: uri,
    collection: 'sessions'
});

const csrfProtection = csrf();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); //this works when debbug mode is active


const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

const errorController = require('./controllers/error');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
}));

app.use(csrfProtection);

app.use(flash());

app.use((req, res, next) => {
    if (!req.session.user) {
        return next();
    }
    User.findById(req.session.user._id)
        .then((user) => {
            req.user = user;
            next();
        })
        .catch(err => {
            console.log(err);
        });
});

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.session.isLoggedIn;
    res.locals.csrfToken = req.csrfToken();
    next();
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404Page);


mongoose.connect(uri)
    .then(result => {
        console.log('CONNECTED!');
        app.listen(3000);
    })
    .catch(err => console.log(err));