let currentSlide = 0;
const slides = document.querySelector('.slides');
const totalSlides = document.querySelectorAll('.slides figure').length;
let slideInterval = setInterval(nextSlide, 4000); // 4 seconds

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

// Optional: Pause on hover
document.querySelector('.carousel').addEventListener('mouseenter', () => {
    clearInterval(slideInterval);
});
document.querySelector('.carousel').addEventListener('mouseleave', () => {
    slideInterval = setInterval(nextSlide, 4000);
});