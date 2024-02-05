let countdown;
let paused = false;
let remainingTime = 0;
let toby =true;

// Function to start the countdown
function startCountdown() {
    // Retrieve input elements and timer display
    const hoursInput = document.getElementById('hours');
    const minutesInput = document.getElementById('minutes');
    const secondsInput = document.getElementById('seconds');
    const timerDisplay = document.getElementById('timer');
    const timerContainer = document.querySelector('.timer-container');
     
     //Parse input values to integers (default to 0 if not valid);
    const hours = parseInt(hoursInput.value) || 0;
    const minutes = parseInt(minutesInput.value) || 0;
    const seconds = parseInt(secondsInput.value) || 0;

     // Calculate total seconds from input values
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;

    // Check if the total seconds is not a number or is less than or equal to 0
    if (isNaN(totalSeconds) || totalSeconds <= 0) {
        alert('Please enter a valid duration.');
        return;
    }

    // Clear any existing timers
    clearCountdown();

    // Calculate end time
    const endTime = Date.now() + totalSeconds * 1000;

    // Update timer every second
    countdown = setInterval(() => {
        if (!paused) {
            // Calculate the remaining seconds
            const secondsLeft = Math.round((endTime - Date.now()) / 1000);

            if (secondsLeft < 0) {
                clearCountdown();
                timerDisplay.textContent = '00:00:00';
            } else {
                remainingTime = secondsLeft;
                displayTimeLeft(remainingTime);
            }
        }
    }, 1000);
   
}


    


function displayTimeLeft(seconds) {
    // Calculate hours, minutes, and remaining seconds
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    // ?-> is like if/else in this case if hr is lessthan 10 then add zero infront the display ther remaining hr
    const display = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    document.getElementById('timer').textContent = display;
}

function pauseResumeCountdown() {
    paused = !paused;

    if (paused) {
        clearInterval(countdown);
    } else {
        // Resume the countdown with the remaining time
        const currentTime = Date.now();
        const endTime = currentTime + remainingTime * 1000;

        // Update countdown every second
        countdown = setInterval(() => {
            const secondsLeft = Math.round((endTime - Date.now()) / 1000);

            if (secondsLeft < 0) {
                clearCountdown();
                document.getElementById('timer').textContent = '00:00:00';
            } else {
                remainingTime = secondsLeft;
                displayTimeLeft(remainingTime);
            }
        }, 1000);
    }

}

function clearCountdown() {
    clearInterval(countdown);
    paused = false;
    remainingTime = 0;
    document.getElementById('timer').textContent = '00:00:00';
    toby=false
}
