async function fetchUserWorkouts() {
    try {
        const response = await fetch('/users/workouts');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const workouts = await response.json();
        displayWorkouts(workouts);
    } catch (error) {
        console.error('Fetch error:', error);
    }
}

function displayWorkouts {
    const container = document.getElementById('workoutContainer')
}

console.log(fetchUserWorkouts())