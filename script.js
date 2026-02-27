// Back to Top – 클릭 시 상단으로 부드럽게 스크롤 (HTML scroll-behavior로도 동작)
document.querySelector('.back-to-top').addEventListener('click', function (e) {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
