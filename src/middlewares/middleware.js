exports.globalMiddleware = (req, res, next) => {
    res.locals.errors = req.flash("errors");
    res.locals.success = req.flash("success");
    res.locals.user = req.session.user;
    res.locals.theme = req.cookies.theme || "light";
    next();
};

exports.checkCsrfError = (err, req, res, next) => {
    if (err) return res.render("404");
    next();
};

exports.csrfMiddleware = (req, res, next) => {
    res.locals.csrfToken = req.csrfToken();
    next();
};

exports.loginRequired = (req, res, next) => {
    if (!req.session.user) {
        req.flash("errors", "You need to login");
        req.session.save(() => res.redirect("/"));
        return;
    }
    next();
}