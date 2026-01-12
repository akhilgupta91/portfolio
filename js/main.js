// ===== RETRO MARIO INTERACTIVE EFFECTS =====

// Mobile Navigation Toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    playSound('menu');
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            playSound('jump');
        }
    });
});

// ===== SOUND EFFECTS =====
let soundEnabled = true;
const soundToggle = document.querySelector('.sound-toggle');

// Simple sound synthesizer using Web Audio API
const audioContext = new (window.AudioContext || window.webkitAudioContext)();

function playSound(type) {
    if (!soundEnabled) return;

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    switch(type) {
        case 'coin':
            oscillator.frequency.setValueAtTime(988, audioContext.currentTime); // B5
            oscillator.frequency.setValueAtTime(1319, audioContext.currentTime + 0.1); // E6
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.2);
            break;
        case 'jump':
            oscillator.frequency.setValueAtTime(200, audioContext.currentTime);
            oscillator.frequency.exponentialRampToValueAtTime(600, audioContext.currentTime + 0.1);
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.15);
            break;
        case 'powerup':
            oscillator.frequency.setValueAtTime(523, audioContext.currentTime); // C5
            oscillator.frequency.setValueAtTime(659, audioContext.currentTime + 0.08); // E5
            oscillator.frequency.setValueAtTime(784, audioContext.currentTime + 0.16); // G5
            oscillator.frequency.setValueAtTime(1047, audioContext.currentTime + 0.24); // C6
            gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.4);
            break;
        case 'menu':
            oscillator.frequency.setValueAtTime(440, audioContext.currentTime);
            gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + 0.1);
            break;
    }
}

// Sound toggle
soundToggle.addEventListener('click', () => {
    soundEnabled = !soundEnabled;
    soundToggle.querySelector('.sound-on').style.display = soundEnabled ? 'inline' : 'none';
    soundToggle.querySelector('.sound-off').style.display = soundEnabled ? 'none' : 'inline';
    if (soundEnabled) playSound('coin');
});

// ===== COIN COLLECTION EFFECT =====
document.querySelectorAll('.coin').forEach(coin => {
    coin.addEventListener('click', () => {
        playSound('coin');
        coin.style.transform = 'scale(1.5)';
        coin.style.opacity = '0';
        setTimeout(() => {
            coin.style.transform = '';
            coin.style.opacity = '1';
        }, 500);

        // Update score
        updateScore(100);
    });
});

// ===== SCORE SYSTEM =====
let score = 999999;
const scoreDisplay = document.querySelector('.score-value');

function updateScore(points) {
    score += points;
    if (scoreDisplay) {
        scoreDisplay.textContent = score.toLocaleString();
        scoreDisplay.style.transform = 'scale(1.2)';
        setTimeout(() => {
            scoreDisplay.style.transform = 'scale(1)';
        }, 200);
    }
}

// ===== BUTTON CLICK EFFECTS =====
document.querySelectorAll('.pixel-btn, .warp-pipe, .nav-link').forEach(btn => {
    btn.addEventListener('mousedown', () => {
        btn.style.transform = 'translate(2px, 2px)';
        btn.style.boxShadow = '2px 2px 0 #000';
    });

    btn.addEventListener('mouseup', () => {
        btn.style.transform = '';
        btn.style.boxShadow = '';
    });

    btn.addEventListener('mouseleave', () => {
        btn.style.transform = '';
        btn.style.boxShadow = '';
    });

    btn.addEventListener('click', () => {
        playSound('menu');
    });
});

// ===== POWER-UP CARD EFFECTS =====
document.querySelectorAll('.power-up').forEach(card => {
    card.addEventListener('mouseenter', () => {
        playSound('powerup');
    });
});

// ===== SKILL TAG HOVER =====
document.querySelectorAll('.skill-tag').forEach(tag => {
    tag.addEventListener('mouseenter', () => {
        playSound('coin');
    });
});

// ===== QUEST CARD EXPAND =====
document.querySelectorAll('.quest-card').forEach(card => {
    card.addEventListener('click', () => {
        card.classList.toggle('expanded');
        playSound('menu');
    });
});

// ===== SCROLL ANIMATIONS =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';

            // Play sound on first appearance
            if (!entry.target.dataset.appeared) {
                entry.target.dataset.appeared = 'true';
                // Delay sound slightly for effect
                setTimeout(() => playSound('coin'), 100);
            }
        }
    });
}, observerOptions);

// Apply animation to elements
document.querySelectorAll('.power-up, .quest-card, .skill-block, .achievement-card, .warp-pipe').forEach((el, index) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
    observer.observe(el);
});

// ===== XP BAR ANIMATION =====
const xpObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const fill = entry.target.querySelector('.xp-fill');
            if (fill) {
                const width = fill.style.width;
                fill.style.width = '0';
                setTimeout(() => {
                    fill.style.width = width;
                    fill.style.transition = 'width 1.5s ease-out';
                }, 100);
            }
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.xp-bar').forEach(bar => {
    xpObserver.observe(bar);
});

