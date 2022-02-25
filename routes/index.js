const routes = require('express').Router();
const userRouter = require('./userRouter');
const biodataRouter = require('./biodataRouter');
const historyRouter = require('./historyRouter');
const LoginController = require('../controller/loginController')
const auth = require('../middleware/authLogin')

routes.get('/', LoginController.formLogin)
routes.post('/login', LoginController.login)
routes.get('/logout', LoginController.logout)
routes.use('/users', auth, userRouter)
routes.use('/biodata', auth, biodataRouter)
routes.use('/history', auth, historyRouter)

module.exports = routes