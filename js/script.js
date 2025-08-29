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
  const slides = slidesContainer.querySelectorAll('figure');

  // Don't run if no slides
  if (slides.length === 0) return;

  const nextBtn = carousel.querySelector('.next');
  const prevBtn = carousel.querySelector('.prev');

  let current = 0;
  let paused = false;
  let interval = setInterval(next, 4000);

  nextBtn.addEventListener('click', () => { next(); reset(); });
  prevBtn.addEventListener('click', () => { prev(); reset(); });

  // Pause/Play button
  const pauseBtn = document.createElement('button');
  pauseBtn.id = 'pause-carousel';
  pauseBtn.classList.add('btn');
  pauseBtn.textContent = '⏸';
  carousel.appendChild(pauseBtn);

  console.log("Pause button created");

  pauseBtn.addEventListener('click', () => {
    if (paused) {
      interval = setInterval(next, 3000);
      pauseBtn.textContent = '⏸';
    } else {
      clearInterval(interval);
      pauseBtn.textContent = '▶';
    }
    paused = !paused;
  });

  function next() {
    current = (current + 1) % slides.length;
    update();
  }

  function prev() {
    current = (current - 1 + slides.length) % slides.length;
    update();
  }

  function update() {
    slidesContainer.style.transform = `translateX(-${current * 100}%)`;
  }

  function reset() {
    if (!paused) {
      clearInterval(interval);
      interval = setInterval(next, 4000);
    }
  }
  
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