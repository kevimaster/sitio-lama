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
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  document.addEventListener('click', e => {
    if (!nav.contains(e.target)) {
      links.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
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
// Solución provisional: el sitio no tiene todavía un servicio que reciba los
// formularios. Antes, el envío se cancelaba y se mostraba "Mensaje enviado"
// sin que el mensaje saliera. Ahora se abre el programa de correo del
// visitante con el mensaje redactado y se le indica el correo de respaldo.
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const to = (form.getAttribute('action') || '').replace(/^mailto:/, '');
    const data = new FormData(form);
    const esComunidad = !!form.querySelector('[name="perfil"]');
    const asunto = esComunidad
      ? 'Solicitud de acceso a la comunidad LAMA'
      : 'Contacto LAMA: ' + (data.get('motivo') || 'mensaje');
    const lineas = [];
    data.forEach((v, k) => { if (String(v).trim()) lineas.push(k + ': ' + v); });
    window.location.href = 'mailto:' + to + '?subject=' + encodeURIComponent(asunto) +
      '&body=' + encodeURIComponent(lineas.join('\n'));
    let aviso = form.querySelector('.form-aviso');
    if (!aviso) {
      aviso = document.createElement('p');
      aviso.className = 'form-aviso';
      aviso.setAttribute('role', 'status');
      aviso.style.cssText = 'margin-top:1rem;font-size:.9rem;text-align:center';
      form.appendChild(aviso);
    }
    aviso.innerHTML = 'Abrimos tu programa de correo con el mensaje listo: solo falta que lo envíes. ' +
      'Si no se abrió, escríbenos a <a href="mailto:' + to + '">' + to + '</a>.';
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
