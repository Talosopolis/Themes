
// Single source of truth for all available themes
const AVAILABLE_THEMES = ["Hacker", "Cyberpunk", "Y2K", "Synthwave", "Tetris", "Glass", "Aqua", "Forest", "Ruby", "Sapphire", "Emerald", "Amethyst", "Topaz", "Arcade", "Sunrise", "Twilight", "In Your Face", "RealWorld-ish", "Soft UI", "Vintage", "CartoonNetwork"];

const newStyles = `
/* Accordion Styles */
.accordion {
    margin: 2rem 0;
}
.accordion-item {
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}
.accordion-header {
    background: none;
    border: none;
    color: inherit;
    font-size: 1.5rem;
    padding: 1rem;
    text-align: left;
    width: 100%;
    cursor: pointer;
    font-family: inherit;
}
.accordion-content {
    display: none;
    padding: 1rem;
    background: rgba(0,0,0,0.1);
}
.accordion-content ul {
    list-style: none;
    padding: 0;
    margin: 0;
}
.accordion-content ul li a {
    color: inherit;
    text-decoration: none;
    display: block;
    padding: 0.5rem 0;
    opacity: 0.8;
    transition: opacity 0.3s;
}
.accordion-content ul li a:hover {
    opacity: 1;
}

/* Dropdown Styles */
.dropdown {
    position: relative;
    display: inline-block;
    margin-top: 1rem;
}
.dropdown-button {
    /* Uses existing button styles */
}
.dropdown-content {
    display: none;
    position: absolute;
    bottom: 100%; /* Position above the button */
    left: 0;
    background-color: rgba(0,0,0,0.5);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    min-width: 160px;
    box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
    z-index: 1;
    border-radius: 15px;
    padding: 5px;
    margin-bottom: 10px;
}
.dropdown-content a {
    color: white;
    padding: 12px 16px;
    text-decoration: none;
    display: block;
    border-radius: 10px;
}
.dropdown-content a:hover {
    background-color: rgba(255, 255, 255, 0.2);
}
.dropdown:hover .dropdown-content {
    display: block;
}

/* Applet Styles */
.applet-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    margin-top: 1rem;
}
.absurd-textarea {
    width: 100%;
    min-height: 100px;
    background: rgba(0,0,0,0.3);
    border: 1px solid rgba(255,255,255,0.5);
    color: #fff;
    padding: 10px;
    border-radius: 10px;
    font-family: inherit;
    resize: vertical;
}
.absurd-output {
    width: 100%;
    min-height: 50px;
    background: rgba(0,0,0,0.2);
    border: 1px dashed rgba(255,255,255,0.4);
    color: #fff;
    padding: 10px;
    border-radius: 10px;
    font-family: 'Courier New', Courier, monospace;
    white-space: pre-wrap;
    word-wrap: break-word;
}

/* Form Enhancement Styles */
.form-group {
    margin-bottom: 1.5rem;
}

.checkbox-group, .radio-group {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-top: 0.5rem;
}

.checkbox-group label, .radio-group label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    cursor: pointer;
}

/* Custom Range Slider */
input[type="range"] {
    -webkit-appearance: none;
    width: 100%;
    height: 10px;
    background: rgba(0, 0, 0, 0.3);
    border-radius: 5px;
    outline: none;
    padding: 0;
    margin-top: 0.5rem;
}
input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 20px;
    height: 20px;
    background: #fff;
    border-radius: 50%;
    cursor: pointer;
    border: 1px solid rgba(0,0,0,0.5);
}
input[type="range"]::-moz-range-thumb {
    width: 20px;
    height: 20px;
    background: #fff;
    border-radius: 50%;
    cursor: pointer;
    border: 1px solid rgba(0,0,0,0.5);
}

/* Toggle Switch Styles */
.toggle-group {
    display: flex;
    align-items: center;
    gap: 1rem;
    position: relative;
}
.switch {
    position: relative;
    display: inline-block;
    width: 60px;
    height: 34px;
}
.switch input {
    opacity: 0;
    width: 0;
    height: 0;
}
.slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.3);
    transition: .4s;
    border-radius: 34px;
}
.slider:before {
    position: absolute;
    content: "";
    height: 26px;
    width: 26px;
    left: 4px;
    bottom: 4px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
}
input:checked + .slider {
    background-color: #2196F3; /* Example color */
}
input:checked + .slider:before {
    transform: translateX(26px);
}

/* Tooltip Styles */
.toggle-group .tooltip {
    visibility: hidden;
    width: 220px;
    background-color: #555;
    color: #fff;
    text-align: center;
    border-radius: 6px;
    padding: 5px;
    position: absolute;
    z-index: 1;
    left: 105%;
    opacity: 0;
    transition: opacity 0.3s;
}
.toggle-group:hover .tooltip {
    visibility: visible;
    opacity: 1;
}
`;

// Inject styles into the head
const styleSheet = document.createElement("style");
styleSheet.innerText = newStyles;
if (document.head) {
    document.head.appendChild(styleSheet);
} else {
    document.addEventListener('DOMContentLoaded', () => {
        document.head.appendChild(styleSheet);
    });
}



// Global variables to hold animation IDs
let animationFrameId = null;
let flickerIntervalId = null;

// Function to stop all animations and restore styles
function stopAllAnimations() {
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
    }
    if (flickerIntervalId) {
        clearInterval(flickerIntervalId);
        flickerIntervalId = null;
    }
    const canvas = document.getElementById('background-animation');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.style.display = 'none';
    }
    // Restore card styles potentially modified by cyberpunk flicker
    const cards = document.querySelectorAll('.glassmorphic-card');
    cards.forEach(card => {
        card.style.boxShadow = '';
        card.style.borderColor = '';
    });
}

