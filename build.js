// Generează paginile statice ale site-ului. Rulare: node build.js
// Header, footer și contactul sunt scrise o singură dată aici și copiate în fiecare pagină.
const fs = require('fs');
const path = require('path');
const logos = require('./logos');

const SITE = {
  name: 'Reparații Acoperișuri Urgente',
  domain: 'reparatii-acoperisuri-urgente.ro', // de confirmat după înregistrarea domeniului .ro
  phone: '0754 704 243',
  tel: '+40754704243',
  wa: 'https://wa.me/40754704243?text=' + encodeURIComponent('Bună ziua, am o problemă la acoperiș și v-aș trimite câteva poze.'),
  city: 'Cluj-Napoca, România',
  map: 'https://www.google.com/maps?q=Reparatii+acoperisuri+urgent+cluj&output=embed',
  mapLink: 'https://www.google.com/maps/place/Reparatii+acoperisuri+urgent+cluj/@46.7752214,23.5715653,17z',
};

const I = {
  phone: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/></svg>',
  wa: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.8-.9-2-1-.3-.1-.5-.1-.7.1-.2.3-.8 1-.9 1.2-.2.2-.3.2-.6.1-.3-.1-1.3-.5-2.4-1.5-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6l.4-.5c.2-.2.2-.3.3-.5.1-.2.1-.4 0-.5l-.9-2.2c-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1.1 2.9 1.2 3.1c.1.2 2.1 3.2 5.1 4.5.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.3-.6-.4zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z"/></svg>',
  pin: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s7-6.2 7-12a7 7 0 0 0-14 0c0 5.8 7 12 7 12z"/><circle cx="12" cy="10" r="2.6"/></svg>',
  clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  roof: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M2 12 12 3l10 9"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/></svg>',
  tools: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18v3h3l6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4z"/></svg>',
  beam: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M2 20 12 4l10 16"/><path d="M6 14h12M12 4v16"/></svg>',
  attic: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M3 20 12 5l9 15z"/><rect x="9.5" y="12" width="5" height="5"/></svg>',
  drop: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 3s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/></svg>',
  bolt: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M13 2 4 14h7l-1 8 9-12h-7z"/></svg>',
  shield: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M12 2 4 5v6c0 5 3.4 9.4 8 11 4.6-1.6 8-6 8-11V5z"/><path d="m8.5 12 2.5 2.5 4.5-5"/></svg>',
  gutter: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M3 7h18v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M17 12v9"/></svg>',
  terrace: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M3 9h18v3H3zM5 12v8M19 12v8M3 20h18"/></svg>',
  google: '<svg viewBox="0 0 24 24"><path fill="#4285F4" d="M22.5 12.3c0-.8-.1-1.5-.2-2.2H12v4.2h5.9a5 5 0 0 1-2.2 3.3v2.7h3.5c2.1-1.9 3.3-4.7 3.3-8z"/><path fill="#34A853" d="M12 23c3 0 5.5-1 7.2-2.7l-3.5-2.7c-1 .7-2.2 1.1-3.7 1.1-2.9 0-5.3-1.9-6.2-4.5H2.2v2.8A11 11 0 0 0 12 23z"/><path fill="#FBBC05" d="M5.8 14.2a6.6 6.6 0 0 1 0-4.3V7.1H2.2a11 11 0 0 0 0 9.9z"/><path fill="#EA4335" d="M12 5.4c1.6 0 3.1.6 4.2 1.7l3.1-3.1A11 11 0 0 0 2.2 7.1l3.6 2.8C6.7 7.3 9.1 5.4 12 5.4z"/></svg>',
  play: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M7 4v16l13-8z"/></svg>',
};

// --- servicii (ordinea din meniu) ---
const SERVICES = [
  { slug: 'reparatii-acoperisuri', title: 'Reparații Acoperișuri Urgente', short: 'Reparații Acoperișuri', img: 'g03.jpg', pos: 'center 70%',
    blurb: 'Infiltrații, țigle sparte, tablă desprinsă sau coame deteriorate. Intervenim rapid și oprim pătrunderea apei.' },
  { slug: 'montaj-acoperisuri', title: 'Montaj Acoperișuri', short: 'Montaj Acoperișuri', img: 'g01.jpg', pos: 'center 40%',
    blurb: 'Acoperișuri noi la cheie: structură, folie, șipci, învelitoare din țiglă metalică, ceramică sau tablă și sistem pluvial.' },
  { slug: 'dulgherii-complete', title: 'Dulgherii Complete', short: 'Dulgherii Complete', img: 'g04.jpg', pos: 'left center',
    blurb: 'Căpriori, pane, cosoroabe și astereală. Înlocuim lemnul degradat și consolidăm structura existentă.' },
  { slug: 'mansardari-finisaje', title: 'Mansardări, Finisaje și Alte Reparații', short: 'Mansardări și Finisaje', img: 'g01.jpg', pos: 'right center',
    blurb: 'Mansardări pe structură ușoară, ferestre de mansardă, jgheaburi, parazăpezi și lucrări de finisaj.' },
  { slug: 'hidroizolatii-terase', title: 'Hidroizolații și Terase Cluj', short: 'Hidroizolații și Terase', img: 'g04.jpg', pos: 'right center',
    blurb: 'Hidroizolații cu membrană pentru terase, garaje, balcoane și acoperișuri plate, la case și blocuri.' },
];

