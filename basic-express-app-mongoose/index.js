require('dotenv').config();

const { webcrypto } = require('crypto');
global.crypto = webcrypto;

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//const { engine } = require('express-handlebars');

const User = require('./models/user');

const app = express();


//uncomment this to use pug as a template engine
//app.set('view engine', 'pug');
//app.set('views', 'views');


//uncomment this to use handlebars as a template engine
//app.engine('handlebars', engine({layoutsDir: 'views/layouts/', defaultLayout: 'main'}));
//app.set('view engine', 'handlebars');
//app.set('views', 'views');

app.set('view engine', 'ejs');
//app.set('views', 'views');
app.set('views', path.join(__dirname, 'views')); //this works when debbug mode is active


const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const errorController = require('./controllers/error');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

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

app.use(errorController.get404Page);

const uri = process.env.MONGODB_URI;
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