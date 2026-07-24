const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
//const { engine } = require('express-handlebars');

const { sequelize } = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');

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
    User.findByPk(1)
        .then(user => {
            req.user = user;
            next();
        })
        .catch(err => console.log(err));
});

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404Page);


Product.belongsTo(User, {
    constraints: true,
    onDelete: 'CASCADE'
});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {through: CartItem});
Product.belongsToMany(Cart, {through: CartItem});
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, {through: OrderItem});

sequelize
    //.sync({force: true})
    .sync()
    .then(result => {
        return User.findByPk(1);

        //console.log(result);
        
    })
    .then(user => {
        if(!user) {
            return User.create({
                name: 'Max',
                email: 'test@test.com'
            });
        }
        return user;
    })
    .then(user => {
        //console.log(user);
        return user.createCart();
    })
    .then(cart => {
        app.listen(3000);
    })
    .catch(err => {
        console.log(err);
    });