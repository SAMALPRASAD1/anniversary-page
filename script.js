let currentPage = 1;
let score = 0;
let gameActive = false;
let gameInterval;
let messageInterval;

// Navigation functions
function goToPage2() {
    document.getElementById('page1').classList.remove('active');
    document.getElementById('page2').classList.add('active');
    currentPage = 2;
    startGame();
}

function goToPage3() {
    document.getElementById('page2').classList.remove('active');
    document.getElementById('page3').classList.add('active');
    currentPage = 3;
    startFinalPage();
}

// Game functions
function startGame() {
    score = 0;
    gameActive = true;
    updateScore();
    
    // Create emojis every 800ms
    gameInterval = setInterval(createEmoji, 800);
    
    // End game after 10 seconds
    setTimeout(() => {
        endGame();
    }, 10000);
}

function createEmoji() {
    if (!gameActive) return;
    
    const gameContainer = document.getElementById('game-container');
    if (!gameContainer) return;
    
    const emoji = document.createElement('div');
    const emojis = ['💖', '❤️', '💕', '💝', '💗', '💘', '💙', '💚', '💛', '💜'];
    
    emoji.className = 'emoji';
    emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    emoji.style.left = Math.random() * (gameContainer.offsetWidth - 50) + 'px';
    emoji.style.top = gameContainer.offsetHeight + 'px';
    
    emoji.addEventListener('click', function() {
        catchEmoji(this);
    });
    
    gameContainer.appendChild(emoji);
    
    // Remove emoji after animation
    setTimeout(() => {
        if (emoji.parentNode) {
            emoji.parentNode.removeChild(emoji);
        }
    }, 3000);
}

function catchEmoji(emojiElement) {
    score += 10;
    updateScore();
    
    // Create sparkle effect
    createSparkles(emojiElement);
    
    // Remove the caught emoji
    if (emojiElement.parentNode) {
        emojiElement.parentNode.removeChild(emojiElement);
    }
}

function createSparkles(element) {
    const rect = element.getBoundingClientRect();
    const container = document.getElementById('game-container');
    if (!container) return;
    
    for (let i = 0; i < 5; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'emoji-sparkle';
        sparkle.style.left = rect.left - container.getBoundingClientRect().left + 'px';
        sparkle.style.top = rect.top - container.getBoundingClientRect().top + 'px';
        sparkle.style.animationDuration = '0.5s';
        sparkle.style.animationDelay = i * 0.1 + 's';
        
        container.appendChild(sparkle);
        
        setTimeout(() => {
            if (sparkle.parentNode) {
                sparkle.parentNode.removeChild(sparkle);
            }
        }, 600);
    }
}

function updateScore() {
    const scoreElement = document.getElementById('score');
    if (scoreElement) {
        scoreElement.textContent = score;
    }
}

function endGame() {
    gameActive = false;
    clearInterval(gameInterval);
    
    setTimeout(() => {
        goToPage3();
    }, 1000);
}

// Final page functions
function startFinalPage() {
    // Hide final message initially
    const finalMessage = document.getElementById('final-message');
    if (finalMessage) {
        finalMessage.style.display = 'none';
    }
    
    // Start background love messages
    startBackgroundLoveMessages();
    
    // Start year animation sequence
    animateYears();
}

function animateYears() {
    const years = [2020, 2021, 2022, 2023, 2024, 2025];
    const yearElement = document.getElementById('year');
    const toText = document.getElementById('to-text');
    const finalMessage = document.getElementById('final-message');
    
    // Check if elements exist
    if (!yearElement || !toText || !finalMessage) {
        console.error('Required elements not found');
        return;
    }
    
    let currentIndex = 0;
    
    function showNextYear() {
        if (currentIndex < years.length) {
            yearElement.textContent = years[currentIndex];
            
            // Add sparkle effect to year
            yearElement.style.textShadow = '0 0 20px #ff69b4, 0 0 30px #ff1493, 0 0 40px #ffd700';
            
            setTimeout(() => {
                if (yearElement) {
                    yearElement.style.textShadow = '2px 2px 8px #000';
                }
            }, 1000);
            
            currentIndex++;
            
            // Pause for 1.5 seconds at each year
            setTimeout(showNextYear, 1500);
        } else {
            // Show "to 2025" part
            setTimeout(() => {
                if (toText) {
                    toText.style.display = 'inline';
                    toText.style.animation = 'sparkle 1s ease-in-out';
                }
                
                // Show final 5th anniversary message
                setTimeout(() => {
                    if (finalMessage) {
                        finalMessage.style.display = 'block';
                        finalMessage.style.animation = 'sparkle 2s ease-in-out';
                    }
                    
                    // Start celebration effects
                    setTimeout(() => {
                        startFloatingMessages();
                        createFireworks();
                    }, 1500);
                }, 1000);
            }, 500);
        }
    }
    
    showNextYear();
}

