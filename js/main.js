/* ============================================
   Vindex Software – interactions
   ============================================ */

/* ---- Nav: shadow on scroll ---- */
const nav = document.getElementById('nav');
function onScroll() {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---- Reveal on scroll ---- */
const reveals = document.querySelectorAll('.reveal');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (reduceMotion || !('IntersectionObserver' in window)) {
  reveals.forEach(function (el) { el.classList.add('is-visible'); });
} else {
  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(function (el) { observer.observe(el); });
}

/* ---- Screenshot sliders ---- */
document.querySelectorAll('.slider-dot').forEach(function (dot) {
  dot.addEventListener('click', function () {
    var trackId = dot.dataset.track;
    var index = parseInt(dot.dataset.index, 10);
    var track = document.getElementById(trackId);
    if (!track) return;

    track.querySelectorAll('.screenshot-slide').forEach(function (slide, i) {
      slide.classList.toggle('active', i === index);
    });

    var dotsContainer = dot.closest('.slider-dots');
    dotsContainer.querySelectorAll('.slider-dot').forEach(function (d, i) {
      d.classList.toggle('active', i === index);
    });
  });
});

/* ---- Auto-advance VredeVeranda slider every 3s ---- */
(function () {
  var trackId = 'vv-track';
  var track = document.getElementById(trackId);
  if (!track) return;

  var current = 0;
  var slides = track.querySelectorAll('.screenshot-slide');
  var dots = document.querySelectorAll('[data-track="' + trackId + '"]');

  setInterval(function () {
    current = (current + 1) % slides.length;
    slides.forEach(function (slide, i) {
      slide.classList.toggle('active', i === current);
    });
    dots.forEach(function (dot, i) {
      dot.classList.toggle('active', i === current);
    });
  }, 3000);
}());
