// script.js

// Countdown Timer
const countdownElement = {
    hours: document.getElementById('hours'),
    minutes: document.getElementById('minutes'),
    seconds: document.getElementById('seconds'),
};

const fireworksElement = document.getElementById('fireworks');

function updateCountdown() {
    const now = new Date();
    const newYear = new Date('January 1, 2025 00:00:00');
    const timeDiff = newYear - now;

    if (timeDiff <= 0) {
        clearInterval(timerInterval);
        countdownElement.hours.textContent = '00';
        countdownElement.minutes.textContent = '00';
        countdownElement.seconds.textContent = '00';
        startFireworks();
    } else {
        const hours = String(Math.floor((timeDiff / (1000 * 60 * 60)) % 24)).padStart(2, '0');
        const minutes = String(Math.floor((timeDiff / (1000 * 60)) % 60)).padStart(2, '0');
        const seconds = String(Math.floor((timeDiff / 1000) % 60)).padStart(2, '0');

        countdownElement.hours.textContent = hours;
        countdownElement.minutes.textContent = minutes;
        countdownElement.seconds.textContent = seconds;
    }
}

const timerInterval = setInterval(updateCountdown, 1000);

// Fireworks Function
function startFireworks() {
    fireworksElement.style.display = 'flex';
    fireworksElement.classList.remove('hidden');
    // Fireworks logic can include external libraries like fireworks.js for animations.
    console.log('🎆 Fireworks started!');
}

// WebRTC for Video Chat
const localVideo = document.getElementById('localVideo');
const remoteVideo = document.getElementById('remoteVideo');
const startCallButton = document.getElementById('startCall');
const endCallButton = document.getElementById('endCall');

let localStream;
let peerConnection;
const config = {
    iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
    ],
};

startCallButton.addEventListener('click', async () => {
    try {
        localStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
        localVideo.srcObject = localStream;

        peerConnection = new RTCPeerConnection(config);
        localStream.getTracks().forEach(track => peerConnection.addTrack(track, localStream));

        peerConnection.ontrack = event => {
            remoteVideo.srcObject = event.streams[0];
        };

        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);

        console.log('Offer created:', offer);
        // Signal offer to the remote peer here
    } catch (error) {
        console.error('Error starting call:', error);
    }
});

endCallButton.addEventListener('click', () => {
    if (peerConnection) {
        peerConnection.close();
        peerConnection = null;
    }
    localStream.getTracks().forEach(track => track.stop());
    localVideo.srcObject = null;
    remoteVideo.srcObject = null;
    console.log('Call ended.');
});