const CITIES = ['Cluj-Napoca', 'București', 'Timișoara', 'Arad'];

// Recenzii reale de pe profilul Google (36 de recenzii, 4,8). Doar diacriticele au fost completate.
const REVIEWS = [
  { q: 'Am apelat la această firmă, au fost rapizi. Recomand! Calitate și preț bun!', n: 'Robert Kocsis' },
  { q: 'Recomand cu cea mai mare încredere echipa serioasă.', n: 'Sami Aexi' },
];

// ---------- bucăți comune ----------
const head = (title, desc, slug) => `<!doctype html>
<html lang="ro">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title>
<meta name="description" content="${desc}">
<link rel="canonical" href="https://${SITE.domain}/${slug === 'index' ? '' : slug + '.html'}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:image" content="https://${SITE.domain}/img/g03.jpg">
<meta name="theme-color" content="#0e1a2b">
<link rel="icon" href="logo/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&family=Barlow+Condensed:wght@600;700;800&family=Montserrat:wght@700;800;900&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/style.css">
<script type="application/ld+json">${JSON.stringify({
  '@context': 'https://schema.org', '@type': 'RoofingContractor', name: SITE.name, telephone: SITE.tel,
  address: { '@type': 'PostalAddress', addressLocality: 'Cluj-Napoca', addressCountry: 'RO' },
  areaServed: 'Cluj-Napoca', url: 'https://' + SITE.domain + '/',
  aggregateRating: { '@type': 'AggregateRating', ratingValue: '4.8', reviewCount: '36' },
})}</script>
</head>
<body>`;

const header = active => `
<header class="header"><div class="wrap hd">
  <a class="logo" href="index.html" aria-label="${SITE.name}">${logos.header}</a>
  <div class="hd-right">
  <div class="hd-top">
    <span class="chip"><i>${I.pin}</i>${SITE.city}</span>
    <a class="chip" href="tel:${SITE.tel}"><i>${I.phone}</i><span class="lbl">Telefon:</span> <b>${SITE.phone}</b></a>
    <span class="hd-note"><i class="dot"></i>Evaluare gratuită la fața locului</span>
    <a class="hd-wa" href="${SITE.wa}" target="_blank" rel="noopener">${I.wa} WhatsApp</a>
  </div>
  <div class="hd-bar">
  <button class="burger" aria-label="Meniu"><span></span><span></span><span></span></button>
  <nav class="nav">
    <a href="index.html"${active === 'index' ? ' class="active"' : ''}>Acasă</a>
    <a href="index.html#despre">Despre noi</a>
    <div class="dd"><span${SERVICES.some(s => s.slug === active) && active !== 'hidroizolatii-terase' ? ' class="active"' : ''} tabindex="0">Servicii</span>
      <div class="dd-menu">${SERVICES.map(s => `<a href="${s.slug}.html">${s.short}</a>`).join('')}</div>
    </div>
    <a href="hidroizolatii-terase.html"${active === 'hidroizolatii-terase' ? ' class="active"' : ''}>Terase Cluj</a>
    <a href="galerie.html"${active === 'galerie' ? ' class="active"' : ''}>Galerie</a>
    <a href="#contact">Contact</a>
  </nav>
  <a class="head-call" href="tel:${SITE.tel}"><small>Aveți nevoie de noi? Sunați-ne!</small><b>${SITE.phone}</b></a>
  <a class="btn-cons" href="#contact">Consultanță</a>
  </div>
  </div>
</div></header>`;

const cta = `
<section class="cta"><div class="wrap">
  <div>
    <div class="small">Sunteți gata să vorbim despre acoperișul dumneavoastră?</div>
    <h2>Obțineți o consultație gratuită astăzi!</h2>
    <p>Lucrăm în ${CITIES.join(', ')} și, la cerere, în alte orașe din țară.</p>
  </div>
  <div class="right">
    <a class="phone" href="tel:${SITE.tel}">${I.phone}${SITE.phone}</a>
    <div class="btns">
      <a class="btn btn-navy" href="tel:${SITE.tel}">Sunați acum</a>
      <a class="btn btn-white" href="${SITE.wa}" target="_blank" rel="noopener">${I.wa} WhatsApp</a>
    </div>
  </div>
</div></section>`;

