const {Biodata} = require('../models')

class BiodataController {
    static viewAll(req, res) {
        Biodata.findAll({
            order: [['biodataId', 'ASC']]
        })
        .then(data => res.render('biodata', {data}))
        .catch(err => console.log(err))
    }
    static viewOne(req, res) {
        Biodata.findByPk(req.params.id)
        .then(data => { 
            if (data === null) res.json({message: "data not found"})
            else res.json(data)
        })
        .catch(err => console.log(err))
    }
    static create(req, res) {
        let {firstName, lastName, gender, birthDay, userId} = req.body;
        if (firstName === '') firstName = null;
        if (lastName === '') lastName = null;
        if (birthDay === '') birthDay = null;
        if (userId === '') userId = null;
        Biodata.create({firstName, lastName, gender, birthDay, userId})
        .then(() => res.redirect('/biodata'))
        .catch(err => {
            if(err.name === "SequelizeForeignKeyConstraintError") {
                req.flash('message', `user id tidak ditemukan`)
            } else if (err.errors[0] !== undefined) {
                if (err.errors[0].type === "unique violation") {
                    req.flash('message', `${err.errors[0].path} telah digunakan`)
                } else if (err.errors[0].type === "notNull Violation") {
                    console.log(err.errors[0].path)
                    req.flash('message', `${err.errors[0].path} tidak boleh kosong`)
                } else if (err.errors[0].type === "Validation error") {
                    req.flash('message', `penulisan ${err.errors[0].path} salah`)
                } else {
                    console.log(err)
                }
            } else {
                console.log(err)
            }
            req.flash('userId', req.body.userId)
            req.flash('firstName', req.body.firstName)
            req.flash('lastName', req.body.lastName)
            req.flash('gender', req.body.gender)
            req.flash('birthDay', req.body.birthDay)
            res.redirect('/biodata/create')
        })
    }
    static update(req, res) {
        let {firstName, lastName, gender, birthDay, userId} = req.body;
        if (firstName === '') firstName = null;
        if (lastName === '') lastName = null;
        if (birthDay === '') birthDay = null;
        if (userId === '') userId = null;
        Biodata.update({firstName, lastName, gender, birthDay, userId}, {
            where: {biodataId: req.params.id}
        })
        .then((data) => res.redirect('/biodata'))
        .catch(err => {
            if(err.name === "SequelizeForeignKeyConstraintError") {
                req.flash('message', `user id tidak ditemukan`)
            } else if (err.errors[0] !== undefined) {
                if (err.errors[0].type === "unique violation") {
                    req.flash('message', `${err.errors[0].path} telah digunakan`)
                } else if (err.errors[0].type === "notNull Violation") {
                    req.flash('message', `${err.errors[0].path} tidak boleh kosong`)
                } else if (err.errors[0].type === "Validation error") {
                    req.flash('message', `penulisan ${err.errors[0].path} salah`)
                } else {
                    console.log(err)
                }
            } else {
                console.log(err)
            }
            req.flash('data', {
                userId: req.body.userId,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                gender: req.body.gender,
                birthDay: req.body.birthDay,
            })
            res.redirect(`/biodata/update/${req.params.id}`)
        })
    }
    static delete(req, res) {
        Biodata.destroy({where: {biodataId: req.params.id}})
        .then(() => res.redirect('/biodata'))
        .catch(err => res.json(err))
    }
    static createForm(req, res) {
        res.render('biodata/create', {
            message: req.flash('message')[0],
            firstName: req.flash('firstName')[0],
            lastName: req.flash('lastName')[0],
            gender: req.flash('gender')[0],
            birthDay: req.flash('birthDay')[0],
            userId: req.flash('userId')[0],
        })
    }
    static updateForm(req, res) {
        Biodata.findByPk(req.params.id)
        .then(data => res.render('biodata/update', {
            message: req.flash('message')[0],
            data: req.flash('data')[0] || data,
            id: req.params.id
        }))
        
    }
}

module.exports = BiodataController