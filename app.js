const express = require('express')
const session = require('express-session')
const path = require('path')
const store = new session.MemoryStore()
const hbs = require('hbs')

const passport = require('passport')
const local = require('./strategies/local')
const app = express()

// setting up router
const usersRoute = require('./routes/users')
const homeRoute = require('./routes/home')
const leaderboardRoute = require('./routes/leaderboard')
const authRoute = require('./routes/auth')

// define paths for express config
const viewsPath = path.join(__dirname, './views')
const partialsPath = path.join(__dirname, './partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// hbs helper function to handle dates
hbs.registerHelper('formatDate', function(dateString) {
    const date = new Date(dateString);
    return date.toDateString().split(' ').slice(0, 3).join(' ');
});

// setup session
app.use(session({
    secret: 'secret',
    cookie: { maxAge: 120000 },
    saveUninitialized: false,
    resave: false,
    store
}))

// middleware to log session store, req method and url
// app.use((req, res, next) => {
//     // console.log(store)
//     console.log(`${req.method} - ${req.url}`)
//     next()
// })

// serving static files and url parsing middle ware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(passport.initialize())
app.use(passport.session())

app.use('/home', homeRoute)
app.use('/users', usersRoute)
app.use('/leaderboard', leaderboardRoute)
app.use('/auth', authRoute)
app.get('/about', (req, res) => {
    res.render('about')
})

app.get('*', (req, res) => {
    res.send('My 404 page')
})

app.listen(3000, (req, res) => {
    console.log('Fitty Kitty is listening on port: 3000! 😹')
})