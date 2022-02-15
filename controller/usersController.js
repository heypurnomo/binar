const { User } = require('../models')

class UsersController {
    static viewAll(req, res) {
        User.findAll({
            order: [['userId', 'ASC']]
        })
        .then(data => res.render('users', { data }))
        .catch(err => console.log(err))
    }
    static findUser(req, res) {
        User.findByPk(req.params.id)
        .then(data => res.json(data))
        .catch(err => console.log(err))
    }
    static createUser(req, res) {
        let {username, password, email} = req.body;
        if (username === '') username = null;
        if (password === '') password = null;
        if (email === '') email = null;
        const role = 'user'
        User.create({username, password, email, role})
        .then(() => res.redirect('/users'))
        .catch(err => {
            if (err.errors[0] !== undefined) {
                if (err.errors[0].type === "unique violation") {
                    req.flash('message', `${err.errors[0].path} telah digunakan`)
                } else if (err.errors[0].type === "notNull Violation") {
                    req.flash('message', `${err.errors[0].path} tidak boleh kosong`)
                } else if (err.errors[0].type === "Validation error") {
                    if (err.errors[0].path === "email") {
                        req.flash('message', "penulisan email salah")
                    }
                }
                req.flash('username', req.body.username)
                req.flash('email', req.body.email)
                req.flash('password', req.body.password)
                res.redirect('/users/create')
            } else {
                res.json(err)
            }
        })
    }
    static updateUser(req, res) {
        let {username, password, email} = req.body;
        if (email === '') email = null;
        if (username === '') username = null;
        if (password === '') password = null;
        User.update({username, password, email}, {
            where: {userId: req.params.id}
        })
        .then(() => res.redirect('/users'))
        .catch(err => {
            if (err.errors[0] !== undefined) {
                if (err.errors[0].type === "unique violation") {
                    req.flash('message', `${err.errors[0].path} telah digunakan`)
                } else if (err.errors[0].type === "notNull Violation") {
                    req.flash('message', `${err.errors[0].path} tidak boleh kosong`)
                } else if (err.errors[0].type === "Validation error") {
                    if (err.errors[0].path === "email") {
                        req.flash('message', "penulisan email salah")
                    }
                }
                req.flash('data', {
                    username: req.body.username,
                    password: req.body.password, 
                    email: req.body.email
                })
                res.redirect(`/users/update/${req.params.id}`)
            } else {
                res.json(err)
            }
        })
    }
    static deleteUser(req, res) {
        User.destroy({where: {userId: req.params.id}})
        .then(() => res.redirect('/users'))
        .catch(err => res.json(err))
    }
    static updateForm(req, res) {
        User.findByPk(req.params.id)
        .then(data => res.render('users/update', {
            id: req.params.id,
            data: req.flash('data')[0] || data,
            message: req.flash('message')[0]
        }))
    }
    static createForm(req, res) {
        res.render('users/create', {
            message: req.flash('message')[0],
            username: req.flash('username')[0],
            email: req.flash('email')[0],
            password: req.flash('password')[0]
        })
    }
}

module.exports = UsersController