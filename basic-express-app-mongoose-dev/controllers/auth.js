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
            isAuthenticated: false
        }
    );
}

exports.postLogin = (req, res, next) => {
    // res.setHeader('Set-Cookie', 'loggedIn=true; HttpOnly');
    req.session.isLoggedIn = true;
    res.redirect('/');
}