const contact = `
<section id="contact"><div class="wrap">
  <div class="contact">
    <div class="info">
      <div class="over-t">Contact</div>
      <h2>Luați legătura cu noi</h2>
      <p>Pentru intervenții urgente vă rugăm să ne sunați. Pentru o estimare rapidă ne puteți trimite câteva fotografii pe WhatsApp.</p>
      <div class="item"><span class="ic2">${I.phone}</span><div><small>Telefon</small><b class="ph"><a href="tel:${SITE.tel}">${SITE.phone}</a></b></div></div>
      <div class="item"><span class="ic2">${I.wa}</span><div><small>WhatsApp</small><b><a href="${SITE.wa}" target="_blank" rel="noopener">Trimiteți fotografii cu problema</a></b></div></div>
      <div class="item"><span class="ic2">${I.pin}</span><div><small>Localitate</small><b>${SITE.city}</b></div></div>
      <div class="zones"><b>Zone deservite:</b> ${CITIES.join(', ')}.</div>
    </div>
    <div class="map"><iframe src="${SITE.map}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" title="Hartă Cluj-Napoca"></iframe></div>
  </div>
</div></section>`;

const footer = `
<footer class="footer"><div class="wrap">
  <div class="cols">
    <div>
      <a href="index.html" class="logo">${logos.footer}</a>
      <p style="margin-top:20px">Reparații de acoperișuri în regim de urgență, montaj acoperișuri, dulgherie și hidroizolații în Cluj-Napoca și împrejurimi.</p>
    </div>
    <div><h4>Servicii</h4><ul>${SERVICES.map(s => `<li><a href="${s.slug}.html">${s.short}</a></li>`).join('')}<li><a href="galerie.html">Galerie foto și video</a></li></ul></div>
    <div><h4>Lucrări</h4><ul>
      <li><a href="montaj-acoperisuri.html">Montaj țiglă metalică</a></li>
      <li><a href="montaj-acoperisuri.html">Montaj țiglă ceramică</a></li>
      <li><a href="montaj-acoperisuri.html">Montaj tablă cutată</a></li>
      <li><a href="montaj-acoperisuri.html">Montaj tablă fălțuită</a></li>
      <li><a href="mansardari-finisaje.html">Șindrilă bituminoasă</a></li>
      <li><a href="mansardari-finisaje.html">Jgheaburi și burlane</a></li>
      <li><a href="dulgherii-complete.html">Dulgherie</a></li>
    </ul></div>
    <div><h4>Contact</h4><ul>
      <li><a class="ph" href="tel:${SITE.tel}">${SITE.phone}</a></li>
      <li>${SITE.city}</li>
    </ul></div>
  </div>
  <div class="bottom"><span>© <span data-year>2026</span> ${SITE.domain}. Toate drepturile rezervate.</span><span>Cluj-Napoca, România</span></div>
</div></footer>
<a class="float-call" href="tel:${SITE.tel}" aria-label="Sunați acum">${I.phone}</a>
<script src="js/main.js"></script>
</body>
</html>`;

const page = (slug, title, desc, body) =>
  head(title, desc, slug) + header(slug) + body + cta + contact + footer;

const ticks = list => `<ul class="ticks">${list.map(t => `<li>${t}</li>`).join('')}</ul>`;