function startBackgroundLoveMessages() {
    const loveMessages = [
        { text: "I love you", font: "'Great Vibes', cursive", size: "2rem" },
        { text: "I ❤️ you", font: "'Pacifico', cursive", size: "1.8rem" },
        { text: "Te amo", font: "Georgia, serif", size: "1.6rem" },
        { text: "Je t'aime", font: "'Great Vibes', cursive", size: "1.9rem" },
        { text: "Ich liebe dich", font: "Arial, sans-serif", size: "1.5rem" },
        { text: "I 💖 you", font: "'Pacifico', cursive", size: "2.1rem" },
        { text: "You're my everything", font: "Times, serif", size: "1.4rem" },
        { text: "Forever yours", font: "'Great Vibes', cursive", size: "1.7rem" },
        { text: "My heart belongs to you", font: "Verdana, sans-serif", size: "1.3rem" },
        { text: "I adore you", font: "'Pacifico', cursive", size: "1.6rem" },
        { text: "You complete me", font: "Courier, monospace", size: "1.4rem" },
        { text: "I love you more", font: "'Great Vibes', cursive", size: "1.8rem" }
    ];
    
    function createLoveMessage() {
        const floatingContainer = document.getElementById('floating-messages');
        if (!floatingContainer) return;
        
        const message = loveMessages[Math.floor(Math.random() * loveMessages.length)];
        const element = document.createElement('div');
        
        element.className = 'love-message';
        element.textContent = message.text;
        element.style.fontFamily = message.font;
        element.style.fontSize = message.size;
        element.style.left = Math.random() * (window.innerWidth - 300) + 'px';
        element.style.top = Math.random() * (window.innerHeight - 100) + 'px';
        element.style.color = `hsl(${Math.random() * 60 + 300}, ${Math.random() * 30 + 60}%, ${Math.random() * 20 + 70}%)`;
        element.style.transform = `rotate(${Math.random() * 40 - 20}deg)`;
        element.style.animationDelay = Math.random() * 4 + 's';
        
        floatingContainer.appendChild(element);
        
        // Remove after animation cycle
        setTimeout(() => {
            if (element.parentNode) {
                element.parentNode.removeChild(element);
            }
        }, 8000);
    }
    
    // Create initial love messages
    for (let i = 0; i < 12; i++) {
        setTimeout(() => createLoveMessage(), i * 300);
    }
    
    // Continue creating love messages
    setInterval(createLoveMessage, 1000);
}

function startFloatingMessages() {
    const messages = [
        '💖 Forever Together',
        '✨ Love You Always',
        '🌟 My Heart is Yours',
        '💕 Best Years of My Life',
        '🎉 Celebrating Us',
        '💝 You Complete Me',
        '🌹 Still Falling for You',
        '💗 Endless Love'
    ];
    
    messageInterval = setInterval(() => {
        createFloatingMessage(messages[Math.floor(Math.random() * messages.length)]);
    }, 2000);
}

function createFloatingMessage(text) {
    const container = document.getElementById('floating-messages');
    if (!container) return;
    
    const message = document.createElement('div');
    
    message.className = 'floating-message';
    message.textContent = text;
    message.style.left = Math.random() * (window.innerWidth - 200) + 'px';
    message.style.color = `hsl(${Math.random() * 60 + 300}, 70%, 70%)`;
    message.style.animationDuration = (Math.random() * 3 + 4) + 's';
    
    container.appendChild(message);
    
    setTimeout(() => {
        if (message.parentNode) {
            message.parentNode.removeChild(message);
        }
    }, 7000);
}

function createFireworks() {
    setInterval(() => {
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                createSingleFirework();
            }, i * 200);
        }
    }, 3000);
}

function createSingleFirework() {
    const colors = ['#ff69b4', '#ff1493', '#ff6347', '#ffd700', '#98fb98', '#87ceeb'];
    const startX = Math.random() * window.innerWidth;
    const startY = Math.random() * window.innerHeight;
    
    for (let i = 0; i < 15; i++) {
        const firework = document.createElement('div');
        firework.className = 'firework';
        firework.style.left = startX + 'px';
        firework.style.top = startY + 'px';
        firework.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        const angle = (i / 15) * 2 * Math.PI;
        const distance = Math.random() * 100 + 50;
        const x = Math.cos(angle) * distance;
        const y = Math.sin(angle) * distance;
        
        firework.style.setProperty('--x', x + 'px');
        firework.style.setProperty('--y', y + 'px');
        
        document.body.appendChild(firework);
        
        setTimeout(() => {
            if (firework.parentNode) {
                firework.parentNode.removeChild(firework);
            }
        }, 1500);
    }
}

// Add confetti effect
function createConfetti() {
    const confettiEmojis = ['💖', '✨', '🎉', '💕', '🌟', '💝'];
    
    setInterval(() => {
        for (let i = 0; i < 3; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.textContent = confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)];
            confetti.style.left = Math.random() * window.innerWidth + 'px';
            confetti.style.top = window.innerHeight + 'px';
            confetti.style.animationDuration = (Math.random() * 2 + 3) + 's';
            
            document.body.appendChild(confetti);
            
            setTimeout(() => {
                if (confetti.parentNode) {
                    confetti.parentNode.removeChild(confetti);
                }
            }, 5000);
        }
    }, 1000);
}

// Initialize confetti after page loads
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(() => {
        if (currentPage === 3) {
            createConfetti();
        }
    }, 3000);
});
