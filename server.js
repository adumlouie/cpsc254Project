const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const app = express()
const mysql = require('mysql2')

// connecting to sql database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'StrawberryMilk140',
    database: '254_Project'
})

db.connect((err) => {
    if (err) {
        throw err
    }
    console.log('fitty kitty has connected to the database')
})

// serving static files
app.use(express.static('public'))

// home route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
})

// about route

// leaderboard route
app.get('/leaderboard', (req, res) => {
    res.send('This is my leaderboard route')
})

// user profile route
app.get('/profile', (req, res) => {
    res.send('This is my profile route')
})

//

// app.listen(port, () => {
//     console.log('fitty kitty is live')
// })


