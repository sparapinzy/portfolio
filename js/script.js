/* =============================
   LOAD CAROUSELS FROM artworks.json
   ============================= */
fetch('artworks.json')
  .then(res => res.json())
  .then(data => {
    // Homepage - Featured works
    if (document.getElementById('featured-carousel')) {
      data.filter(a => a.featured).forEach(a => addSlide('featured-carousel', a));
      initCarousel('featured-carousel');
    }

    // Latest Works - newest 5
    if (document.getElementById('latest-carousel')) {
      data.sort((a, b) => b.year - a.year)
          .slice(0, 5)
          .forEach(a => addSlide('latest-carousel', a));
      initCarousel('latest-carousel');
    }

    // Archive - all works
    if (document.getElementById('all-carousel')) {
      data.sort((a, b) => b.year - a.year)
          .forEach(a => addSlide('all-carousel', a));
      initCarousel('all-carousel');
    }
  })
  .catch(err => console.error('Error loading artworks:', err));

/* =============================
   ADD SLIDE HELPER (with size support)
   ============================= */
function addSlide(id, art) {
  const container = document.getElementById(id);
  const fig = document.createElement('figure');

  // Build caption string
  let caption = `${art.title} — ${art.medium}`;
  if (art.size) caption += ` — ${art.size}`;
  caption += ` — ${art.year}`;

  fig.innerHTML = `
    <img src="${art.image}" alt="${caption}">
    <figcaption>${caption}</figcaption>
  `;
  container.appendChild(fig);
}

/* =============================
   CAROUSEL FUNCTIONALITY
   ============================= */
function initCarousel(id) {
  const slidesContainer = document.getElementById(id);
  const carousel = slidesContainer.closest('.carousel');
  let slides = slidesContainer.querySelectorAll('figure');

  if (slides.length === 0) return;

  // Clone first and last slides for smooth looping
  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);

  firstClone.id = 'first-clone';
  lastClone.id = 'last-clone';

  slidesContainer.appendChild(firstClone);
  slidesContainer.insertBefore(lastClone, slides[0]);

  slides = slidesContainer.querySelectorAll('figure');

  let current = 1; // Start at first real slide
  const size = slides[current].clientWidth;

  slidesContainer.style.transform = `translateX(${-size * current}px)`;

  const nextBtn = carousel.querySelector('.next');
  const prevBtn = carousel.querySelector('.prev');
  const pauseBtn = document.getElementById('pause-carousel');

  let paused = false;
  let interval = setInterval(next, 4000);

  function next() {
    if (current >= slides.length - 1) return;
    current++;
    slidesContainer.style.transition = "transform 0.5s ease-in-out";
    slidesContainer.style.transform = `translateX(${-size * current}px)`;
  }

  function prev() {
    if (current <= 0) return;
    current--;
    slidesContainer.style.transition = "transform 0.5s ease-in-out";
    slidesContainer.style.transform = `translateX(${-size * current}px)`;
  }

  slidesContainer.addEventListener('transitionend', () => {
    if (slides[current].id === 'first-clone') {
      slidesContainer.style.transition = "none";
      current = 1;
      slidesContainer.style.transform = `translateX(${-size * current}px)`;
    }
    if (slides[current].id === 'last-clone') {
      slidesContainer.style.transition = "none";
      current = slides.length - 2;
      slidesContainer.style.transform = `translateX(${-size * current}px)`;
    }
  });

  nextBtn.addEventListener('click', () => { next(); reset(); });
  prevBtn.addEventListener('click', () => { prev(); reset(); });

  pauseBtn.addEventListener('click', () => {
    if (paused) {
      interval = setInterval(next, 2000);
      pauseBtn.textContent = '⏸';
    } else {
      clearInterval(interval);
      pauseBtn.textContent = '▶';
    }
    paused = !paused;
  });

  function reset() {
    if (!paused) {
      clearInterval(interval);
      interval = setInterval(next, 2000);
    }
  }

  // Handle window resize (recalculate slide width)
  window.addEventListener('resize', () => {
    const newSize = slides[current].clientWidth;
    slidesContainer.style.transition = "none";
    slidesContainer.style.transform = `translateX(${-newSize * current}px)`;
  });
}
/* =============================
   THEME TOGGLE + SUN/MOON ICON
   ============================= */
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const siteLogo = document.getElementById('site-logo');

const sunIcon = `
  <circle cx="12" cy="12" r="5" fill="currentColor"/>
  <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" stroke="currentColor" stroke-width="2"/>
`;

const moonIcon = `
  <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" fill="currentColor"/>
`;

function updateThemeIcon() {
  if (!themeIcon) return;
  if (document.body.classList.contains('dark-mode')) {
    themeIcon.innerHTML = sunIcon;
  } else {
    themeIcon.innerHTML = moonIcon;
  }
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');

    if (document.body.classList.contains('dark-mode')) {
      localStorage.setItem('theme', 'dark');
      if (siteLogo) siteLogo.src = 'images/logo-dark.svg';
    } else {
      localStorage.setItem('theme', 'light');
      if (siteLogo) siteLogo.src = 'images/logo-light.svg';
    }
    updateThemeIcon();
  });

  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    if (siteLogo) siteLogo.src = 'images/logo-dark.svg';
  } else {
    if (siteLogo) siteLogo.src = 'images/logo-light.svg';
  }
  updateThemeIcon();
}

/* =============================
   FOOTER DATE UPDATES
   ============================= */
const yearEl = document.getElementById('current-year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const lastUpdatedEl = document.getElementById('last-updated');
if (lastUpdatedEl) {
  const lastUpdated = new Date(document.lastModified);
  lastUpdatedEl.textContent = lastUpdated.toLocaleDateString();
}