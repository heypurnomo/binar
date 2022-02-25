const express = require('express');
const app = express();
const {APP_PORT} = require('./config/myConfig')
const routes = require('./routes');
const session = require('express-session')
const flash = require('connect-flash')

app.set('view engine', 'ejs')
app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(session({
    secret:'rahasia',
    resave:true,
    saveUninitialized: true
}))
app.use(flash())

app.use('/', routes)
app.use('/', (req, res) => {
    res.send('404 page not found')
})

app.listen(APP_PORT, () => {
    console.log(`app listening on http://localhost:${APP_PORT}`)
})