exports.get404Page = (req, res, next) => {
    //res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    res.status(404).render('404', 
        {
            pageTitle: 'Page Not Found',
            path: '/404'
        }
    );
};

exports.get500Page = (req, res, next) => {
    //res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    res.status(500).render('500', 
        {
            pageTitle: 'Internal Error',
            path: '/500'
        }
    );
};