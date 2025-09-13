/* Page navigation */
function goToPage2(){
    document.getElementById('page1').classList.remove('active');
    document.getElementById('page2').classList.add('active');
    startGame();
}

/* Emoji game */
function startGame(){
    const container=document.getElementById('game-container');
    const scoreEl=document.getElementById('score');
    let score=0;
    const interval=setInterval(()=>{ createEmoji(container); },600);
    container.addEventListener('click', e=>{
        if(e.target.classList.contains('emoji')){
            container.removeChild(e.target);
            score++;
            scoreEl.textContent=score;
        }
    });
    setTimeout(()=>{ clearInterval(interval); goToPage3(); },10000);
}
function createEmoji(container){
    const emojis=["💖","😍","🥰","💕","💞","💓","💘","💗"];
    const emoji=document.createElement('div');
    emoji.classList.add('emoji');
    emoji.textContent=emojis[Math.floor(Math.random()*emojis.length)];
    emoji.style.left=Math.random()*(container.clientWidth-50)+"px";
    emoji.style.top=Math.random()*(container.clientHeight-50)+"px";
    container.appendChild(emoji);
    const sparkle=setInterval(()=>{
        const s=document.createElement('div');
        s.classList.add('emoji-sparkle');
        s.style.left=emoji.offsetLeft+15+"px";
        s.style.top=emoji.offsetTop+15+"px";
        s.style.width=s.style.height=(Math.random()*4+3)+"px";
        container.appendChild(s);
        setTimeout(()=>{ if(container.contains(s)) container.removeChild(s); },1000);
    },100);
    setTimeout(()=>{ clearInterval(sparkle); if(container.contains(emoji)) container.removeChild(emoji); },3000);
}

/* Page3 animations */
function goToPage3(){
    document.getElementById('page2').classList.remove('active');
    document.getElementById('page3').classList.add('active');
    startFloatingMessages();
    animateYearsWithBoom();
}

/* Floating "I love you" */
function startFloatingMessages(){
    const container=document.getElementById('floating-messages');
    setInterval(()=>{
        const msg=document.createElement('div');
        msg.classList.add('floating-message');
        const messages=["I love you 💖","You are my world 🌎","Forever us 💕","💘","💝"];
        msg.textContent=messages[Math.floor(Math.random()*messages.length)];
        msg.style.left=Math.random()*90+"vw";
        msg.style.fontSize=(Math.random()*2+2)+"rem";
        container.appendChild(msg);
        setTimeout(()=>{ if(container.contains(msg)) container.removeChild(msg); },7000);
    },300);
}

/* Animate years and final celebration */
function animateYearsWithBoom(){
    const yearSpan=document.getElementById('year');
    const finalMsg=document.getElementById('final-message');
    let currentYear=2020;
    const endYear=2025;
    const interval=setInterval(()=>{
        yearSpan.textContent=currentYear;
        if(currentYear===endYear){
            clearInterval(interval);
            fireworkBurst();
            createConfetti();
            setTimeout(()=>{ finalMsg.style.display="block"; },800);
        }
        currentYear++;
    },1000);
}

/* Fireworks */
function fireworkBurst(){
    const container=document.getElementById('page3');
    const colors=["#ff69b4","#ffb347","#ffd700","#ff1a3c","#ff6f91","#00ffff","#00ff00","#ff00ff"];
    for(let i=0;i<70;i++){
        const f=document.createElement('div');
        f.classList.add('firework');
        const angle=Math.random()*2*Math.PI;
        const dist=Math.random()*250+50;
        f.style.setProperty('--x',Math.cos(angle)*dist+"px");
        f.style.setProperty('--y',Math.sin(angle)*dist+"px");
        f.style.left="50%"; f.style.top="50%";
        f.style.background=colors[Math.floor(Math.random()*colors.length)];
        container.appendChild(f);
        setTimeout(()=>{ if(container.contains(f)) container.removeChild(f); },1500);
    }
}

/* Confetti hearts/emojis */
function createConfetti(){
    const container=document.getElementById('page3');
    const emojis=["💖","💘","💝","💞","💗","💓","🎉","✨"];
    for(let i=0;i<60;i++){
        const c=document.createElement('div');
        c.classList.add('confetti');
        c.textContent=emojis[Math.floor(Math.random()*emojis.length)];
        c.style.left=Math.random()*window.innerWidth+"px";
        c.style.top=Math.random()*window.innerHeight+"px";
        c.style.fontSize=(Math.random()*25+15)+"px";
        c.style.animationDuration=(Math.random()*2+3)+"s";
        container.appendChild(c);
        setTimeout(()=>{ if(container.contains(c)) container.removeChild(c); },5000);
    }
}
