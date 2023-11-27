const express = require('express')
const router = express.Router()
const db = require('../database')
const path = require('path')

router.get('/', async (req, res) => {
    res.status(200).sendFile(path.join(__dirname, '../views', 'profile.html'))
})

// client side will call this and do stuff with it
router.get('/log', async (req, res) => {
    const results = await db.promise().query(`SELECT * FROM TEST_USERS`)
    console.log(results[0])
    res.status(200).send(results[0])
})
//should be in register
router.post('/log', (req, res) => {
    const { username, password } = req.body
    if (username && password) {
        console.log(username, password)
        try {
            db.promise().query(`INSERT INTO TEST_USERS VALUES('${username}', '${password}')`)
            res.status(201).send({ msg: 'Created user'})
        }
        catch (err) {
            console.log(err)
        }
    }
})


module.exports = router