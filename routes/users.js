const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('This is my users page')
})

router.post('/', (req, res) => {
    console.log(req.body)
    res.status(201).send('Created User')
})

module.exports = router