// ---------- Acasă ----------
const home = `
<section class="hero" style="padding:0">
  <div class="hero-bg"></div>
  <div class="wrap"><div class="hero-text">
    <div class="over">Cluj-Napoca și împrejurimi</div>
    <h1>Reparații acoperișuri <span>urgente</span></h1>
    <p class="lead">Aveți nevoie de o reparație la acoperiș? Intervenim rapid în Cluj-Napoca și în localitățile din jur pentru infiltrații, țigle deteriorate, tablă desprinsă și daune produse de intemperii. Evaluarea la fața locului este gratuită, iar prețul îl stabilim împreună înainte de începerea lucrării.</p>
    <div class="actions">
      <a class="btn btn-orange" href="tel:${SITE.tel}">${I.phone} Solicitați o evaluare</a>
      <a class="btn btn-line" href="galerie.html">Vezi galerie</a>
    </div>
  </div></div>
</section>
<div class="hero-bar"><div class="wrap"><div class="row">
  <a class="cell" href="tel:${SITE.tel}">${I.phone}<div><b>${SITE.phone}</b><small>Sunați pentru o intervenție</small></div></a>
  <div class="cell">${I.clock}<div><b>Intervenție rapidă</b><small>Cluj-Napoca și împrejurimi</small></div></div>
  <div class="cell">${I.shield}<div><b>Evaluare gratuită</b><small>La adresa dumneavoastră</small></div></div>
</div></div></div>

<section id="despre"><div class="wrap about">
  <div class="about-img">
    <img class="a" src="img/g03.jpg" alt="Acoperiș din țiglă metalică montat în județul Cluj">
    <img class="b" src="img/g04.jpg" alt="Structură nouă de lemn la un acoperiș în reparație">
    <div class="tagbox"><b>4,8 ★</b><span>Rating Google</span></div>
  </div>
  <div>
    <div class="over-t">Despre noi</div>
    <h2 class="t">Firmă specializată în reparații de acoperișuri</h2>
    <p class="lead-p">Suntem o echipă din Cluj-Napoca care se ocupă în principal de intervenții urgente la acoperișuri.</p>
    <p>Reparăm infiltrații, țigle sparte sau deplasate, tablă desprinsă de vânt, coame, dolii și sisteme pluviale deteriorate. Pe lângă reparații, executăm montaj de acoperișuri noi, lucrări de dulgherie, mansardări și hidroizolații pentru terase.</p>
    <p>Fiecare lucrare începe cu o evaluare la fața locului. Vă explicăm ce este de făcut, primiți prețul înainte de începere, iar la final predăm lucrarea curată, cu resturile de materiale ridicate.</p>
    ${ticks(['Evaluare gratuită la fața locului', 'Preț stabilit înainte de lucrare', 'Materiale de calitate', 'Garanție pentru manoperă'])}
    <div class="about-call">
      <a class="btn btn-orange" href="#contact">Cereți o ofertă</a>
      <a class="num" href="tel:${SITE.tel}"><small>Sau sunați direct</small><b>${SITE.phone}</b></a>
    </div>
  </div>
</div></section>

<section class="paper" style="padding-top:80px"><div class="wrap">
  <div class="head-row">
    <div><div class="over-t">Experți în domeniu</div><h2 class="t">Ce ne diferențiază</h2></div>
    <p>Lucrăm cu toate tipurile de învelitori și ne ocupăm de lucrare de la evaluare până la curățenia de la final.</p>
  </div>
  <div class="diff-grid">
    <div class="diff-item"><div class="n">01</div><h3><small>Experți în domeniu</small>Lucrare completă</h3>
      <p>Decopertăm acoperișul existent, refacem dulgheria acolo unde este nevoie, montăm parazăpezi și sisteme pluviale și ridicăm molozul la final.</p></div>
    <div class="diff-item"><div class="n">02</div><h3><small>Prețuri corecte</small>Estimare gratuită</h3>
      <p>Venim la fața locului fără niciun cost, evaluăm lucrarea și vă comunicăm un preț clar. Nu apar costuri suplimentare pe parcurs.</p></div>
    <div class="diff-item"><div class="n">03</div><h3><small>Calitate garantată</small>Executată de profesioniști</h3>
      <p>Folosim materiale de la producători consacrați și oferim garanție pentru lucrările executate de echipa noastră.</p></div>
  </div>
</div></section>

<section><div class="wrap">
  <div class="head-row">
    <div><div class="over-t">Serviciile noastre</div><h2 class="t">Ce facem pentru clienții noștri</h2></div>
    <p>Este recomandat să lucrați cu o firmă specializată în acoperișuri. Iată serviciile pe care le oferim în Cluj și împrejurimi.</p>
  </div>
  <div class="svc-grid">
    ${SERVICES.map((s, i) => `<a class="svc" href="${s.slug}.html">
      <div class="ph"><img src="img/${s.img}" alt="${s.title}" loading="lazy" style="object-position:${s.pos}"><span class="num">0${i + 1}</span></div>
      <div class="bd"><h3>${s.title}</h3><p>${s.blurb}</p><span class="go">Vezi detalii</span></div>
    </a>`).join('')}
    <a class="svc cta-card" href="tel:${SITE.tel}">
      <h3>Nu știți exact ce problemă are acoperișul?</h3>
      <p>Sunați-ne sau trimiteți fotografii. Vă spunem ce trebuie făcut și cât costă.</p>
      <span class="big">${SITE.phone}</span>
      <span class="btn btn-orange">Sunați acum</span>
    </a>
  </div>
</div></section>

<section class="dark why">
  <div class="txt">
    <div class="over-t">Promisiunea noastră</div>
    <h2 class="t">De ce să ne alegeți</h2>
    <p>Într-o situație urgentă contează ca cineva să ajungă repede și să rezolve problema de la prima vizită. Acesta este standardul după care lucrăm.</p>
    ${ticks(['Stabilim rapid ora vizitei', 'Venim pregătiți cu materialele necesare', 'Securizăm imediat zona afectată', 'Lucrăm la case și la blocuri', 'Manoperă atentă, materiale de calitate', 'Curățenie la finalul lucrării'])}
    <a class="btn btn-orange" href="tel:${SITE.tel}">${I.phone} ${SITE.phone}</a>
  </div>
  <div class="img"><div class="stamp"><div><b>36</b>recenzii<br>pe Google</div></div></div>
</section>

<section class="stats"><div class="wrap">
  <div class="head-c"><div class="over-t">Reușitele noastre</div><h2 class="t">Experiența noastră</h2></div>
  <div class="stat-row">
    <!-- DE COMPLETAT cu clientul: ani de experiență, nr. de lucrări. Până atunci afișăm doar cifre verificabile. -->
    <div class="stat"><b>4,8</b><span>Rating pe Google</span></div>
    <div class="stat"><b>34</b><span>Recenzii de 5 stele</span></div>
    <div class="stat"><b>${CITIES.length}+</b><span>Orașe deservite</span></div>
    <div class="stat"><b>0 lei</b><span>Costul evaluării</span></div>
  </div>
</div></section>

<section class="paper"><div class="wrap">
  <div class="head-row">
    <div><div class="over-t">Recenzii Google</div><h2 class="t">Ce spun clienții noștri</h2></div>
  </div>
  <div class="rev-grid">
    ${REVIEWS.map(r => `<div class="rev"><div class="stars">★★★★★</div><blockquote>„${r.q}”</blockquote>
      <div class="who"><span class="av">${r.n[0]}</span><div><b>${r.n}</b><small>${I.google} Recenzie Google</small></div></div></div>`).join('')}
    <div class="rev-sum">
      <div class="score">4,8</div>
      <div class="stars">★★★★★</div>
      <div>36 de recenzii pe Google</div>
      <div class="bars">
        <div>5<i style="--w:94%"></i>34</div><div>4<i style="--w:0%"></i>0</div><div>3<i style="--w:0%"></i>0</div>
        <div>2<i style="--w:0%"></i>0</div><div>1<i style="--w:6%"></i>2</div>
      </div>
      <a class="btn btn-orange" href="${SITE.mapLink}" target="_blank" rel="noopener">Citiți toate recenziile</a>
    </div>
  </div>
</div></section>

<section><div class="wrap">
  <div class="head-row">
    <div><div class="over-t">Galerie 2026</div><h2 class="t">Lucrări recente</h2></div>
    <a class="btn btn-navy" href="galerie.html">Vezi toată galeria</a>
  </div>
  <div class="gallery">
    <a href="img/g03.jpg" class="h2"><img src="img/g03.jpg" alt="Acoperiș nou din țiglă metalică" loading="lazy"></a>
    <a href="img/g04.jpg" class="w2 warm"><img src="img/g04.jpg" alt="Căpriori noi montați" loading="lazy"></a>
    <a href="img/g01.jpg" class="mir"><img src="img/g01.jpg" alt="Decopertare și refacere structură" loading="lazy"></a>
    <a href="img/g04.jpg" class="mir cool"><img src="img/g04.jpg" alt="Structură de lemn refăcută" loading="lazy" style="object-position:right center"></a>
    <a href="img/g03.jpg" class="w2 cool"><img src="img/g03.jpg" alt="Coamă și dolie din țiglă metalică" loading="lazy" style="object-position:center 85%"></a>
  </div>
</div></section>

<section class="cities paper"><div class="wrap cities-grid">
  <ul class="city-list">
    ${CITIES.map(c => `<li>${I.pin}${c}</li>`).join('')}
    <li>${I.pin}Alte orașe la cerere!</li>
  </ul>
  <div>
    <div class="over-t">Unde ne găsiți?</div>
    <h2 class="t">Chemați-ne și în orașul dumneavoastră!</h2>
    <p>Dacă aveți nevoie de o echipă serioasă și bine pregătită pentru acoperișul dumneavoastră, contactați-ne. Ajungem în ${CITIES.join(', ')} și în alte orașe, la cerere.</p>
    <a class="btn btn-orange" href="tel:${SITE.tel}">${I.phone} ${SITE.phone}</a>
  </div>
</div></section>`;

