function goToPage2() {
    document.getElementById('page1').classList.remove('active');
    document.getElementById('page2').classList.add('active');
    startFloatingMessages();
}

function startFloatingMessages() {
    const container = document.getElementById('floating-messages');

    setInterval(() => {
        createFloatingMessage(container);
    }, 500); // Create a new message every 0.5 seconds
}

function createFloatingMessage(container) {
    const message = document.createElement('div');
    message.classList.add('floating-message');
    message.textContent = "I love you 💕";

    // Random horizontal position within the viewport
    message.style.left = Math.random() * 90 + "vw";

    // Random animation duration between 3 and 6 seconds
    message.style.animationDuration = (Math.random() * 3 + 3) + "s";

    container.appendChild(message);

    // Remove the message after the animation completes
    setTimeout(() => {
        container.removeChild(message);
    }, 7000); // Longer than max duration to ensure it's fully done
}
