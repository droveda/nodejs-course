require('dotenv').config();

const { webcrypto } = require('crypto');
global.crypto = webcrypto;

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const User = require('./models/user');

const uri = process.env.MONGODB_URI;

const app = express();
const store = new MongoDBStore({
    uri: uri,
    collection: 'sessions'
});

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

app.use((req, res, next) => {
    User.findById('6a66a8d8fde0194240980dd2')
        .then(user => {
            //console.log(user);
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404Page);


mongoose.connect(uri)
    .then(result => {
        console.log('CONNECTED!');

        User.findOne()
            .then(user => {
                if (!user) {
                    const user = new User({
                        name: 'Max',
                        email: 'max@email.com',
                        cart: {
                            items: []
                        }
                    });
                    user.save();
                } 
            })

       
        app.listen(3000);
    })
    .catch(err => console.log(err));