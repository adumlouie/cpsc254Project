const express = require('express')
const path = require('path')
const app = express()

const usersRoute = require('./routes/users')
const homeRoute = require('./routes/home')
const leaderboardRoute = require('./routes/leaderboard')
const loginRoute = require('./routes/login')
const logworkoutRoute = require('./routes/logworkout')
const registerRoute = require('./routes/register')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/home', homeRoute)
app.use('/users', usersRoute)
app.use('/leaderboard', leaderboardRoute)
app.use('/login', loginRoute)
app.use('/logworkout', logworkoutRoute)
app.use('/register', registerRoute)

app.listen(3000, (req, res) => {
    console.log('Fitty Kitty is listening on port: 3000! 😹')
})