// Back to Top – 클릭 시 상단으로 부드럽게 스크롤 (HTML scroll-behavior로도 동작)
document.querySelector('.back-to-top').addEventListener('click', function (e) {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const nav = document.querySelector('.nav');

if (hamburger && nav) {
  hamburger.addEventListener('click', function () {
    this.classList.toggle('active');
    nav.classList.toggle('active');
  });

  // Close menu when a link is clicked
  document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      nav.classList.remove('active');
    });
  });
}

// ==== Dynamic Image Grid Rendering ====
document.addEventListener("DOMContentLoaded", async () => {
  const gridContainer = document.getElementById('portfolio-grid');

  if (gridContainer) {
    try {
      // In a static server environment without an API, we can fetch the directory listing
      // Note: This relies on the server allowing directory indexing (like Python's http.server)
      // or we can hardcode an array if the server doesn't support it.
      // We will try fetching the raw text of the /images/ directory and parsing it.
      const response = await fetch('/images/');
      const htmlText = await response.text();

      // Simple regex to find href links to .webp or .jpg images
      const imgRegex = /href="([^"]+\.(?:webp|jpg|jpeg|png|gif))"/gi;
      let match;
      const imagesList = [];

      while ((match = imgRegex.parse(htmlText)) !== null) {
        imagesList.push(match[1]);
      }

      // Fallback manual list just in case directory listing fails on production (GitHub Pages)
      // GitHub pages does NOT allow directory indexing. We must provide a static list or build step.
      // Since this is static HTML, we define the known prefixes here for simplicity:
      // A better approach for purely static sites is to define an array of objects.

      const hardcodedFallbacks = [
        "kulili_green_orbit.webp",
        "kulili_wild_roadtrip.webp",
        "kulili_azure_dive.webp",
        "kulili_window_voyage.webp",  // Assuming these exist, we'll verify next step
        "kulili_midnight_vessel.webp",
        "kulili_geometry_float.webp",
        "kulili_yellow_dimension.webp",
        "kulili_ocean_embrace.webp"
      ];

      // To handle GitHub Pages static nature properly, we will use a dedicated JSON file 
      // or array. Let's fetch from a JSON file we will create next.
      const res = await fetch('/images.json').catch(() => null);
      let finalImages = [];

      if (res && res.ok) {
        finalImages = await res.json();
      } else {
        // Use hardcoded if JSON fetch fails
        finalImages = hardcodedFallbacks;
      }

      // Filter for 'kulili_' prefix
      const targetImages = finalImages.filter(img => img.startsWith('kulili_'));

      // Render to DOM
      targetImages.forEach((imgSrc, index) => {
        const anchor = document.createElement('a');
        anchor.href = 'project.html';
        anchor.className = 'grid-item';

        const img = document.createElement('img');
        img.src = `images/${imgSrc}`;
        img.alt = `작품 ${index + 1}`;
        img.loading = 'lazy'; // Good practice for grids

        anchor.appendChild(img);
        gridContainer.appendChild(anchor);
      });

    } catch (error) {
      console.error("Error loading images for the grid:", error);
    }
  }
});