// ---------- pagini servicii ----------
const aside = slug => `
<aside class="aside">
  <div class="box"><h4>Serviciile noastre</h4>
    ${SERVICES.map(s => `<a class="lnk${s.slug === slug ? ' on' : ''}" href="${s.slug}.html">${s.short}<span>→</span></a>`).join('')}
  </div>
  <div class="box call"><h4>Aveți o urgență?</h4><p style="color:#d3dae5;margin:0">Sunați-ne și stabilim imediat când putem ajunge.</p>
    <a class="num" href="tel:${SITE.tel}">${SITE.phone}</a>
    <a class="btn btn-orange" href="${SITE.wa}" target="_blank" rel="noopener">${I.wa} WhatsApp</a></div>
</aside>`;

const STEPS = [
  ['Contact', 'Ne sunați sau ne trimiteți fotografii cu zona afectată.'],
  ['Evaluare', 'Venim la fața locului, stabilim cauza și vă comunicăm prețul.'],
  ['Execuție', 'Executăm lucrarea și protejăm curtea și fațada.'],
  ['Predare', 'Predăm lucrarea curată, cu garanție pentru manoperă.'],
];

const svcPage = (s, { intro, h2, paras, feats }) => page(
  s.slug,
  `${s.title} Cluj-Napoca | ${SITE.name}`,
  `${s.blurb} Telefon: ${SITE.phone}.`,
  `
<section class="page-hero" style="--img:url('../img/${s.img}')"><div class="wrap">
  <div class="crumbs"><a href="index.html">Acasă</a> / Servicii / ${s.short}</div>
  <h1>${s.title}</h1>
  <p>${intro}</p>
  <div style="display:flex;gap:14px;flex-wrap:wrap;margin-top:30px">
    <a class="btn btn-orange" href="tel:${SITE.tel}">${I.phone} ${SITE.phone}</a>
    <a class="btn btn-line" href="#contact">Cereți o ofertă</a>
  </div>
</div></section>
<section><div class="wrap svc-layout">
  <div class="svc-main">
    <div class="over-t">La ce să vă așteptați</div>
    <h2>${h2}</h2>
    ${paras.map(p => `<p class="lead">${p}</p>`).join('')}
    <img class="main-img" src="img/${s.img}" alt="${s.title}" style="object-position:${s.pos}">
    <div class="feat">${feats.map(([ic, t, d]) => `<div>${I[ic]}<h4>${t}</h4><p>${d}</p></div>`).join('')}</div>
    <h3>Cum lucrăm</h3>
    <div class="steps">${STEPS.map(([t, d], i) => `<div><span>0${i + 1}</span><b>${t}</b><p>${d}</p></div>`).join('')}</div>
  </div>
  ${aside(s.slug)}
</div></section>`);

