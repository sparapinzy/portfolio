/* ============================= */
/* CAROUSEL FUNCTIONALITY */
/* ============================= */
let currentSlide = 0;
const slides = document.querySelector('.slides');
const totalSlides = document.querySelectorAll('.slides figure').length;
let slideInterval = setInterval(nextSlide, 4000); // Auto-slide every 4s

document.querySelector('.next').addEventListener('click', () => {
    nextSlide();
    resetInterval();
});

document.querySelector('.prev').addEventListener('click', () => {
    prevSlide();
    resetInterval();
});

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
}

function updateCarousel() {
    slides.style.transform = `translateX(-${currentSlide * 100}%)`;
}

function resetInterval() {
    clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 4000);
}

/* ============================= */
/* THEME TOGGLE + LOGO SWAP */
/* ============================= */
const themeToggle = document.getElementById('theme-toggle');
const siteLogo = document.getElementById('site-logo');

// Helper function for smooth logo fade swap
function switchLogo(newSrc) {
    siteLogo.style.opacity = 0;
    setTimeout(() => {
        siteLogo.src = newSrc;
        siteLogo.style.opacity = 1;
    }, 200); // fade out for 0.2s, then swap
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');

        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('theme', 'dark');
            themeToggle.textContent = '☀️';
            switchLogo('images/logo-dark.png');
        } else {
            localStorage.setItem('theme', 'light');
            themeToggle.textContent = '🌙';
            switchLogo('images/logo-light.png');
        }
    });

    // Load saved theme preference on page load
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
        siteLogo.src = 'images/logo-dark.png';
    } else {
        siteLogo.src = 'images/logo-light.png';
    }
}