// ===== PARALLAX CLOUDS =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    document.querySelectorAll('.cloud').forEach((cloud, index) => {
        const speed = 0.1 + (index * 0.05);
        cloud.style.transform = `translateX(${scrolled * speed}px)`;
    });
});

// ===== KONAMI CODE EASTER EGG =====
const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.code === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            activateKonamiCode();
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function activateKonamiCode() {
    // Play victory sound
    playSound('powerup');
    playSound('powerup');

    // Rainbow mode!
    document.body.style.animation = 'rainbow 2s linear infinite';

    // Add rainbow keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes rainbow {
            0% { filter: hue-rotate(0deg); }
            100% { filter: hue-rotate(360deg); }
        }
    `;
    document.head.appendChild(style);

    // Show message
    const message = document.createElement('div');
    message.innerHTML = '&#9733; 30 LIVES! &#9733;';
    message.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-family: 'Press Start 2P', cursive;
        font-size: 2rem;
        color: #fbd000;
        text-shadow: 4px 4px 0 #000;
        z-index: 10000;
        animation: pulse 0.5s ease infinite;
    `;
    document.body.appendChild(message);

    // Update lives display
    const lives = document.querySelector('.lives');
    if (lives) {
        lives.innerHTML = 'LIVES: ' + '&#9829; '.repeat(30);
    }

    // Remove rainbow after 5 seconds
    setTimeout(() => {
        document.body.style.animation = '';
        message.remove();
    }, 5000);
}

// ===== TYPEWRITER EFFECT RESTART ON SCROLL =====
const typewriterElement = document.querySelector('.typewriter');
if (typewriterElement) {
    const typewriterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'none';
                setTimeout(() => {
                    entry.target.style.animation = 'typing 3s steps(25, end), blink-caret 0.75s step-end infinite';
                }, 10);
            }
        });
    }, { threshold: 0.5 });

    typewriterObserver.observe(typewriterElement);
}

// ===== RANDOM COIN SPAWN =====
function spawnCoin() {
    const coin = document.createElement('div');
    coin.innerHTML = '&#9733;';
    coin.style.cssText = `
        position: fixed;
        font-size: 1.5rem;
        color: #fbd000;
        text-shadow: 2px 2px 0 #8b4513;
        z-index: 999;
        pointer-events: auto;
        cursor: pointer;
        left: ${Math.random() * (window.innerWidth - 50)}px;
        top: ${Math.random() * (window.innerHeight - 50)}px;
        animation: coinFloat 3s ease-in-out infinite;
    `;

    coin.addEventListener('click', () => {
        playSound('coin');
        updateScore(50);
        coin.style.transform = 'scale(2)';
        coin.style.opacity = '0';
        setTimeout(() => coin.remove(), 300);
    });

    document.body.appendChild(coin);

    // Remove after 10 seconds if not clicked
    setTimeout(() => {
        if (coin.parentNode) {
            coin.style.opacity = '0';
            setTimeout(() => coin.remove(), 300);
        }
    }, 10000);
}

// Spawn a coin every 15 seconds
setInterval(spawnCoin, 15000);

// ===== HEADER SHADOW ON SCROLL =====
const header = document.querySelector('.header');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.style.boxShadow = '0 4px 0 #000, 0 8px 20px rgba(0,0,0,0.3)';
    } else {
        header.style.boxShadow = '0 4px 0 #000';
    }
});

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.style.background = '#8b4513';
        link.style.color = '#fff';
        if (link.getAttribute('href') === `#${current}`) {
            link.style.background = '#fbd000';
            link.style.color = '#000';
        }
    });
});

// ===== CLICK SPARKLE EFFECT =====
document.addEventListener('click', (e) => {
    createSparkle(e.clientX, e.clientY);
});

function createSparkle(x, y) {
    for (let i = 0; i < 5; i++) {
        const sparkle = document.createElement('div');
        sparkle.innerHTML = '&#10022;';
        sparkle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            font-size: ${10 + Math.random() * 10}px;
            color: #fbd000;
            pointer-events: none;
            z-index: 9999;
            animation: sparkle 0.5s ease-out forwards;
        `;

        const angle = (Math.random() * 360) * (Math.PI / 180);
        const distance = 20 + Math.random() * 30;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;

        sparkle.style.setProperty('--tx', tx + 'px');
        sparkle.style.setProperty('--ty', ty + 'px');

        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 500);
    }
}

// Add sparkle animation
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
    @keyframes sparkle {
        0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(var(--tx), var(--ty)) scale(0);
        }
    }
`;
document.head.appendChild(sparkleStyle);

// ===== INITIALIZE =====
console.log('%c WELCOME TO AKHIL\'S WORLD! ', 'background: #e52521; color: #fff; font-size: 20px; font-family: "Press Start 2P", cursive; padding: 10px;');
console.log('%c Try the Konami Code: ↑↑↓↓←→←→BA ', 'background: #fbd000; color: #000; font-size: 12px; padding: 5px;');
