const express = require('express');
const app = express();
const port = 3000;
const { User, addUser, getUser, changeUser, deleteUser } = require('./utils/user')

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app
    .get('/', (req, res) => {
        res.render('index');
    })
    .get('/game', (req, res) => {
        res.render('game')
    })
    .get('/login', (req, res) => {
        res.render('login', {
            title: 'Login',
        })
    })
    .get('/sign-up', (req, res) => {
        res.render('login', {
            title: 'Sign-up',
        })
    })
    .get('/user', (req, res) => {
        const user = getUser(req.query.id);
        res.json(user);
    })
    .post('/user', (req, res) => {
        const user = addUser(new User(req.body.email, req.body.password, req.body.nama));
        res.json(user);
    })
    .put('/user', (req, res) => {
        const body = req.body;
        const user = changeUser(body.id, body.email, body.password, body.nama);
        res.json(user);
    })
    .delete('/user', (req, res) => {
        const user = deleteUser(req.query.id);
        res.json(user);
    })

app.listen(port, () => {
    console.log(`server listening on http://localhost:${port}`);
})