const svc = Object.fromEntries(SERVICES.map(s => [s.slug, s]));
const servicePages = {
  'reparatii-acoperisuri': svcPage(svc['reparatii-acoperisuri'], {
    intro: 'Infiltrații, tablă desprinsă de vânt sau țigle sparte? Intervenim rapid în Cluj-Napoca și împrejurimi și oprim pătrunderea apei înainte să producă pagube.',
    h2: 'Reparații executate la timp, înainte ca problema să se agraveze',
    paras: ['O pată pe tavan poate avea în spate o țiglă fisurată, o dolie deteriorată sau un jgheab înfundat. Cu cât apa pătrunde mai mult timp, cu atât cresc pagubele în pod, în izolație și în tencuieli.',
      'Executăm reparații la acoperișuri din țiglă ceramică, țiglă metalică, tablă, șindrilă bituminoasă și la terase. Acolo unde este necesar, securizăm mai întâi acoperișul provizoriu și revenim apoi pentru reparația definitivă.'],
    feats: [['drop', 'Infiltrații', 'Identificăm punctul exact de pătrundere a apei: coș, dolie, coamă, străpungeri sau ferestre de mansardă.'],
      ['bolt', 'Daune produse de furtună', 'Tablă ridicată, țigle căzute, crengi pe acoperiș. Securizăm rapid și reparăm.'],
      ['roof', 'Țigle sparte sau deplasate', 'Înlocuim țiglele deteriorate și refacem coama și bordurile desprinse.'],
      ['gutter', 'Jgheaburi și burlane', 'Desfundăm, refacem prinderile și înlocuim porțiunile deteriorate.']],
  }),
  'montaj-acoperisuri': svcPage(svc['montaj-acoperisuri'], {
    intro: 'Acoperișuri noi montate complet, de la structura de lemn până la sistemul pluvial. Țiglă metalică, țiglă ceramică, tablă cutată sau tablă fălțuită.',
    h2: 'Un acoperiș montat corect vă protejează casa pentru zeci de ani',
    paras: ['Un acoperiș executat corect menține casa uscată, reduce pierderile de căldură și rezistă la vânt și zăpadă. Tratăm cu aceeași atenție fiecare etapă: structura, folia, ventilația, învelitoarea și scurgerea apei.',
      'Vă ajutăm să alegeți materialul potrivit pentru casă și buget și ne ocupăm de întreaga lucrare, inclusiv de decopertarea acoperișului vechi și de transportul molozului.'],
    feats: [['beam', 'Structură solidă', 'Căpriori, pane, astereală și toate elementele care asigură stabilitatea acoperișului.'],
      ['roof', 'Montaj de precizie', 'Folie anticondens, contrașipci, șipci și învelitoare fixate corect, cu ventilație la coamă.'],
      ['gutter', 'Sistem pluvial complet', 'Jgheaburi, burlane, parazăpezi și accesorii montate odată cu acoperișul.'],
      ['shield', 'Siguranță și estetică', 'Soluții care arată bine și protejează casa pe termen lung.']],
  }),
  'dulgherii-complete': svcPage(svc['dulgherii-complete'], {
    intro: 'Structura de lemn susține întregul acoperiș. Executăm și refacem căpriori, pane, cosoroabe și astereală, la acoperișuri noi și vechi.',
    h2: 'Dulgherie executată temeinic, de la prima grindă',
    paras: ['Multe probleme ale acoperișului pornesc de la structura de lemn: căpriori degradați, structuri lăsate sau prinderi slăbite. O învelitoare nouă montată pe o structură slăbită nu rezistă în timp.',
      'Folosim lemn uscat și tratat, înlocuim doar elementele degradate și consolidăm restul structurii. Lucrăm la case, anexe, garaje, foișoare și structuri pentru mansardă.'],
    feats: [['beam', 'Șarpante noi', 'Șarpante complete pentru case, garaje și anexe, executate după măsurători.'],
      ['tools', 'Consolidări', 'Înlocuim elementele degradate și consolidăm structura acolo unde s-a deformat.'],
      ['shield', 'Lemn tratat', 'Tratament împotriva insectelor, ciupercilor și umezelii.'],
      ['attic', 'Pregătire pentru mansardă', 'Adaptăm structura pentru transformarea podului în spațiu locuibil.']],
  }),
  'mansardari-finisaje': svcPage(svc['mansardari-finisaje'], {
    intro: 'Transformăm podul în spațiu locuibil, montăm ferestre de mansardă, jgheaburi și parazăpezi și executăm lucrări de finisaj și alte reparații.',
    h2: 'Spațiu suplimentar sub același acoperiș',
    paras: ['Podul neutilizat poate deveni dormitor, birou sau cameră pentru copii. Executăm mansardarea pe structură ușoară, cu izolație și barieră de vapori, astfel încât spațiul să fie cald iarna și răcoros vara.',
      'Pe lângă mansardări, ne ocupăm de lucrările care completează acoperișul: ferestre de mansardă, jgheaburi și burlane, parazăpezi, lambriu la streașină și alte reparații exterioare.'],
    feats: [['attic', 'Mansardări', 'Pereți și tavane pe structură ușoară, izolate termic și fonic.'],
      ['roof', 'Ferestre de mansardă', 'Montaj și etanșare corectă, fără infiltrații pe lângă rame.'],
      ['gutter', 'Jgheaburi și parazăpezi', 'Montaj și înlocuire sisteme pluviale și parazăpezi.'],
      ['tools', 'Finisaje și reparații', 'Lambriu la streașină, finisaje interioare și exterioare.']],
  }),
  'hidroizolatii-terase': svcPage(svc['hidroizolatii-terase'], {
    intro: 'Terase, garaje, balcoane și acoperișuri plate în Cluj-Napoca: hidroizolații cu membrană, executate pentru a opri definitiv infiltrațiile.',
    h2: 'Terase Cluj: hidroizolații care rezistă',
    paras: ['Acoperișurile plate și terasele sunt cele mai expuse infiltrațiilor, deoarece apa stagnează pe suprafața lor. O hidroizolație veche sau executată superficial se fisurează și permite apei să pătrundă în placă și în încăperile de dedesubt.',
      'Refacem hidroizolația cu membrană bituminoasă în unul sau două straturi, tratăm racordurile la atice, gurile de scurgere și străpungerile și ne asigurăm că apa se scurge corect.'],
    feats: [['terrace', 'Terase de bloc', 'Hidroizolații pentru asociații de proprietari și administratori de imobile.'],
      ['drop', 'Garaje și anexe', 'Membrană în două straturi pentru garaje, anexe și acoperișuri plate.'],
      ['shield', 'Terase circulabile', 'Soluții pentru terase și balcoane finisate cu gresie sau pavaj.'],
      ['gutter', 'Scurgeri și atice', 'Guri de scurgere, racorduri la atic și străpungeri etanșate corect.']],
  }),
};

