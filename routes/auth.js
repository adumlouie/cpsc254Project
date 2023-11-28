const express = require('express')
const router = express.Router()
const path = require('path')

const passport = require('passport')
const db = require('../database')

router.get('/login', (req, res, next) => {
    res.render('login')
})

router.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err); // handle error
        }
        if (!user) {
            return res.status(401).send({ message: 'Authentication failed' }); // send a custom message
        }
        req.logIn(user, (err) => {
            if (err) {
                return next(err);
            }
            console.log('Logged in Successfully')
            console.log(req.user)
            const user_id = req.user.user_id    
            req.session.user_id = user_id
            console.log(req.session.user_id)
            return res.redirect('/users'); // successful authentication
        });
    })(req, res, next);
});

router.get('/register', (req, res) => {
    res.render('register')
})

router.post('/register', (req, res) => {
    const { username, password } = req.body
    if (username && password) {
        console.log(username, password)
        try {
            db.promise().query(`INSERT INTO USERS (username, password) VALUES ('${username}', '${password}')`)
            console.log('User Created X.X')
            res.status(201).redirect('/users')
        }
        catch (err) {
            console.log(err)
        }
    }
})


module.exports = router