const Product = require('../models/product');
const Cart = require('../models/cart');
const path = require('../util/path');

exports.getProducts = (req, res, next) => {
    //console.log('In another middleware!');
    //console.log('shp.js', adminData.products);
    //res.sendFile(path.join(rootDir, 'views', 'shop.html'));
    
    Product.fetchAll(products => {
        res.render(
            'shop/product-list', 
            {
                prods: products, 
                pageTitle: 'All Products', 
                path: '/products', 
                hasProducts: products.length > 0
            }
        );
    });
    
};

exports.getProduct = (req, res, next) => {
    const productId = req.params.productId;

    Product.findById(productId, product => {
        //console.log(product);
        res.render(
            'shop/product-detail',
            {
                pageTitle: product.title,
                path: '/products',
                product: product
            }
        );
    });
}

exports.getIndex = (req, res, next) => {
     Product.fetchAll(products => {
        res.render(
            'shop/index', 
            {
                prods: products, 
                pageTitle: 'Shop', 
                path: '/', 
                hasProducts: products.length > 0
            }
        );
    });
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