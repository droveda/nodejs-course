const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const User = require('../models/user');

getErrorMessage = (req) => {
    let message = req.flash('error');

    if (message.length > 0) {
        message = message[0];
    } else {
        message = null;
    }

    return message;
}

exports.getLogin = (req, res, next) => {
    res.render('auth/login', {
        path: '/login',
        pageTitle: 'Login',
        errorMessage: getErrorMessage(req)
    });
};

exports.getSignup = (req, res, next) => {
  res.render('auth/signup', {
    path: '/signup',
    pageTitle: 'Signup',
    errorMessage: getErrorMessage(req)
  });
};

exports.postLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    User.findOne({email: email})
        .then(user => {
            
            if (!user) {
                req.flash('error', 'Invalid email or password!');
                return res.redirect('/login');
            }

            bcrypt.compare(password, user.password)
                .then(doMatch => {
                    if (doMatch) {

                        req.session.isLoggedIn = true;
                        req.session.user = { _id: user._id.toString(), email: user.email };
                        return req.session.save(err => {
                            console.log(err);
                            res.redirect('/');
                        });
                    }
                    req.flash('error', 'Invalid email or password!');
                    res.redirect('/login');
                })
                .catch(err => {
                    console.log(err);
                    res.redirect('/login');
                })

            
        })
        .catch(err => console.log(err));
};

exports.postSignup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;

    User.findOne({
        email: email
    })
    .then(userDoc => {
        if (userDoc) {
            req.flash('error', 'E-Mail exists already!');
            return res.redirect('/signup');
        }
        return bcrypt
            .hash(password, 12)
            .then(hashedPassword => {
                const user = new User({
                    email: email,
                    password: hashedPassword,
                    cart: { items: [] }
                });
                return user.save();
            })
            .then((result) => {
                res.redirect('/login');
            })
    })
    .catch(err => console.log(err));


};

exports.postLogout = (req, res, next) => {
  req.session.destroy(err => {
    console.log(err);
    res.redirect('/');
  });
};

exports.getReset = (req, res, next) => {
    res.render('auth/reset', {
        path: '/reset',
        pageTitle: 'Reset Password',
        errorMessage: getErrorMessage(req)
    });
};

exports.postReset = (req, res, next) => {
    crypto.randomBytes(32, (err, buffer) => {
        if (err) {
            console.log(err);
            return res.redirect('/reset');
        }
        const token = buffer.toString('hex');
        User.findOne({email: req.body.email})
            .then(user => {
                if (!user) {
                    req.flash('error', 'No account with that email found!');
                    return res.redirect('/reset');
                }
                user.resetToken = token;
                user.resetTokenExpiration = Date.now() + 36000000;
                return user.save();
            })
            .then(result => {
                //send email
                const url = 'http://localhost:3000/reset/' + token;
                console.log('sending email password reset', 'You requested a password reset, click this link to set a new password');
                console.log(url);
                return res.redirect('/');
            })
            .catch(err => console.log(err));
    });
};

exports.getNewPassword = (req, res, next) => {
    const token = req.params.token;
    User.findOne({
        resetToken: token,
        resetTokenExpiration: {$gt: Date.now()}
    })
        .then(user => {

            if (!user) {
                 req.flash('error', 'No permission!');
                return res.redirect('/login');
            }

            res.render('auth/newpassword', {
                path: '/new-password',
                pageTitle: 'New Password',
                errorMessage: getErrorMessage(req),
                userId: user._id.toString(),
                passwordToken: token
            });
        })
        .catch(err => console.log(err));
};

exports.postNewPassword = (req, res, next) => {
    const newPassword = req.body.password;
    const userId = req.body.userId;
    const passwordToken = req.body.passwordToken;

    let resetUser;
    User.findOne(
        {
            resetToken: passwordToken, 
            resetTokenExpiration: {$gt: Date.now()}, 
            _id: userId
        }
    ).then(user => {
        resetUser = user;
        return bcrypt.hash(newPassword, 12);
    })
    .then(hashedPassword => {
        resetUser.password = hashedPassword;
        resetUser.resetToken = null;
        resetTokenExpiration = undefined;

        return resetUser.save();
    })
    .then(result => {
        res.redirect('/login');
    })
    .catch(err => console.log(err));

};
