/* ── Nav scroll ───────────────────────── */
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ── Shield draw animation ────────────── */
const shield = document.getElementById('shield-svg');
if (shield) {
    // Draw the shield path
    const paths = shield.querySelectorAll('.draw-path');
    paths.forEach(p => {
        const len = p.getTotalLength ? p.getTotalLength() : 300;
        p.style.strokeDasharray = len;
        p.style.strokeDashoffset = len;
        p.style.transition = `stroke-dashoffset 1.4s cubic-bezier(.4,0,.2,1) ${p.dataset.delay || '0'}s`;
    });

    setTimeout(() => {
        shield.classList.add('visible');
        paths.forEach(p => { p.style.strokeDashoffset = '0'; });
    }, 200);
}

/* ── Scroll reveal ────────────────────── */
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('in-view');
            io.unobserve(e.target);
        }
    });
}, { threshold: 0.12 });
reveals.forEach(el => io.observe(el));

/* ── Email form ───────────────────────── */
const form = document.getElementById('contact-form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = form.querySelector('.email-input').value;
        if (!email) return;
        const btn = form.querySelector('.btn-primary');
        btn.textContent = 'Sent — we\'ll be in touch';
        btn.style.background = '#1f5c3a';
        btn.disabled = true;
    });
}