/* ============================= */
/* CAROUSEL FUNCTIONALITY */
/* ============================= */

// Cache DOM elements
const slidesContainer = document.querySelector('.slides');
const slideFigures = document.querySelectorAll('.slides figure');
const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
const logoLight = 'images/logo-light.svg';
const logoDark = 'images/logo-dark.svg';

let currentSlide = 0;
const totalSlides = slideFigures.length;
let slideInterval = setInterval(nextSlide, 4000); // Auto-slide every 4s

// Event listeners
nextBtn.addEventListener('click', () => {
    nextSlide();
    resetInterval();
});

prevBtn.addEventListener('click', () => {
    prevSlide();
    resetInterval();
});

// Next slide
function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

// Previous slide
function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

// Update carousel position
function updateCarousel() {
    slidesContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
}

// Reset auto-slide timer
function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 4000);
}

/* ============================= */
/* THEME TOGGLE + LOGO SWAP */
/* ============================= */

const themeToggle = document.getElementById('theme-toggle');
const siteLogo = document.getElementById('site-logo');

// Smooth logo fade swap
function switchLogo(newSrc) {
    siteLogo.style.opacity = 0;
    setTimeout(() => {
        siteLogo.src = newSrc;
        siteLogo.style.opacity = 1;
    }, 200); // fade out for 0.2s, then swap
}

// Theme toggle functionality
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');

        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.textContent = '☀️';
            switchLogo(logoDark);
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.textContent = '🌙';
            switchLogo(logoLight);
        }
    });

    // Load saved theme preference on page load
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
        siteLogo.src = logoDark;
    } else {
        siteLogo.src = logoLight;
    }
}

/* ============================= */
/* GOOGLE FONTS TOGGLE */
/* ============================= */

function setGoogleFont(fontName) {
    // Remove any previously loaded Google Fonts
    document.querySelectorAll('link[data-google-font]').forEach(link => link.remove());

    // Create and append Google Fonts link
    const link = document.createElement('link');
    link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(/ /g, '+')}:wght@400;700&display=swap`;
    link.rel = 'stylesheet';
    link.setAttribute('data-google-font', fontName);
    document.head.appendChild(link);

    // Apply font to CSS variable
    document.documentElement.style.setProperty('--font-family', `'${fontName}', sans-serif`);
}

function useSystemFont() {
    // Remove any loaded Google Fonts
    document.querySelectorAll('link[data-google-font]').forEach(link => link.remove());

    // Reset to system sans-serif font stack
    //document.documentElement.style.setProperty('--font-family', '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif');

    // Reset to system monospace font stack
    document.documentElement.style.setProperty(
        '--font-family',
        'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
    );
}

/* ============================= */
/* CHOOSE YOUR FONT MODE HERE */
/* ============================= */

// Option 1: Use Google Font
//setGoogleFont('Montserrat');

// Option 2: Use system fonts (super fast)
useSystemFont();