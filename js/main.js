// Meniu mobil
const burger = document.querySelector('.burger');
const nav = document.querySelector('.nav');
if (burger && nav) burger.addEventListener('click', () => nav.classList.toggle('open'));

// Lightbox galerie
const lb = document.querySelector('.lightbox');
if (lb) {
  const img = lb.querySelector('img');
  document.querySelectorAll('.gallery a[href]').forEach(a => a.addEventListener('click', ev => {
    ev.preventDefault();
    img.src = a.getAttribute('href');
    lb.classList.add('open');
  }));
  lb.addEventListener('click', ev => { if (ev.target !== img) lb.classList.remove('open'); });
  document.addEventListener('keydown', ev => { if (ev.key === 'Escape') lb.classList.remove('open'); });
}

document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

// Previzualizare logo: index.html?logo=07 afișează varianta 07 din logo-uri.html (doar pentru alegerea logo-ului)
const logoCode = new URLSearchParams(location.search).get('logo');
if (/^\d{2}$/.test(logoCode || '')) {
  const swap = (sel, file) => fetch(file).then(r => r.ok ? r.text() : null).then(svg => {
    if (svg) document.querySelectorAll(sel).forEach(el => el.innerHTML = svg);
  });
  swap('.header .logo', `logo/svg/logo-${logoCode}.svg`);
  swap('.footer .logo', `logo/svg/logo-${logoCode}-alb.svg`);
  document.querySelectorAll('a[href$=".html"], a[href*=".html#"]').forEach(a => {
    const [page, hash] = a.getAttribute('href').split('#');
    a.setAttribute('href', `${page}?logo=${logoCode}${hash ? '#' + hash : ''}`);
  });
}
