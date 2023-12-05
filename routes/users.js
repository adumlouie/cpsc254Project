const express = require('express')
const router = express.Router()
const db = require('../database')
const path = require('path')
const moment = require('moment')
const format = require('date-fns/format')

router.get('/logworkout', (req, res) => {
    res.render('log')
})

router.post('/logworkout', async (req, res) => {
    const { date, title, workout_type, notes } = req.body;
    console.log(req.session.user_id)
    const user_id = req.session.user_id;
    if (!user_id) {
        return res.status(403).send({ message: 'Unauthorized: No user in session' });
    }
    if (!date) {
        return res.status(400).send({ message: 'Missing required fields' });
    }
    try {
        const query = 'INSERT INTO workouts (user_id, date, title, workout_type, notes) VALUES (?, ?, ?, ?, ?)';
        await db.promise().query(query, [user_id, date, title, workout_type, notes]);
        console.log('Workout Log Created!');
        res.status(201).redirect('/users');
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Internal Server Error' });
    }
});

// renders user log workout page
router.get('/', async (req, res) => {
    const user_id = req.session.user_id;
    const user = req.session.username
    if (!user_id) {
        return res.status(403).json({ message: "Not authenticated" });
    }
    try {
        const workoutsArray = await db.promise().query('SELECT * FROM workouts WHERE user_id = ?', [user_id]);
        const workouts = workoutsArray[0]
        res.render('workouts', {
            workouts
        }) // Send the workouts back to the client
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Internal Server Error" });
    }
})

// endpoint to get workouts for user
router.get('/workouts', (req, res) => {
    const user_id = req.session.user_id;
    db.query('SELECT * FROM workouts WHERE user_id = ?', [user_id], (error, results) => {
        if (error) {
            return res.status(500).send('Error fetching workouts')
        }
        results.forEach(log => {
            log.date = format(new Date(log.date), 'MMM do')
        })
        res.json(results)
    })
})

// send day to user
router.get('/day', (req, res) => {
    const date = format(new Date(), 'MMM do')
    res.json(date)
})

// delete workout
router.delete('/workouts', (req, res) => {
    const { workout_id } = req.body
    console.log(workout_id)

    const deleteQuery = 'DELETE FROM workouts WHERE workout_id = ?'

    db.query(deleteQuery, [workout_id], (err, result) => {
        if (err) {
            console.error(err)
            res.status(500).send('Error deleting the workout')
        } else {
            if (result.affectedRows === 0) {
                res.status(404).send('Workout not found')
            } else {
                console.log(`Workout with ID ${workout_id} deleted`)
                res.status(200)
            }
        }
    })
})

module.exports = router