// ---------- Galerie (Galerie + Galerie 2026 + Video) ----------
const slot = t => `<div class="slot">${t}</div>`;
const galerie = page('galerie', `Galerie foto și video | ${SITE.name}`,
  'Lucrări de reparații și montaj acoperișuri în Cluj-Napoca: galerie foto, galerie 2026 și video.', `
<section class="page-hero" style="--img:url('../img/g03.jpg')"><div class="wrap">
  <div class="crumbs"><a href="index.html">Acasă</a> / Galerie</div>
  <h1>Galerie</h1>
  <p>O selecție de lucrări executate în Cluj-Napoca și împrejurimi: reparații, acoperișuri noi, dulgherie și hidroizolații.</p>
</div></section>
<section><div class="wrap">
  <div class="tabs"><a href="#galerie" class="on">Galerie foto</a><a href="#galerie-2026">Galerie 2026</a><a href="#video">Video</a></div>

  <div class="head-c" id="galerie"><div class="over-t">Galerie foto</div><h2 class="t">Lucrările noastre</h2></div>
  <div class="gallery">
    <a href="img/g04.jpg" class="w2"><img src="img/g04.jpg" alt="Căpriori noi montați pe structura existentă" loading="lazy"></a>
    <a href="img/g03.jpg" class="h2 warm"><img src="img/g03.jpg" alt="Acoperiș din țiglă metalică" loading="lazy"></a>
    <a href="img/g01.jpg"><img src="img/g01.jpg" alt="Decopertare acoperiș vechi" loading="lazy"></a>
    <a href="img/g01.jpg" class="cool"><img src="img/g01.jpg" alt="Structură de lemn în lucru" loading="lazy" style="object-position:right center"></a>
    <a href="img/g04.jpg" class="mir"><img src="img/g04.jpg" alt="Dulgherie la acoperiș" loading="lazy" style="object-position:left center"></a>
    <a href="img/g03.jpg" class="bw"><img src="img/g03.jpg" alt="Coamă din țiglă metalică" loading="lazy" style="object-position:center 90%"></a>
    <!-- Locuri pentru fotografiile pe care le trimite clientul -->
    ${slot('Fotografie nouă')}${slot('Fotografie nouă')}${slot('Fotografie nouă')}${slot('Fotografie nouă')}
  </div>

  <div class="head-c" id="galerie-2026" style="margin-top:90px"><div class="over-t">Galerie 2026</div><h2 class="t">Lucrări din acest an</h2></div>
  <div class="gallery">
    <a href="img/g03.jpg" class="w2 mir"><img src="img/g03.jpg" alt="Acoperiș nou, 2026" loading="lazy" style="object-position:center 40%"></a>
    <a href="img/g01.jpg" class="warm"><img src="img/g01.jpg" alt="Lucrare 2026" loading="lazy" style="object-position:left center"></a>
    <a href="img/g04.jpg"><img src="img/g04.jpg" alt="Lucrare 2026" loading="lazy" style="object-position:right center"></a>
    ${slot('Fotografie 2026')}${slot('Fotografie 2026')}${slot('Fotografie 2026')}${slot('Fotografie 2026')}
  </div>

  <div class="head-c" id="video" style="margin-top:90px"><div class="over-t">Video</div><h2 class="t">Din șantier</h2></div>
  <div class="videos">
    <!-- Înlocuiți cu <iframe> YouTube/Facebook sau <video src="video/x.mp4" controls> când primim filmările -->
    ${[1, 2, 3].map(n => `<div class="video-slot"><div><div class="play">${I.play}</div>Video ${n}</div></div>`).join('')}
  </div>
</div></section>
<div class="lightbox"><button aria-label="Închide">×</button><img alt=""></div>`);

