function auth(req, res, next) {
    if (!req.session.user) {
        res.send(`silahkan <a href="/">Login</a> dulu`)
    } else {
        next()
    }
}

module.exports = auth;