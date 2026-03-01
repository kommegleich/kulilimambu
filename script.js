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
      // Fetch the auto-generated JSON list of images
      const res = await fetch('/images.json');

      if (!res.ok) {
        throw new Error(`Failed to fetch images.json: ${res.status} ${res.statusText}`);
      }

      const finalImages = await res.json();

      // Render to DOM
      finalImages.forEach((imgSrc, index) => {
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
