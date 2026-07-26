const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
//const { engine } = require('express-handlebars');

const { mongoConnect } = require('./util/database');
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
    User.findById('6a662302320f8dee843fbbfc')
        .then(user => {
            //console.log(user);
            req.user = new User(user.name, user.email, user.cart, user._id);
            next();
        })
        .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404Page);

mongoConnect(() => {
    app.listen(3000);
});