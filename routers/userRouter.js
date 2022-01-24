// router api/v1/user mengembalikan json saja;
const express = require('express');
const userRouter = express.Router();
const { addUser, getUser, changeBio, deleteUser } = require('../utils/user');

function response(res, object) {
    res.status(object.status).json(object.json);
}

userRouter.get('/', (req, res) => {
    const user = getUser(req.query.id);
    response(res, user);
})
userRouter.post('/', (req, res) => {
    const {username, password, password2} = req.body;
    const user = addUser(username, password, password2);
    response(res, user);
})
userRouter.put('/bio', (req, res) => {
    const {username, bio} = req.body;
    const user = changeBio(username, bio);
    response(res, user);
})
userRouter.delete('/', (req, res) => {
    const user = deleteUser(req.query.id);
    response(res, user);
})

module.exports = { userRouter }