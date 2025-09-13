let currentPage = 1;
let score = 0;
let gameActive = false;
let gameInterval;

// Navigation
function goToPage2() {
    document.getElementById('page1').classList.remove('active');
    document.getElementById('page2').classList.add('active');
    currentPage = 2;
    startGame();
}

// Game functions
function startGame() {
    score = 0;
    gameActive = true;
    updateScore();
    gameInterval = setInterval(createEmoji, 800);
    setTimeout(()=>endGame(), 10000);
}

function createEmoji() {
    if(!gameActive) return;
    const container = document.getElementById('game-container');
    const emojis = ['💖','❤️','💕','💝','💗','💘','💙','💚','💛','💜'];
    const emoji = document.createElement('div');
    emoji.className = 'emoji';
    emoji.textContent = emojis[Math.floor(Math.random()*emojis.length)];
    emoji.style.left=Math.random()*(container.offsetWidth-50)+'px';
    emoji.style.top=container.offsetHeight+'px';
    emoji.addEventListener('click',()=>catchEmoji(emoji));
    container.appendChild(emoji);
    setTimeout(()=>{if(emoji.parentNode) emoji.parentNode.removeChild(emoji)},3000);
}

function catchEmoji(e){
    score+=10;
    updateScore();
    if(e.parentNode)e.parentNode.removeChild(e);
}

function updateScore(){
    const el=document.getElementById('score');
    if(el) el.textContent=score;
}

function endGame(){
    gameActive=false;
    clearInterval(gameInterval);
    setTimeout(()=>goToPage3(),1000);
}

// Final page
function goToPage3(){
    document.getElementById('page2').classList.remove('active');
    document.getElementById('page3').classList.add('active');
    currentPage = 3;
    document.getElementById('bg-music').play();
    startFinalPage();
}

function startFinalPage(){
    startBackgroundLoveMessages();
    animateYears();
}

function animateYears(){
    const years=[2020,2021,2022,2023,2024,2025];
    const yearEl=document.getElementById('year');
    const dayMonth=document.getElementById('day-month');
    const finalMessage=document.getElementById('final-message');
    let idx=0;

    function nextYear(){
        if(idx<years.length){
            yearEl.textContent=years[idx];
            createYearEmojis();
            yearEl.style.textShadow='0 0 20px #ff69b4,0 0 30px #ff1493,0 0 40px #ffd700';
            setTimeout(()=>{
                yearEl.style.textShadow='2px 2px 8px #000';
                idx++;
                nextYear();
            },1500);
        } else {
            setTimeout(()=>{
                finalMessage.style.display='block';
                finalMessage.style.animation='sparkle 2s ease-in-out';
                startFloatingMessages();
                createFireworks();
                createConfetti();
            },500);
        }
    }
    nextYear();
}

// Falling emoji for year animation
function createYearEmojis(){
    const container=document.getElementById('floating-messages');
    const emojis=['💖','❤️','💕','💝','💗','💘','💙','💚','💛','💜'];
    for(let i=0;i<15;i++){
        const e=document.createElement('div');
        e.className='love-message';
        e.textContent=emojis[Math.floor(Math.random()*emojis.length)];
        e.style.fontSize=(Math.random()*2+1)+'rem';
        e.style.left=Math.random()*window.innerWidth+'px';
        e.style.top='-50px';
        e.style.color=`hsl(${Math.random()*60+300},70%,70%)`;
        e.style.opacity=0.8;
        e.style.animation=`emojiFall ${2+Math.random()*2}s linear forwards`;
        container.appendChild(e);
        setTimeout(()=>{ if(e.parentNode) e.parentNode.removeChild(e); },4000);
    }
}

// Background floating love messages
function startBackgroundLoveMessages(){
    const msgs=["I love you","I ❤️ you","Te amo","Je t'aime","Ich liebe dich",
                "I 💖 you","You're my everything","Forever yours",
                "My heart belongs to you","I adore you","You complete me","I love you more"];
    function createMsg(){
        const container=document.getElementById('floating-messages');
        const msg=msgs[Math.floor(Math.random()*msgs.length)];
        const e=document.createElement('div');
        e.className='love-message';
        e.textContent=msg;
        e.style.fontSize=(Math.random()*0.8+1.2)+'rem';
        e.style.left=Math.random()*window.innerWidth+'px';
        e.style.top=Math.random()*window.innerHeight+'px';
        e.style.color=`hsl(${Math.random()*60+300},${Math.random()*30+60}%,${Math.random()*20+70}%)`;
        e.style.transform=`rotate(${Math.random()*40-20}deg)`;
        container.appendChild(e);
        setTimeout(()=>{ if(e.parentNode) e.parentNode.removeChild(e); },8000);
    }
    for(let i=0;i<12;i++) setTimeout(()=>createMsg(),i*300);
    setInterval(createMsg,1000);
}

// Floating messages after final message
function startFloatingMessages(){
    const msgs=['💖 Forever Together','✨ Love You Always','🌟 My Heart is Yours','💕 Best Years of My Life','🎉 Celebrating Us','💝 You Complete Me','🌹 Still Falling for You','💗 Endless Love'];
    setInterval(()=>{
        const container=document.getElementById('floating-messages');
        const e=document.createElement('div');
        e.className='floating-message';
        e.textContent=msgs[Math.floor(Math.random()*msgs.length)];
        e.style.left=Math.random()*(window.innerWidth-200)+'px';
        e.style.color=`hsl(${Math.random()*60+300},70%,70%)`;
        e.style.animationDuration=(Math.random()*3+4)+'s';
        container.appendChild(e);
        setTimeout(()=>{ if(e.parentNode) e.parentNode.removeChild(e); },7000);
    },2000);
}

// Fireworks
function createFireworks(){
    setInterval(()=>{
        for(let i=0;i<5;i++){
            setTimeout(()=>createSingleFirework(),i*200);
        }
    },3000);
}

function createSingleFirework(){
    const colors=['#ff69b4','#ff1493','#ff6347','#ffd700','#98fb98','#87ceeb'];
    const startX=Math.random()*window.innerWidth;
    const startY=Math.random()*window.innerHeight/2;
    for(let i=0;i<15;i++){
        const f=document.createElement('div');
        f.className='firework';
        f.style.left=startX+'px';
        f.style.top=startY+'px';
        f.style.background=colors[Math.floor(Math.random()*colors.length)];
        const angle=(i/15)*2*Math.PI;
        const dist=Math.random()*100+50;
        f.style.setProperty('--x',Math.cos(angle)*dist+'px');
        f.style.setProperty('--y',Math.sin(angle)*dist+'px');
        document.body.appendChild(f);
        setTimeout(()=>{ if(f.parentNode) f.parentNode.removeChild(f); },1500);
    }
}

// Confetti
function createConfetti(){
    const emojis=['💖','✨','🎉','💕','🌟','💝'];
    setInterval(()=>{
        for(let i=0;i<3;i++){
            const c=document.createElement('div');
            c.className='confetti';
            c.textContent=emojis[Math.floor(Math.random()*emojis.length)];
            c.style.left=Math.random()*window.innerWidth+'px';
            c.style.top=window.innerHeight+'px';
            c.style.animationDuration=(Math.random()*2+3)+'s';
            document.body.appendChild(c);
            setTimeout(()=>{ if(c.parentNode) c.parentNode.removeChild(c); },5000);
        }
    },1000);
}
