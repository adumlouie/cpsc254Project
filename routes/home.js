const express = require('express')
const router = express.Router()
const path = require('path')

router.get('/', (req, res) => {
    res.render('home', {
        title: 'BootyCheeks',
        name: 'Adam Louie'
    })
})

module.exports = router