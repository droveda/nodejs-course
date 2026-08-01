const User = require('../models/user');

exports.getLogin = (req, res, next) => {
    //console.log(req.get('Cookie'));
    //const isAutenticated = false;
    // const isAutenticated = req.get('Cookie')
    //     .trim()
    //     .split('=')[1] === 'true';
    //console.log(isAutenticated);
    console.log(req.session.isLoggedIn);

    res.render(
        'auth/login',
        {
            path: '/login',
            pageTitle: 'Login',
            isAuthenticated: req.session.isLoggedIn
        }
    );
};

exports.postLogin = (req, res, next) => {
    User.findById('6a66a8d8fde0194240980dd2')
        .then((user) => {
            req.session.isLoggedIn = true;
            req.session.user = { 
                _id: user._id.toString(),
                name: user.name,
                email: user.email
            };
            req.session.save(err => {
                console.log(err);
                res.redirect('/');
            });
        })
        .catch(err => {
            console.log(err);
        });
    // res.setHeader('Set-Cookie', 'loggedIn=true; HttpOnly');
};

exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(err);
        res.redirect('/');
    });
};
