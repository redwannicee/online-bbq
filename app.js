// script.js

// Countdown Timer for 2025 in Bangladesh Time (GMT+6)
function startCountdown() {
    const timerElements = {
        days: document.getElementById("days"),
        hours: document.getElementById("hours"),
        minutes: document.getElementById("minutes"),
        seconds: document.getElementById("seconds")
    };

    function updateTimer() {
        const now = new Date();
        const bdTimeOffset = 6 * 60 * 60 * 1000; // GMT+6 offset in milliseconds
        const bangladeshTime = new Date(now.getTime() + bdTimeOffset - now.getTimezoneOffset() * 60 * 1000);
        const newYear = new Date(2025, 0, 1); // Midnight on January 1, 2025
        const timeDiff = newYear - bangladeshTime;

        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((timeDiff / (1000 * 60)) % 60);
        const seconds = Math.floor((timeDiff / 1000) % 60);

        if (timeDiff > 0) {
            timerElements.days.textContent = days.toString().padStart(2, "0");
            timerElements.hours.textContent = hours.toString().padStart(2, "0");
            timerElements.minutes.textContent = minutes.toString().padStart(2, "0");
            timerElements.seconds.textContent = seconds.toString().padStart(2, "0");
        } else {
            clearInterval(timerInterval);
            document.getElementById("countdown").style.display = "none";
            document.getElementById("new-year-title").style.display = "block";
            startFireworks();
        }
    }

    const timerInterval = setInterval(updateTimer, 1000);
    updateTimer();
}

// Fireworks Animation
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];
function createFirework(x, y) {
    for (let i = 0; i < 100; i++) {
        particles.push({
            x,
            y,
            dx: Math.random() * 4 - 2,
            dy: Math.random() * 4 - 2,
            life: Math.random() * 50 + 50,
            color: `hsl(${Math.random() * 360}, 100%, 50%)`
        });
    }
}

function updateFireworks() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach((p, i) => {
        p.x += p.dx;
        p.y += p.dy;
        p.life--;

        if (p.life <= 0) particles.splice(i, 1);

        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
    });

    requestAnimationFrame(updateFireworks);
}

function startFireworks() {
    setInterval(() => createFirework(Math.random() * canvas.width, Math.random() * canvas.height), 500);
    updateFireworks();
}

// Initialize
window.onload = startCountdown;
