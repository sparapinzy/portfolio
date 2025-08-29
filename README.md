📖 Ariadna Arranz Portfolio — README
🚀 Overview
This portfolio site displays your artworks in three JSON-powered carousels:

Home (index.html) → Featured works
Latest (latest.html) → Latest 5 works by year
Archive (archive.html) → All works
All artwork data is stored in artworks.json, so you never need to edit HTML when adding or removing works.

📂 Project Structure
python
Copy code
project/
│
├── index.html        # Homepage — Featured carousel
├── latest.html       # Latest 5 works carousel
├── archive.html      # All works carousel
├── contact.html      # Contact page
├── css/
│   └── style.css     # All site styles (light/dark mode, carousel, etc.)
├── js/
│   └── script.js     # Carousel logic, theme toggle, footer dates
├── images/           # Artwork images, logo, favicon
├── artworks.json     # Artwork data
└── README.md         # This file
🖼 Adding New Artworks
All artworks are stored in artworks.json as an array of objects.

Example entry:

json
Copy code
{
  "title": "Hand-Foot",
  "year": 2025,
  "medium": "Oil on canvas",
  "size": "50 × 70 cm",
  "image": "images/handfoot.JPG",
  "featured": true
}
Field meanings:
title → Artwork name.
year → Year of creation (used for "Latest" sorting).
medium → Medium used (e.g., "Oil on canvas").
size (optional) → Dimensions (e.g., "50 × 70 cm").
image → Path to the image file.
featured → true if you want it on the homepage carousel.
📌 How Carousels Decide What to Show
Home (Featured) → Only artworks with "featured": true.
Latest → Top 5 artworks sorted by year (highest first).
Archive → All artworks sorted by year (highest first).
🎨 Caption Format
If "size" is included:

scss
Copy code
Title — Medium — Size — Year
If "size" is missing:

scss
Copy code
Title — Medium — Year
🌓 Light/Dark Mode
Theme toggle button switches between light and dark mode.
Theme preference is saved in localStorage.
Logo swaps between logo-light.svg and logo-dark.svg.
⏯ Carousel Controls
Prev / Next → Navigate artworks manually.
Pause/Play → Stops/starts auto-sliding (4s interval).
💻 Running Locally
Because the site uses fetch() to load artworks.json,

you must run a local server — opening index.html directly will not work in most browsers.

Option 1 — Python
bash
Copy code
cd project
python -m http.server
Then visit:

http://localhost:8000

Option 2 — VSCode Live Server
Install the Live Server extension.
Right-click index.html → "Open with Live Server".
🌐 Deploying Online
You can host this site on:

GitHub Pages
Netlify
Vercel
Any static web hosting service
Just upload the whole project folder — no backend is needed.

🛠 Quick Maintenance Guide
Add new work → Add to artworks.json (set "featured": true if you want it on the homepage).
Change order in Latest → Update year to reflect recency.
Remove work → Delete from artworks.json.
Change captions → Edit fields in artworks.json.
Change theme colors → Edit variables in css/style.css.
