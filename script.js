// script.js

// Countdown Timer
const timerElement = document.getElementById('timer');
function updateCountdown() {
    const now = new Date();
    const newYear = new Date(now.getFullYear() + 1, 0, 1);
    const diff = newYear - now;

    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    timerElement.textContent = `${hours}h ${minutes}m ${seconds}s`;

    // Trigger fireworks at midnight
    if (diff <= 0) {
        clearInterval(countdownInterval);
        startFireworks();
    }
}
const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();

// Fireworks Animation
const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
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
    particles.forEach((p, index) => {
        p.x += p.dx;
        p.y += p.dy;
        p.life--;

        if (p.life <= 0) particles.splice(index, 1);

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
