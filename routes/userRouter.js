const usersRouter = require('express').Router();
const UsersController = require('../controller/usersController')

usersRouter.get('/', UsersController.viewAll)
usersRouter.get('/create', UsersController.createForm)
usersRouter.post('/create', UsersController.createUser)
usersRouter.get('/update/:id', UsersController.updateForm)
usersRouter.post('/update/:id', UsersController.updateUser)
usersRouter.get('/delete/:id', UsersController.deleteUser)
usersRouter.get('/:id', UsersController.findUser)

module.exports = usersRouter;