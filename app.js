/**
 * menjalankan servernya pakai node aja, kalau pakai nedomen dilaptopku
 * pas bikin userbaru, file data.json nya ada perubahan
 * sehingga server restart sendiri, akibatnya sessionnya juga terreset
 */
const express = require('express');
const {addUser, deleteUser, changeBio, authLogin, getIdByUsername, getUser, sortWinLargest} = require('./utils/user')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash');
const { userRouter } = require('./routers/userRouter');
const app = express();
const port = 3000;
const apiRouter = express.Router();
const v1 = express.Router();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cookieParser('rahasia'))
app.use(session({
    secret: 'rahasia',
    resave: true,
    saveUninitialized: true
}))
app.use(flash())

app.use('/api', apiRouter);
apiRouter.use('/v1', v1);
v1.use('/user', userRouter);

app.get('/', (req, res) => {
    res.render('index',{
        login: req.session.login,
        username: req.session.username
    });
})
app.get('/sign-up', (req, res) => {
    res.render('form', {
        title: 'Sign-up',
        message: req.flash('message')[0],
        username: req.flash('username')[0],
        password: req.flash('password')[0],
        password2: req.flash('password2')[0]
    })
})
app.get('/login', (req, res) => {
    res.render('form', {
        title: 'Login',
        message: req.flash('message')[0],
        username: req.flash('username')[0],
        password: req.flash('password')[0]
    })
})
app.get('/game', (req, res) => {
    res.render('game', { username: req.session.username })
})
app.get('/profil', (req, res) => {
    const userId = getIdByUsername(req.session.username);
    const user = getUser(userId);
    res.render('profil', {
        user : user.json
    })
})
app.get('/rank', (req, res) => {
    const users = getUser();
    const usersWinLargest = sortWinLargest(users.json);
    res.render('rank', {
        login: req.session.login,
        username: req.session.username,
        users: usersWinLargest
    })
})

v1.post('/sign-up', (req, res) => {
    const {username, password, password2} = req.body;
    const auth = addUser(username, password, password2);
    if (auth.status === 400) {
        req.flash('username', username)
        req.flash('password', password)
        req.flash('password2', password2)
        req.flash('message', auth.json.message)
        res.redirect('/sign-up')
    } 
    if (auth.status === 200) {
        req.session.username = username;
        req.session.login = true;
        res.redirect('/');
    }
})
v1.post('/login', (req, res) => {
    const {username, password} = req.body;
    const auth = authLogin(username, password);
    if (auth.status === 400) {
        req.flash('username', username)
        req.flash('password', password)
        req.flash('message', auth.json.message)
        res.redirect('/login')
    }
    if (auth.status === 200) {
        req.session.username = username;
        req.session.login = true;
        res.redirect('/')
    }
})
v1.get('/logout', (req, res) => {
    req.session.username = '';
    req.session.login = false;
    res.redirect('/')
}) 
v1.get('/delete', (req, res) => {
    const userId = getIdByUsername(req.session.username);
    deleteUser(userId);
    req.session.username = '';
    req.session.login = false;
    res.redirect('/')
})
v1.post('/bio', (req, res) => {
    changeBio(req.session.username, req.body.bio)
    res.redirect('/profil')
})

app.use((req, res) => {
    res.send('404 : file not found')
})
app.use((err, req, res, next) => {
    if(err) {
        res.send('505 : server error')
    }
})

app.listen(port, () => {
    console.log(`server listening on http://localhost:${port}`);
})