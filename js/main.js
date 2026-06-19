/* ============================================
   Vindex Software – interactions
   ============================================ */

/* ---- Nav: solid background after scroll ---- */
const nav = document.getElementById('nav');
function onScroll() {
  if (window.scrollY > 40) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---- Reveal elements on scroll ---- */
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
  }, { threshold: 0.12 });
  reveals.forEach(function (el) { observer.observe(el); });
}

/* ---- Contact form ---- */
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const input = form.querySelector('input');
    const button = form.querySelector('button');
    if (!input.value) return;
    button.textContent = "Sent – we'll be in touch";
    button.classList.add('sent');
    button.disabled = true;
    // TODO: hook this up to your email service / backend here.
  });
}
