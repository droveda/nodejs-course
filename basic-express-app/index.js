const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
//const { engine } = require('express-handlebars');

const app = express();

//uncomment this to use pug as a template engine
//app.set('view engine', 'pug');
//app.set('views', 'views');


//uncomment this to use handlebars as a template engine
//app.engine('handlebars', engine({layoutsDir: 'views/layouts/', defaultLayout: 'main'}));
//app.set('view engine', 'handlebars');
//app.set('views', 'views');

app.set('view engine', 'ejs');
app.set('views', 'views');


const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const errorController = require('./controllers/error');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404Page);

app.listen(3000);