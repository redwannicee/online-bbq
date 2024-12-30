// script.js

// Countdown Timer Logic
const countdownElement = document.getElementById('timer');
const fireworksElement = document.getElementById('fireworks');

function updateCountdown() {
    const now = new Date();
    const newYear = new Date('January 1, 2025 00:00:00');
    const timeDiff = newYear - now;

    if (timeDiff <= 0) {
        clearInterval(timerInterval);
        countdownElement.textContent = '00:00:00';
        startFireworks();
    } else {
        const hours = String(Math.floor((timeDiff / (1000 * 60 * 60)) % 24)).padStart(2, '0');
        const minutes = String(Math.floor((timeDiff / (1000 * 60)) % 60)).padStart(2, '0');
        const seconds = String(Math.floor((timeDiff / 1000) % 60)).padStart(2, '0');
        countdownElement.textContent = `${hours}:${minutes}:${seconds}`;
    }
}

const timerInterval = setInterval(updateCountdown, 1000);

// Fireworks Display
function startFireworks() {
    fireworksElement.style.display = 'block';
    fireworksElement.classList.remove('hidden');

    // Add additional fireworks animations if needed.
    console.log('🎆 Happy New Year! Fireworks triggered!');
}

// Video Chat Initialization (via Jitsi Meet)
// No additional JavaScript needed for basic integration with iframe.
console.log('Video chat powered by Jitsi Meet initialized.');
