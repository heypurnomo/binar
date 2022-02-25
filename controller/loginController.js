const { User } = require('../models');

class LoginController {
    static login(req, res) {
        User.findOne({where: {username: req.body.username}})
        .then(data => {
            if (data) {
                if (data.password !== req.body.password) {
                    req.flash('username', req.body.username)
                    req.flash('password', req.body.password)
                    req.flash('message', 'Password salah')
                    res.redirect('/')
                } else if (data.role !== 'admin') {
                    req.flash('username', req.body.username)
                    req.flash('password', req.body.password)
                    req.flash('message', 'Anda bukan admin')
                    res.redirect('/')
                } else {
                    req.session.user = data;
                    res.redirect('/users');
                }
            } else {
                req.flash('username', req.body.username)
                req.flash('password', req.body.password)
                req.flash('message', 'Username tidak ditemukan')
                res.redirect('/')
            }
        })
        .catch(err => res.json(err))
    }
    static logout(req, res) {
        req.session.user = null;
        res.redirect('/')
    }
    static formLogin(req, res) {
        res.render('login', {
            message: req.flash('message')[0],
            username: req.flash('username')[0],
            password: req.flash('password')[0],
        })
    }
}

module.exports = LoginController