/* ============================================================
   Vindex Software — interactions
   ============================================================ */

/* ---- Nav: shadow on scroll ---- */
const nav = document.getElementById('nav');
function onScroll() {
  nav.classList.toggle('scrolled', window.scrollY > 24);
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---- Mobile menu ---- */
(function () {
  const toggle = document.getElementById('nav-toggle');
  const menu = document.getElementById('mobile-menu');
  if (!toggle || !menu) return;

  function setOpen(open) {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    menu.hidden = !open;
  }

  toggle.addEventListener('click', function () {
    setOpen(toggle.getAttribute('aria-expanded') !== 'true');
  });

  // Close when a link is tapped
  menu.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () { setOpen(false); });
  });

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggle.focus();
    }
  });
}());

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
  }, { threshold: 0.12 });
  reveals.forEach(function (el) { observer.observe(el); });
}

/* ---- Screenshot sliders ---- */
document.querySelectorAll('.slider-dot').forEach(function (dot) {
  dot.addEventListener('click', function () {
    const trackId = dot.dataset.track;
    const index = parseInt(dot.dataset.index, 10);
    const track = document.getElementById(trackId);
    if (!track) return;

    track.querySelectorAll('.screenshot-slide').forEach(function (slide, i) {
      slide.classList.toggle('active', i === index);
    });
    const dotsContainer = dot.closest('.slider-dots');
    dotsContainer.querySelectorAll('.slider-dot').forEach(function (d, i) {
      d.classList.toggle('active', i === index);
    });
  });
});

/* ---- Auto-advance VredeVeranda slider ---- */
(function () {
  if (reduceMotion) return;
  const trackId = 'vv-track';
  const track = document.getElementById(trackId);
  if (!track) return;

  let current = 0;
  const slides = track.querySelectorAll('.screenshot-slide');
  const dots = document.querySelectorAll('[data-track="' + trackId + '"]');

  setInterval(function () {
    current = (current + 1) % slides.length;
    slides.forEach(function (slide, i) { slide.classList.toggle('active', i === current); });
    dots.forEach(function (dot, i) { dot.classList.toggle('active', i === current); });
  }, 3500);
}());

/* ---- Contact form → opens email client pre-filled (no backend needed) ---- */
(function () {
  const form = document.getElementById('contact-form');
  if (!form) return;
  const note = document.getElementById('form-note');
  const EMAIL = 'hello@vindex.software';

  function fieldEl(input) { return input.closest('.field'); }

  function ensureError(field) {
    let err = field.querySelector('.err');
    if (!err) {
      err = document.createElement('span');
      err.className = 'err';
      field.appendChild(err);
    }
    return err;
  }

  function validate(input, message) {
    const field = fieldEl(input);
    const valid = input.checkValidity() && input.value.trim() !== '';
    field.classList.toggle('invalid', !valid);
    ensureError(field).textContent = valid ? '' : message;
    return valid;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = form.elements.name;
    const email = form.elements.email;
    const type = form.elements.type;
    const message = form.elements.message;

    const okName = validate(name, 'Please tell us your name.');
    const okEmail = validate(email, 'Please enter a valid email address.');
    const okMsg = validate(message, 'Please add a few details about your project.');

    if (!(okName && okEmail && okMsg)) {
      const firstInvalid = form.querySelector('.field.invalid input, .field.invalid textarea');
      if (firstInvalid) firstInvalid.focus();
      note.classList.remove('ok');
      note.textContent = 'Please fill in the highlighted fields.';
      return;
    }

    const subject = 'New project enquiry — ' + type.value;
    const body =
      'Name: ' + name.value + '\n' +
      'Email: ' + email.value + '\n' +
      'Looking for: ' + type.value + '\n\n' +
      message.value + '\n';

    window.location.href =
      'mailto:' + EMAIL +
      '?subject=' + encodeURIComponent(subject) +
      '&body=' + encodeURIComponent(body);

    note.classList.add('ok');
    note.textContent = 'Opening your email app… if nothing happens, email us at ' + EMAIL;
  });

  // Clear error state as the user fixes a field
  ['name', 'email', 'message'].forEach(function (n) {
    const input = form.elements[n];
    input.addEventListener('input', function () {
      const field = fieldEl(input);
      if (field.classList.contains('invalid') && input.value.trim() !== '') {
        field.classList.remove('invalid');
        const err = field.querySelector('.err');
        if (err) err.textContent = '';
      }
    });
  });
}());
