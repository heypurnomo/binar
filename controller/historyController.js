const {History} = require('../models')

class HistoryController {
    static viewAll(req, res) {
        History.findAll({
            order: [['historyId', 'ASC']]
        })
        .then(data => res.render('history', {data}))
        .catch(err => console.log(err))
    }
    static viewOne(req, res) {
        History.findByPk(req.params.id)
        .then(data => { 
            if (data === null) res.json({message: "data not found"})
            else res.json(data)
        })
        .catch(err => console.log(err))
    }
    static create(req, res) {
        let {win, draw, lose, userId} = req.body;
        win !== '' ? win = parseInt(win) : win = 0;
        draw !== '' ? draw = parseInt(draw) : draw = 0;
        lose !== '' ? lose = parseInt(lose) : lose = 0;
        userId !== '' ? userId = parseInt(userId) : userId = null;
        History.create({win, draw, lose, userId})
        .then((data) => res.redirect('/history'))
        .catch(err => {
            if(err.name === "SequelizeForeignKeyConstraintError") {
                req.flash('message', 'User Id tidak ditemukan')
            } else if (err.name === "SequelizeUniqueConstraintError"){
                req.flash('message', `${err.errors[0].path} telah digunakan`)
            } else {
                console.log(err)
            }
            req.flash('win', req.body.win)
            req.flash('draw', req.body.draw)
            req.flash('lose', req.body.lose)
            req.flash('userId', req.body.userId)
            res.redirect('/history/create')
        })
    }
    static update(req, res) {
        let {win, draw, lose, userId} = req.body;
        win !== '' ? win = parseInt(win) : win = 0;
        draw !== '' ? draw = parseInt(draw) : draw = 0;
        lose !== '' ? lose = parseInt(lose) : lose = 0;
        userId !== '' ? userId = parseInt(userId) : userId = null;
        History.findByPk(req.params.id)
        .then(history => history.set({win, draw, lose, userId}))
        .then(history => history.save())
        .then(() => res.redirect('/history'))
        .catch(err => {
            if(err.name === "SequelizeForeignKeyConstraintError") {
                req.flash('message', 'User Id tidak ditemukan')
            } else if (err.name === "SequelizeUniqueConstraintError"){
                req.flash('message', `${err.errors[0].path} telah digunakan`)
            } else {
                console.log(err)
            }
            req.flash('win', req.body.win)
            req.flash('lose', req.body.lose)
            req.flash('draw', req.body.draw)
            req.flash('userId', req.body.userId)
            res.redirect(`/history/update/${req.params.id}`)
        })
    }
    static delete(req, res) {
        History.destroy({where: {historyId: req.params.id}})
        .then(() => res.redirect('/history'))
        .catch(err => res.json(err))
    }
    static createForm(req, res) {
        res.render('history/create', {
            message: req.flash('message')[0],
            win: req.flash('win')[0],
            draw: req.flash('draw')[0],
            lose: req.flash('lose')[0],
            userId: req.flash('userId')[0],
        })
    }
    static updateForm(req, res) {
        History.findByPk(req.params.id)
        .then(data => res.render('history/update', {
            userId: req.flash('userId')[0] || data.userId,
            id: req.params.id,
            win: req.flash('win')[0],
            lose: req.flash('lose')[0],
            draw: req.flash('draw')[0],
            message: req.flash('message')[0]
        }))
    }
}

module.exports = HistoryController;