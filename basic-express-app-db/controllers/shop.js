const Product = require('../models/product');
const Cart = require('../models/cart');
const path = require('../util/path');

exports.getProducts = async (req, res, next) => {
    Product.fetchAll()
        .then(result => {
            res.render(
                'shop/product-list', 
                {
                    prods: result.rows, 
                    pageTitle: 'All Products', 
                    path: '/products', 
                    hasProducts: result.rows.length > 0
                }
            );
        })
        .catch(err => console.log(err));
};

exports.getProduct = (req, res, next) => {
    const productId = req.params.productId;

    Product.findById(productId)
        .then(result => {
            res.render(
                'shop/product-detail',
                {
                    pageTitle: result.rows[0].title,
                    path: '/products',
                    product: result.rows[0]
                }
            );
        })
        .catch(err => console.log(err));
}

exports.getIndex = (req, res, next) => {
     Product.fetchAll()
        .then(result => {
            //console.log(result.rows);
            res.render(
                'shop/index', 
                {
                    prods: result.rows, 
                    pageTitle: 'Shop', 
                    path: '/', 
                    hasProducts: result.rows.length > 0
                }
            );
        })
        .catch(err => console.log(err));

     
}

exports.getCart = (req, res, next) => {
    Cart.getCart(cart => {

        if (!cart) {
            const cartProducts = [];
            return res.render(
                'shop/cart',
                {
                    path: '/cart',
                    pageTitle: 'Your Cart',
                    products: cartProducts
                }
            );
        }

        Product.fetchAll(products => {

            const cartProducts = [];
            for (product of products) {
                const cartProductData = cart.products.find(prod => prod.id === product.id);
                if (cartProductData) {
                    cartProducts.push({productData: product, qty: cartProductData.qty});
                }
            }

            res.render(
                'shop/cart',
                {
                    path: '/cart',
                    pageTitle: 'Your Cart',
                    products: cartProducts
                }
            );

        });
    });
    
}

exports.postCart = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, (product) => {
        Cart.addProduct(prodId, product.price);
    });
    res.redirect('/cart');
};

exports.postCartDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;
    Product.findById(prodId, product => {
        Cart.deleteProduct(prodId, product.price);
        res.redirect('/cart');
    });
};

exports.getCheckout = (req, res, next) => {
    res.render(
        'shop/checkout',
        {
            path: '/checkout',
            pageTitle: 'Checkout'
        }
    );
}

exports.getOrders = (req, res, next) => {
    res.render(
        'shop/orders',
        {
            path: '/orders',
            pageTitle: 'Your Orders'
        }
    );
}