let artworks = [];
let projects = {};

fetch('artworks.json')
  .then(res => res.json())
  .then(data => {
    artworks = data.sort((a, b) => b.year - a.year);

    // Group artworks by project
    artworks.forEach(art => {
      const projectName = art.project || 'Work';
      if (!projects[projectName]) {
        projects[projectName] = [];
      }
      projects[projectName].push(art);
    });

    // Display projects on archive page
    const projectsGrid = document.getElementById('projects-grid');
    if (projectsGrid) {
      Object.keys(projects).sort().forEach(projectName => {
        const projectArtworks = projects[projectName];
        const previewImage = projectArtworks[0].image; // Use first image as preview
        
        const projectCard = document.createElement('a');
        const projectSlug = projectName.toLowerCase().replace(/\s+/g, '-');
        projectCard.href = `project-${projectSlug}.html`;
        projectCard.classList.add('project-card');
        
        projectCard.innerHTML = `
          <img src="${previewImage}" alt="${projectName}" class="project-card-image">
          <div class="project-card-info">
            <h3 class="project-card-title">${projectName}</h3>
          </div>
        `;
        
        projectsGrid.appendChild(projectCard);
      });
    }

    // Display artworks in gallery (for project pages)
    const gallery = document.getElementById('gallery');
    if (gallery) {
      const projectName = getProjectNameFromURL();
      const projectArtworks = projects[projectName] || [];
      
      projectArtworks.forEach((art, index) => {
        const item = document.createElement('div');
        item.classList.add('gallery-item');

        item.innerHTML = `
          <img src="${art.image}" alt="${art.title}">
          <div class="caption">
            <strong>${art.title}</strong> (${art.year})<br>
            <small>${art.medium}${art.size ? ` — ${art.size}` : ''}</small>
          </div>
        `;

        item.addEventListener('click', () => {
          openLightbox(projectArtworks, index);
        });

        gallery.appendChild(item);
      });
    }
  })
  .catch(err => console.error('Error loading artworks:', err));

function getProjectNameFromURL() {
  const url = window.location.pathname;
  const match = url.match(/project-([^.]+)\.html/);
  if (match) {
    const projectSlug = match[1];
    // Handle special cases
    if (projectSlug === 'empty-spaces') {
      return 'Empty spaces';
    }
    if (projectSlug === 'loose-works') {
      return 'Loose Works';
    }
    // Convert slug to project name
    return projectSlug.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  }
  return null;
}

// Lightbox elements
const lightbox = document.getElementById('lightbox');
let currentArtworks = [];
let currentIndex = 0;

if (lightbox) {
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.querySelector('.lightbox-close');
  const lightboxPrev = document.querySelector('.lightbox-prev');
  const lightboxNext = document.querySelector('.lightbox-next');

  function openLightbox(artworks, index) {
    currentArtworks = artworks;
    currentIndex = index;
    updateLightbox();
    lightbox.style.display = 'flex';
  }

  function closeLightbox() {
    lightbox.style.display = 'none';
  }

  function showPrev() {
    currentIndex = (currentIndex - 1 + currentArtworks.length) % currentArtworks.length;
    updateLightbox();
  }

  function showNext() {
    currentIndex = (currentIndex + 1) % currentArtworks.length;
    updateLightbox();
  }

  function updateLightbox() {
    if (currentArtworks.length === 0) return;
    const art = currentArtworks[currentIndex];
    lightboxImg.src = art.image;
    lightboxCaption.innerHTML = `
      <strong>${art.title}</strong> (${art.year})<br>
      <small>${art.medium}${art.size ? ` — ${art.size}` : ''}</small>
    `;
  }

  // Event listeners
  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }
  if (lightboxPrev) {
    lightboxPrev.addEventListener('click', showPrev);
  }
  if (lightboxNext) {
    lightboxNext.addEventListener('click', showNext);
  }

  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Keyboard navigation for lightbox
  document.addEventListener('keydown', (e) => {
    if (lightbox.style.display === 'flex') {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        showPrev();
      } else if (e.key === 'ArrowRight') {
        showNext();
      }
    }
  });

  // Touch swipe functionality for lightbox
  let startX = 0;
  let endX = 0;

  lightbox.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
  });

  lightbox.addEventListener('touchend', (e) => {
    endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        showNext();
      } else {
        showPrev();
      }
    }
  });
}

// Footer dates
const yearEl = document.getElementById('current-year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

const lastUpdatedEl = document.getElementById('last-updated');
if (lastUpdatedEl) {
  lastUpdatedEl.textContent = new Date(document.lastModified).toLocaleDateString();
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
