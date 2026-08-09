const Product = require('../models/product');
const { validationResult } = require('express-validator');

exports.getAddProduct = (req, res, next) => {
    res.render(
        'admin/edit-product', 
        {
            pageTitle: 'Add Product', 
            path: '/admin/add-product',
            editing: false,
            hasError: false,
            errorMessage: null,
            validationErrors: []
        }
    );
};

exports.postAddProduct = (req, res, next) => {
    console.log(req.body);

    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).render(
            'admin/edit-product', 
            {
                pageTitle: 'Add Product', 
                path: '/admin/add-product',
                editing: false,
                hasError: true,
                product: {
                    title: title,
                    imageUrl: imageUrl,
                    price: price,
                    description: description
                },
                errorMessage: errors.array()[0].msg,
                validationErrors: errors.array()
            }
        );
    }

    

    const product = new Product({
        title: title, 
        price: price, 
        description: description, 
        imageUrl: imageUrl,
        userId: req.user
    });

    product
        .save()
        .then(result => {
            // just to test error handling
            // throw new Error('Some error!'); 
            
            //console.log(result);
            console.log('Created product!');
            res.redirect('/admin/products');
        })
        .catch(err => {
            // console.log(err);
            //res.redirect('/500');
            const error = new Error(err);
            error.httpStatusCode = 500;
            return next(error);
        });
};

exports.getEditProduct = (req, res, next) => {
    const editMode = req.query.edit;
    if (!editMode) {
        return res.redirect('/');
    }
    const prodId = req.params.productId;
    Product.findById(prodId)
        .then(product => {
            if (!product) {
                return res.redirect('/');
            }
            //console.log(product);
            res.render(
                'admin/edit-product', 
                {
                    pageTitle: 'Edit Product', 
                    path: '/admin/edit-product',
                    editing: editMode,
                    product: product,
                    hasError: false,
                    errorMessage: null,
                    validationErrors: []
                }
            );
        })
        .catch(err => {
            return next(err);
        });
};

exports.postEditProduct = (req, res, next) => {
    const prodId = req.body.productId;
    const title = req.body.title;
    const imageUrl = req.body.imageUrl;
    const price = req.body.price;
    const description = req.body.description;

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).render(
            'admin/edit-product', 
            {
                pageTitle: 'Edit Product', 
                path: '/admin/edit-product',
                editing: true,
                hasError: true,
                product: {
                    title: title,
                    imageUrl: imageUrl,
                    price: price,
                    description: description,
                    _id: prodId
                },
                errorMessage: errors.array()[0].msg,
                validationErrors: errors.array()
            }
        );
    }

    Product.findById(prodId)
        .then(product => {

            if(product.userId.toString() !== req.user._id.toString()) {
                return res.redirect('/');
            }

            product.title = title;
            product.imageUrl = imageUrl;
            product.price = price;
            product.description = description;

            return product.save()
                .then(result => {
                    console.log('UPDATED PRODUCT');
                    res.redirect('/admin/products');
                });
        })
        .catch(err => {
            return next(err);
        });
};

exports.getProducts = (req, res, next) => {
    Product.find({userId: req.user._id})
        .populate('userId') //this is just for demonstration
        .then(products => {
            console.log(products);
            res.render(
                'admin/products', 
                {
                    prods: products, 
                    pageTitle: 'Admin Products', 
                    path: '/admin/products', 
                    hasProducts: products.length > 0
                }
            );
        })
        .catch(err => {
            return next(err);
        })
}

exports.postDeleteProduct = (req, res, next) => {
    const prodId = req.body.productId;

    Product.deleteOne({_id: prodId, userId: req.user._id})
        .then(() => {
            console.log('DESTROYED PRODUCT')
            res.redirect('/admin/products');
        })
        .catch(err => {
            return next(err);
        })
}