// ---------- scriere ----------
const out = __dirname;
const pages = { index: page('index', `${SITE.name} Cluj-Napoca | ${SITE.phone}`,
  'Reparații acoperișuri urgente în Cluj-Napoca: infiltrații, țigle sparte, daune produse de furtună, jgheaburi, terase. Evaluare gratuită. Telefon: 0754 704 243.', home),
  ...servicePages, galerie };
for (const [slug, html] of Object.entries(pages)) fs.writeFileSync(path.join(out, slug + '.html'), html);

const svgDir = path.join(out, 'logo', 'svg');
fs.rmSync(svgDir, { recursive: true, force: true });
fs.mkdirSync(svgDir, { recursive: true });
logos.variants.forEach(v => {
  fs.writeFileSync(path.join(svgDir, `logo-${v.code}.svg`), v.svg);
  fs.writeFileSync(path.join(svgDir, `logo-${v.code}-alb.svg`), v.dark);
});
fs.writeFileSync(path.join(out, 'logo', 'favicon.svg'), logos.favicon);
fs.writeFileSync(path.join(out, 'logo-uri.html'), logos.sheet(SITE));
fs.writeFileSync(path.join(out, 'robots.txt'), `User-agent: *\nAllow: /\nDisallow: /logo-uri.html\nSitemap: https://${SITE.domain}/sitemap.xml\n`);
fs.writeFileSync(path.join(out, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${
  Object.keys(pages).map(s => `  <url><loc>https://${SITE.domain}/${s === 'index' ? '' : s + '.html'}</loc></url>`).join('\n')}\n</urlset>\n`);
console.log('Generat:', Object.keys(pages).length, 'pagini,', logos.variants.length, 'logo-uri');
