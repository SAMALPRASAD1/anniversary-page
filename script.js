/* Navigation Functions */
function goToPage2() {
    document.getElementById('page1').classList.remove('active');
    document.getElementById('page2').classList.add('active');
    startGame();
}

/* Game Functions */
function startGame() {
    const container = document.getElementById('game-container');
    const scoreElement = document.getElementById('score');
    let score = 0;
    const gameDuration = 10000; // 10 seconds

    const interval = setInterval(() => { createEmoji(container); }, 600);

    container.addEventListener('click', function(e) {
        if (e.target.classList.contains('emoji')) {
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

function createEmoji(container) {
    const emojis = ["💖","😍","🥰","💕","💞","💓","💘","💗"];
    const emoji = document.createElement('div');
    emoji.classList.add('emoji');
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];

    const maxX = container.clientWidth - 50;
    const maxY = container.clientHeight - 50;
    emoji.style.left = Math.random() * maxX + "px";
    emoji.style.top = Math.random() * maxY + "px";

    container.appendChild(emoji);

    // Sparkle trail behind emoji
    const sparkleInterval = setInterval(() => {
        const sparkle = document.createElement('div');
        sparkle.classList.add('emoji-sparkle');
        sparkle.style.left = emoji.offsetLeft + 15 + "px";
        sparkle.style.top = emoji.offsetTop + 15 + "px";
        sparkle.style.width = sparkle.style.height = (Math.random() * 4 + 3) + "px";
        container.appendChild(sparkle);
        setTimeout(() => { if(container.contains(sparkle)) container.removeChild(sparkle); }, 1000);
    }, 100);

    setTimeout(() => {
        clearInterval(sparkleInterval);
        if(container.contains(emoji)) container.removeChild(emoji);
    }, 3000);
}

/* Page 3 Functions */
function goToPage3() {
    document.getElementById('page2').classList.remove('active');
    document.getElementById('page3').classList.add('active');
    startFloatingMessages();
    startSparkles();
    animateYear();
}

/* Floating I love you Messages */
function startFloatingMessages() {
    const container = document.getElementById('floating-messages');
    setInterval(() => {
        const msg = document.createElement('div');
        msg.classList.add('floating-message');
        const messages = ["I love you 💖","You are my world 🌎","Forever us 💕"];
        msg.textContent = messages[Math.floor(Math.random() * messages.length)];
        msg.style.left = Math.random() * 90 + "vw";
        msg.style.fontSize = (Math.random() * 1 + 2) + "rem";
        container.appendChild(msg);
        setTimeout(()=>{ if(container.contains(msg)) container.removeChild(msg); }, 5000);
    }, 800);
}

/* Sparkles Background */
function startSparkles() {
    const container = document.getElementById('page3');
    setInterval(() => {
        const sparkle = document.createElement('div');
        sparkle.classList.add('sparkle');
        sparkle.style.left = Math.random() * 100 + "vw";
        sparkle.style.top = Math.random() * 100 + "vh";
        const size = Math.random() * 6 + 4;
        sparkle.style.width = sparkle.style.height = size + "px";
        sparkle.style.animationDuration = (Math.random() * 4 + 3) + "s";
        sparkle.style.opacity = Math.random() * 0.5 + 0.5;
        container.appendChild(sparkle);
        setTimeout(() => { if(container.contains(sparkle)) container.removeChild(sparkle); }, 7000);
    }, 150);
}

/* Animate Year with Confetti + Fireworks */
function animateYear() {
    const yearSpan = document.getElementById('year');
    let currentYear = 2020;
    const endYear = 2025;

    const interval = setInterval(() => {
        if(currentYear > endYear){
            clearInterval(interval);
            return;
        }

        yearSpan.textContent = currentYear;

        createYearConfetti();

        if(currentYear === endYear){
            setTimeout(fireworkBurst, 500);
        }

        currentYear++;
    }, 800);
}

/* Confetti/Heart for each year flip */
function createYearConfetti() {
    const container = document.getElementById('page3');
    const emojis = ["💖","💘","💝","💞","💗","💓","🎉","✨"];
    for(let i=0;i<10;i++){
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        confetti.textContent = emojis[Math.floor(Math.random()*emojis.length)];
        confetti.style.left = (50 + (Math.random()*100 -50)) + "px";
        confetti.style.top = "50%";
        confetti.style.fontSize = (Math.random()*20 + 15) + "px";
        confetti.style.animationDuration = (Math.random()*1 + 1.5) + "s";
        container.appendChild(confetti);
        setTimeout(()=>{ if(container.contains(confetti)) container.removeChild(confetti); },2000);
    }
}

/* Fireworks on final year */
function fireworkBurst() {
    const container = document.getElementById('page3');
    const colors = ["#ff69b4","#ffb347","#ffd700","#ff1a3c","#ff6f91"];
    for(let i=0;i<30;i++){
        const firework = document.createElement('div');
        firework.classList.add('firework');
        const angle = Math.random()*2*Math.PI;
        const distance = Math.random()*150 +50;
        const x = Math.cos(angle)*distance + "px";
        const y = Math.sin(angle)*distance + "px";
        firework.style.setProperty('--x', x);
        firework.style.setProperty('--y', y);
        firework.style.background = colors[Math.floor(Math.random()*colors.length)];
        firework.style.left = "50%";
        firework.style.top = "50%";
        container.appendChild(firework);
        setTimeout(()=>{ if(container.contains(firework)) container.removeChild(firework); },2000);
    }
}
