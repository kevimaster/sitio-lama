/* LAMA — main.js */

// ── NAV scroll shadow ──────────────────────────────
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Mobile toggle ──────────────────────────────────
const toggle = document.getElementById('navToggle');
const links  = document.getElementById('navLinks');
if (toggle && links) {
  toggle.addEventListener('click', () => links.classList.toggle('open'));
  document.addEventListener('click', e => {
    if (!nav.contains(e.target)) links.classList.remove('open');
  });
}

// ── Reveal on scroll (all types) ───────────────────
const selectors = '.reveal, .reveal-left, .reveal-right, .reveal-scale';
const revealEls = document.querySelectorAll(selectors);
const io = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('on'); io.unobserve(e.target); }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => io.observe(el));

// ── Filter tabs (Artefactos) ───────────────────────
const tabs  = document.querySelectorAll('.filter-tab');
const cards = document.querySelectorAll('[data-cat]');
tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const cat = tab.dataset.filter;
    cards.forEach(c => {
      c.style.display = (cat === 'all' || c.dataset.cat === cat) ? '' : 'none';
    });
  });
});

// ── Contact / community form ───────────────────────
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    btn.textContent = '✓ Mensaje enviado';
    btn.disabled = true;
    btn.style.background = '#70A309';
    setTimeout(() => {
      form.reset();
      btn.textContent = 'Enviar mensaje';
      btn.disabled = false;
      btn.style.background = '';
    }, 4000);
  });
}

// ── Active nav link ────────────────────────────────
const currentPage = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav-links a').forEach(a => {
  if (a.getAttribute('href') === currentPage) a.classList.add('active');
});

// ── Smooth details toggle ─────────────────────────
document.querySelectorAll('details').forEach(d => {
  d.addEventListener('toggle', () => {
    const plus = d.querySelector('summary span:last-child');
    if (plus) plus.textContent = d.open ? '−' : '+';
  });
});