// Function to start the matrix animation for the Hacker theme
function startHackerAnimation() {
    stopAllAnimations(); 
    const canvas = document.getElementById('background-animation');
    canvas.style.display = 'block';
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let columns = [];
    const fontSize = 16;
    const numColumns = Math.floor(canvas.width / fontSize);

    class Column {
        constructor(x) {
            this.x = x;
            this.y = 0;
            this.characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
            this.history = [];
        }

        draw() {
            for (let i = 0; i < this.history.length; i++) {
                const char = this.history[i];
                const y = this.y - i * fontSize;
                if (y > 0 && y < canvas.height) {
                    const opacity = 1 - (i / this.history.length);
                    ctx.globalAlpha = opacity;
                    ctx.fillStyle = i === 0 ? '#00FF41' : `rgba(0, 255, 65, ${opacity})`;
                    ctx.fillText(char, this.x, y);
                }
            }
            if (this.y > canvas.height && Math.random() > 0.975) {
                this.y = 0;
                this.history = [];
            }
        }

        update() {
            const char = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
            this.history.unshift(char);
            if (this.history.length > 100) {
                this.history.pop();
            }
            this.y += fontSize;
            this.draw();
        }
    }

    function init() {
        columns = [];
        for (let i = 0; i < numColumns; i++) {
            columns.push(new Column(i * fontSize));
        }
        ctx.font = `${fontSize}px 'Courier New', Courier, monospace`;
    }

    function animate() {
        ctx.fillStyle = 'rgba(13, 2, 8, 0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (const column of columns) {
            column.update();
        }
        animationFrameId = requestAnimationFrame(animate);
    }

    init();
    animate();
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        init();
    });
}

// Function to start the Cyberpunk theme animations
function startCyberpunkAnimation() {
    stopAllAnimations();

    // 1. Asynchronous Flickering Borders
    const cards = document.querySelectorAll('.glassmorphic-card');
    const originalStyles = new Map();
     setTimeout(() => {
        cards.forEach(card => {
            originalStyles.set(card, {
                boxShadow: getComputedStyle(card).boxShadow,
                borderColor: getComputedStyle(card).borderColor
            });
        });
    }, 100);


    flickerIntervalId = setInterval(() => {
        cards.forEach(card => {
            if (Math.random() > 0.7) { 
                const original = originalStyles.get(card);
                if (!original) return; 
                card.style.boxShadow = 'none';
                card.style.borderColor = 'transparent';
                setTimeout(() => {
                    card.style.boxShadow = original.boxShadow;
                    card.style.borderColor = original.borderColor;
                }, Math.random() * 150 + 50); 
            }
        });
    }, 200);

    // 2. Dynamic Neo-Tokyo Background
    const canvas = document.getElementById('background-animation');
    canvas.style.display = 'block';
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const buildings = [];
    const numBuildings = 100;
    const maxBuildingHeight = canvas.height / 2;

    for (let i = 0; i < numBuildings; i++) {
        buildings.push({
            x: Math.random() * canvas.width,
            w: Math.random() * 50 + 10,
            h: Math.random() * maxBuildingHeight + 20,
        });
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, '#0d021b');
        gradient.addColorStop(0.5, '#23054a');
        gradient.addColorStop(1, '#ff00c1');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = '#1a0c2e';
        buildings.forEach(building => {
            ctx.fillRect(building.x, canvas.height - building.h, building.w, building.h);
            for (let y = canvas.height - building.h; y < canvas.height; y += 10) {
                for (let x = building.x; x < building.x + building.w; x += 8) {
                    if (Math.random() > 0.3) {
                        ctx.fillStyle = Math.random() > 0.95 ? '#ffff00' : '#3f3f7a';
                        ctx.fillRect(x + 2, y + 2, 4, 6);
                    }
                }
            }
        });
    }

    draw();
}


function changeTheme(theme) {
    const themeStyle = document.getElementById("theme-style");
    stopAllAnimations();

    // Only change the stylesheet if the theme is valid
    if (AVAILABLE_THEMES.includes(theme)) {
        themeStyle.href = `Themes/${theme}/style.css`;
        // Save the valid theme
        localStorage.setItem('selectedTheme', theme);
    }

    // Start animations for specific themes
    if (theme === "Hacker") {
        setTimeout(startHackerAnimation, 50);
    } else if (theme === "Cyberpunk") {
        setTimeout(startCyberpunkAnimation, 50);
    }
}


async function populateThemes() {
    const themeSelect = document.getElementById('theme-select');
        if (!themeSelect.childElementCount) {
        AVAILABLE_THEMES.forEach(theme => {
            const option = document.createElement('option');
            option.value = theme;
            option.textContent = theme;
            themeSelect.appendChild(option);
        });
    }
}


function initializeTheme() {
    const savedTheme = localStorage.getItem('selectedTheme');
    const themeSelect = document.getElementById('theme-select');
    
    populateThemes().then(() => {
        let initialTheme = savedTheme;
        // If the saved theme is no longer valid, default to Forest
        if (!AVAILABLE_THEMES.includes(initialTheme)) {
            initialTheme = "Forest";
        }
        
        if (themeSelect) {
            themeSelect.value = initialTheme;
        }
        
        changeTheme(initialTheme);
    });
}



document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();

    const absurditySlider = document.getElementById('absurdity-level');
    const absurdityValue = document.getElementById('absurdity-value');

    if (absurditySlider && absurdityValue) {
        absurditySlider.addEventListener('input', () => {
            absurdityValue.textContent = absurditySlider.value;
        });
    }
});
