let artworks = [];
let currentIndex = 0;

fetch('artworks.json')
  .then(res => res.json())
  .then(data => {
    artworks = data.sort((a, b) => b.year - a.year);

    const gallery = document.getElementById('gallery');

    artworks.forEach((art, index) => {
      const item = document.createElement('div');
      item.classList.add('gallery-item');

      item.innerHTML = `
        <img src="${art.image}" alt="${art.title}">
        <div class="caption">
          <strong>${art.title}</strong> (${art.year})<br>
          <small>${art.medium}${art.size ? ` — ${art.size}` : ''}</small>
        </div>
      `;

      // Open lightbox on click
      item.addEventListener('click', () => {
        openLightbox(index);
      });

      gallery.appendChild(item);
    });
  })
  .catch(err => console.error('Error loading artworks:', err));

// Lightbox elements
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');

function openLightbox(index) {
  currentIndex = index;
  updateLightbox();
  lightbox.style.display = 'flex';
}

function closeLightbox() {
  lightbox.style.display = 'none';
}

function showPrev() {
  currentIndex = (currentIndex - 1 + artworks.length) % artworks.length;
  updateLightbox();
}

function showNext() {
  currentIndex = (currentIndex + 1) % artworks.length;
  updateLightbox();
}

function updateLightbox() {
  const art = artworks[currentIndex];
  lightboxImg.src = art.image;
  lightboxCaption.innerHTML = `
    <strong>${art.title}</strong> (${art.year})<br>
    <small>${art.medium}${art.size ? ` — ${art.size}` : ''}</small>
  `;
}

// Event listeners
lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', showPrev);
lightboxNext.addEventListener('click', showNext);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

// Keyboard navigation for lightbox
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightbox();
  } else if (e.key === 'ArrowLeft') {
    showPrev();
  } else if (e.key === 'ArrowRight') {
    showNext();
  }
});

/* =============================
   NEW: TOUCH SWIPE FUNCTIONALITY FOR LIGHTBOX
   ============================= */
let startX = 0;
let endX = 0;

lightbox.addEventListener('touchstart', (e) => {
  startX = e.touches[0].clientX;
});

lightbox.addEventListener('touchend', (e) => {
  endX = e.changedTouches[0].clientX;
  const diff = startX - endX;

  if (Math.abs(diff) > 50) { // Minimum swipe distance
    if (diff > 0) {
      showNext(); // swipe left → next
    } else {
      showPrev(); // swipe right → prev
    }
  }
});

// Footer dates
document.getElementById('current-year').textContent = new Date().getFullYear();
document.getElementById('last-updated').textContent = new Date(document.lastModified).toLocaleDateString();

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