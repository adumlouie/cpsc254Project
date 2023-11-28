const express = require('express')
const router = express.Router()
const db = require('../database')
const path = require('path')

// router.get('/', async (req, res) => {
//     res.render('users')
// })

router.get('/logworkout', (req, res) => {
    res.render('log')
})

router.post('/logworkout', async (req, res) => {
    const { date, duration, workout_type, notes } = req.body;
    console.log(req.session.user_id)
    const user_id = req.session.user_id;
    if (!user_id) {
        return res.status(403).send({ message: 'Unauthorized: No user in session' });
    }
    if (!date) {
        return res.status(400).send({ message: 'Missing required fields' });
    }
    try {
        const query = 'INSERT INTO workouts (user_id, date, duration, workout_type, notes) VALUES (?, ?, ?, ?, ?)';
        await db.promise().query(query, [user_id, date, duration, workout_type, notes]);
        console.log('Workout Log Created!');
        res.status(201).render('/users');
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

// queries workout database and sends back
router.get('/', async (req, res) => {
    const user_id = req.session.user_id;
    if (!user_id) {
        return res.status(403).json({ message: "Not authenticated" });
    }
    try {
        const workoutsArray = await db.promise().query('SELECT * FROM workouts WHERE user_id = ?', [user_id]);
        const workouts = workoutsArray[0]
        res.render('users', { workouts }) // Send the workouts back to the client
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error" });
    }
})

module.exports = router