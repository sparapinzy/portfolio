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

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightbox();
  } else if (e.key === 'ArrowLeft') {
    showPrev();
  } else if (e.key === 'ArrowRight') {
    showNext();
  }
});

// Footer dates
document.getElementById('current-year').textContent = new Date().getFullYear();
document.getElementById('last-updated').textContent = new Date(document.lastModified).toLocaleDateString();