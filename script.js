function goToPage2() {
    document.getElementById('page1').classList.remove('active');
    document.getElementById('page2').classList.add('active');
    startFloatingMessages();
}

function startFloatingMessages() {
    const container = document.getElementById('floating-messages');

    setInterval(() => {
        createFloatingMessage(container);
    }, 500); // Every 0.5 seconds
}

function createFloatingMessage(container) {
    const message = document.createElement('div');
    message.classList.add('floating-message');
    message.textContent = "I love you 💕";

    // Random horizontal position between 0% and 90% of viewport width
    message.style.left = Math.random() * 90 + "vw";

    // Random animation duration between 2 and 6 seconds
    message.style.animationDuration = (Math.random() * 4 + 2) + "s";

    container.appendChild(message);

    // Remove message after animation finishes (max 6s + 1s buffer)
    setTimeout(() => {
        container.removeChild(message);
    }, 7000);
}
