// fetch workouts array from the user and returns
async function getWorkouts() {
    try {
        const response = await fetch('http://localhost:3000/users/workouts')
        if (!response.ok) {
            throw new Error('HTTP ERROR')
        }
        const workouts = await response.json()
        console.log(workouts)
        return workouts
    }   catch (error) {
        console.error('Error fetching workouts: ', error)
    }
}

// fetch current date
async function getCurrentDay() {
    try {
        const response = await fetch('http://localhost:3000/users/day')
        if (!response.ok) {
            throw new Error('HTTP ERROR')
        }
        const day = await response.json()
        console.log('Current Day is: ', day)
        return day
    }   catch (error) {
        console.error('Error fetching day')
    }
}

// takes a workout log and returns a dom workout log
function createLog(log) {
    const logDiv = document.createElement('div');
    logDiv.className = 'log';

    const leftDiv = document.createElement('div');
    leftDiv.className = 'left';

    const flagDiv = document.createElement('div');
    flagDiv.className = 'flag';

    const titleH3 = document.createElement('h3');
    titleH3.className = 'title';
    titleH3.textContent = log.title;

    leftDiv.appendChild(flagDiv);
    leftDiv.appendChild(titleH3);

    const rightDiv = document.createElement('div');
    rightDiv.className = 'right';

    const detailsButton = document.createElement('button');
    detailsButton.id = 'details';
    detailsButton.textContent = 'DETAILS';
    detailsButton.dataset.modalTarget = '#modal-details';

    const dateDiv = document.createElement('div');
    dateDiv.className = 'date';
    dateDiv.textContent = log.date;

    const editIcon = document.createElement('span');
    editIcon.className = 'material-icons';
    editIcon.textContent = 'edit';

    const deleteIcon = document.createElement('span');
    deleteIcon.className = 'material-icons';
    deleteIcon.textContent = 'delete';

    rightDiv.appendChild(detailsButton);
    rightDiv.appendChild(dateDiv);
    rightDiv.appendChild(editIcon);
    rightDiv.appendChild(deleteIcon);

    logDiv.appendChild(leftDiv);
    logDiv.appendChild(rightDiv);

    // adding event listeners
    detailsButton.addEventListener('click', function() {
        const modal = document.querySelector(detailsButton.dataset.modalTarget);
        document.getElementById("modal-title").textContent = log.title;
        document.getElementById("modal-type").textContent = log.workout_type;
        document.getElementById("modal-date").textContent = log.date;
        document.getElementById("modal-notes").textContent = log.notes;
        openModal(modal)
    })
    editIcon.addEventListener('click', function() { 

    })
    deleteIcon.addEventListener('click', function() {
        deleteData(log.workout_id)
        logDiv.remove()
    })

    return logDiv;   
}

async function deleteData(workoutID) {
    fetch('http://localhost:3000/users/workouts', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ workout_id: workoutID })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        console.log('Log deleted:', data);
    })
    .catch(error => {
        console.error('There was a problem with the delete operation:', error);
    });
}

async function logoutUser() {
    fetch('http://localhost:3000/auth/logout', {
        method: 'POST'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Logout failed');
        }
        console.log('user has logged out')
        return response.text();
    })
    .catch(error => {
        console.error('There was a problem with the delete operation:', error);
    });
}

// filter logs by today
async function filterToday(logs) {
    const currentDay = await getCurrentDay();
    return logs.filter(log => log.date === currentDay);
}

function filterByStrength(logs) {
    return logs.filter(log => log.workout_type === 'strength');
}

function filterByFlexibility(logs) {
    return logs.filter(log => log.workout_type === 'flexibility');
}

function filterByCardio(logs) {
    return logs.filter(log => log.workout_type === 'cardio');
}

function clearLogs() {
    const log_container = document.querySelector('.log-container')
    log_container.innerHTML = '';
}

//display filtered logs
function displayLogs(logs) {
    const log_container = document.querySelector('.log-container');
    logs.forEach(log => {
        const logElement = createLog(log);
        log_container.appendChild(logElement);
    });
}

// modal logic
// selects all buttons that open modals
const openModalButtons = document.querySelectorAll('[data-modal-target]')
const closeModalButtons = document.querySelectorAll('[data-close-button]')
const overlay = document.getElementById('overlay')

openModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector(button.dataset.modalTarget)
        openModal(modal)
    })
})

overlay.addEventListener('click', () => {
    const modals = document.querySelectorAll('.modal.active')
    modals.forEach(modal => {
        closeModal(modal)
    })
})

closeModalButtons.forEach(button => {
    button.addEventListener('click', () => {
        const modal = button.closest('.modal')
        closeModal(modal)
    })
})

function openModal(modal) {
    if (modal == null) return
    modal.classList.add('active')
    overlay.classList.add('active')
}

function closeModal(modal) {
    if (modal == null) return
    modal.classList.remove('active')
    overlay.classList.remove('active')
}


// main code 
const log_container = document.querySelector('.log-container')
const signout_btn = document.getElementById('sign-out-btn')

signout_btn.addEventListener('click', logoutUser)

let globalWorkoutLogs = {}

getWorkouts().then(workoutLogs => {
    if (workoutLogs) {
        console.log('Workout Logs:', workoutLogs);
        globalWorkoutLogs = workoutLogs
        workoutLogs.forEach(log => {
            const logElement = createLog(log)
            log_container.appendChild(logElement)
        })
    }
}).catch(error => {
    console.error('Error fetching workouts: ', error);
});

// today button
document.getElementById('today-btn').addEventListener('click', async () => {
    const filteredLogs = await filterToday(globalWorkoutLogs)
    clearLogs();
    displayLogs(filteredLogs);
});

// home button
document.getElementById('home-btn').addEventListener('click', () => {
    clearLogs()
    displayLogs(globalWorkoutLogs)
})

document.getElementById('strength-btn').addEventListener('click', () => {
    const filteredLogs = filterByStrength(globalWorkoutLogs);
    clearLogs();
    displayLogs(filteredLogs);
});

document.getElementById('flexibility-btn').addEventListener('click', () => {
    const filteredLogs = filterByFlexibility(globalWorkoutLogs);
    clearLogs();
    displayLogs(filteredLogs);
});

document.getElementById('cardio-btn').addEventListener('click', () => {
    const filteredLogs = filterByCardio(globalWorkoutLogs);
    clearLogs();
    displayLogs(filteredLogs);
});

