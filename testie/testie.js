const format = require('date-fns/format')

const workoutLogs = 
[
    {
    workout_id: 7,
    user_id: 2,
    date: "2023-11-30T08:00:00.000Z",
    duration: 20,
    workout_type: null,
    notes: "I worked out hard"
    },
    {
    workout_id: 8,
    user_id: 2,
    date: "2023-12-01T08:00:00.000Z",
    duration: 32,
    workout_type: null,
    notes: "I ran a lot"
    },
    {
    workout_id: 9,
    user_id: 2,
    date: "2023-12-08T08:00:00.000Z",
    duration: 21,
    workout_type: null,
    notes: "gina is a loser"
    }
]
console.log(format(new Date(workoutLogs[0].date), 'MMM do'))