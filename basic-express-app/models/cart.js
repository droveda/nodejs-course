const fs = require('fs');
const pathUtil = require('../util/path');
const path = require('path');

const p = path.join(
    pathUtil, 
    'data', 
    'cart.json'
);

module.exports = class Cart {
    
    static addProduct(id, productPrice) {
        // Fetch the previous cart
        fs.readFile(p, (err, fileContent) => {
            let cart = {products:[], totalPrice: 0};
            if (!err) {
                cart = JSON.parse(fileContent);
            }
            // Analyze the cart => Find existing product
            const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
            const existingProduct = cart.products[existingProductIndex];
            let updateProduct;
            // Add new product / increase the quantity
            if (existingProduct) {
                updateProduct = { ...existingProduct };
                updateProduct.qty = updateProduct.qty + 1;
                cart.products = [...cart.products];
                cart.products[existingProductIndex] = updateProduct;
            } else {
                updateProduct = { id: id, qty: 1 };
                cart.products = [...cart.products, updateProduct];
            }
            cart.totalPrice = parseFloat((cart.totalPrice + Number(productPrice)).toFixed(2));
            //to display the value cart.totalPrice.toFixed(2)
            fs.writeFile(p, JSON.stringify(cart), err => {
                console.log(err);
            });
        });        

    }

    static deleteProduct(id, productPrice) {
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                return;
            }
            let cart = JSON.parse(fileContent);
            const updatedCart = { ...cart };
            const product = updatedCart.products.find(prod => prod.id === id);
            if (!product) {
                return;
            }
            const productQty = product.qty;

            updatedCart.products = updatedCart.products.filter(prod => prod.id !== id);

            cart.totalPrice = parseFloat((cart.totalPrice - (productPrice * productQty)).toFixed(2));

            fs.writeFile(p, JSON.stringify(updatedCart), err => {
                console.log(err);
            });

        });
    }
    
    static getCart(cb) {
        fs.readFile(p, (err, fileContent) => {
            if (err) {
                console.log(err);
                cb(null);
            } else {
                const cart = JSON.parse(fileContent);
                cb(cart);
            }
        });
    }


}