function goToPage2() {
    document.getElementById('page1').classList.remove('active');
    document.getElementById('page2').classList.add('active');
    startGame();
}

function startGame() {
    const container = document.getElementById('game-container');
    const scoreElement = document.getElementById('score');
    let score = 0;

    const gameDuration = 10000; // 10 seconds game
    const endTime = Date.now() + gameDuration;

    const interval = setInterval(() => {
        createHeart(container);
    }, 800);

    container.addEventListener('click', function(e) {
        if (e.target.classList.contains('heart')) {
            container.removeChild(e.target);
            score++;
            scoreElement.textContent = score;
        }
    });

    setTimeout(() => {
        clearInterval(interval);
        goToPage3();
    }, gameDuration);
}

function createHeart(container) {
    const heart = document.createElement('div');
    heart.classList.add('heart');

    // Random position inside the container
    const maxX = container.clientWidth - 40;
    const maxY = container.clientHeight - 40;
    heart.style.left = Math.random() * maxX + "px";
    heart.style.top = Math.random() * maxY + "px";

    container.appendChild(heart);

    setTimeout(() => {
        if (container.contains(heart)) {
            container.removeChild(heart);
        }
    }, 3000);
}

function goToPage3() {
    document.getElementById('page2').classList.remove('active');
    document.getElementById('page3').classList.add('active');
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

    // Random horizontal position within viewport width
    message.style.left = Math.random() * 90 + "vw";

    // Random animation duration between 3 and 6 seconds
    message.style.animationDuration = (Math.random() * 3 + 3) + "s";

    container.appendChild(message);

    // Remove message after animation finishes
    setTimeout(() => {
        container.removeChild(message);
    }, 7000);
}
