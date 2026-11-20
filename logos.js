// Variante de logo (SVG) pentru Reparații Acoperișuri Urgente.
// Fiecare concept e o funcție (paletă, fundal închis?) → SVG 360x90. logo-uri.html le arată pe toate.

const H = `font-family="'Barlow Condensed','Arial Narrow',Arial,sans-serif"`;
const B = `font-family="Barlow,'Segoe UI',Arial,sans-serif"`;

const PAL = {
  portocaliu: { a: '#f26419', t: '#0e1a2b', s: '#5f6670', name: 'Portocaliu / bleumarin' },
  rosu: { a: '#c8102e', t: '#222222', s: '#666666', name: 'Roșu / antracit' },
  albastru: { a: '#1f5fae', t: '#0e1a2b', s: '#5f6670', name: 'Albastru / bleumarin' },
  verde: { a: '#2e7d32', t: '#16241a', s: '#5d6b62', name: 'Verde / pădure' },
  galben: { a: '#f2a900', t: '#111111', s: '#555555', name: 'Galben / negru' },
  turcoaz: { a: '#00897b', t: '#10292e', s: '#56707a', name: 'Turcoaz / petrol' },
  caramiziu: { a: '#b5462a', t: '#2a1d18', s: '#6e5f58', name: 'Cărămiziu / maro' },
  otel: { a: '#f26419', t: '#3c4a5c', s: '#6c7684', name: 'Gri oțel / portocaliu' },
};

const col = (p, dark) => ({ a: p.a, t: dark ? '#ffffff' : p.t, s: dark ? '#aab4c3' : p.s });

// 1. Casă cu horn + text pe două niveluri
const coama = (p, dark) => { const c = col(p, dark); return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 90">
  <path d="M6 50 44 16l38 34" fill="none" stroke="${c.a}" stroke-width="9" stroke-linejoin="miter"/>
  <rect x="61" y="18" width="10" height="18" fill="${c.a}"/>
  <path d="M20 50v28h48V50" fill="none" stroke="${c.t}" stroke-width="6"/>
  <rect x="38" y="58" width="12" height="20" fill="${c.a}"/>
  <text x="98" y="48" ${H} font-weight="800" font-size="36" fill="${c.t}" textLength="168" lengthAdjust="spacingAndGlyphs">ACOPERIȘURI</text>
  <text x="98" y="77" ${H} font-weight="800" font-size="25" fill="${c.a}" textLength="86" lengthAdjust="spacingAndGlyphs">URGENTE</text>
  <text x="196" y="76" ${B} font-weight="700" font-size="15" fill="${c.s}" letter-spacing="1.5">REPARAȚII · CLUJ</text>
</svg>`; };

// 2. Sigiliu rotund cu text circular
const sigiliu = (p, dark, id) => { const c = col(p, dark); return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 90">
  <defs><path id="${id}" d="M45 45m-31 0a31 31 0 1 1 62 0a31 31 0 1 1-62 0"/></defs>
  <circle cx="45" cy="45" r="43" fill="${c.a}"/>
  <circle cx="45" cy="45" r="24" fill="none" stroke="#fff" stroke-width="1.5"/>
  <text ${B} font-weight="700" font-size="8.4" fill="#fff" letter-spacing="1.6"><textPath href="#${id}" startOffset="0">REPARAȚII • ACOPERIȘURI • URGENTE •</textPath></text>
  <path d="M31 48 45 35l14 13" fill="none" stroke="#fff" stroke-width="4.5"/>
  <path d="M35 47v12h20V47" fill="none" stroke="#fff" stroke-width="3.5"/>
  <text x="104" y="34" ${B} font-weight="700" font-size="13" fill="${c.s}" letter-spacing="4">REPARAȚII</text>
  <text x="102" y="66" ${H} font-weight="800" font-size="38" fill="${c.t}" textLength="186" lengthAdjust="spacingAndGlyphs">ACOPERIȘURI</text>
  <text x="104" y="84" ${B} font-weight="700" font-size="12" fill="${c.a}" letter-spacing="3.2">URGENTE · CLUJ</text>
</svg>`; };

// 3. Monogramă „A” în formă de acoperiș
const monograma = (p, dark) => { const c = col(p, dark); return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 90">
  <path d="M6 84 44 8l38 76" fill="none" stroke="${c.t}" stroke-width="12" stroke-linejoin="miter"/>
  <path d="M0 34 44 4l44 30" fill="none" stroke="${c.a}" stroke-width="6" stroke-linejoin="miter"/>
  <rect x="26" y="56" width="36" height="9" fill="${c.a}"/>
  <rect x="104" y="20" width="4" height="60" fill="${c.a}"/>
  <text x="122" y="50" ${H} font-weight="800" font-size="38" fill="${c.t}" textLength="190" lengthAdjust="spacingAndGlyphs">ACOPERIȘURI</text>
  <text x="123" y="77" ${H} font-weight="600" font-size="22" fill="${c.s}" letter-spacing="2" textLength="190" lengthAdjust="spacing">REPARAȚII URGENTE</text>
</svg>`; };

// 4. Plăcuță cu acoperiș deasupra
const placuta = (p, dark) => { const plate = dark ? '#ffffff' : p.t; const txt = dark ? p.t : '#ffffff'; return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 90">
  <polygon points="22,26 62,4 102,26" fill="${p.a}"/>
  <rect x="0" y="26" width="360" height="60" fill="${plate}"/>
  <rect x="0" y="26" width="8" height="60" fill="${p.a}"/>
  <text x="24" y="60" ${H} font-weight="800" font-size="30" fill="${txt}" textLength="318" lengthAdjust="spacingAndGlyphs">REPARAȚII ACOPERIȘURI</text>
  <text x="24" y="78" ${B} font-weight="700" font-size="10.5" fill="${p.a}" letter-spacing="4.2" textLength="318" lengthAdjust="spacing">URGENTE · CLUJ-NAPOCA · 0754 704 243</text>
</svg>`; };

// 5. Trei rânduri de țiglă (chevroane suprapuse)
const tigle = (p, dark) => { const c = col(p, dark); return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 90">
  <path d="M4 40 42 10l38 30" fill="none" stroke="${c.a}" stroke-width="9"/>
  <path d="M14 60 42 38l28 22" fill="none" stroke="${c.t}" stroke-width="9"/>
  <path d="M24 80 42 66l18 14" fill="none" stroke="${c.a}" stroke-width="9"/>
  <text x="98" y="30" ${B} font-weight="700" font-size="13" fill="${c.s}" letter-spacing="5">REPARAȚII</text>
  <text x="96" y="64" ${H} font-weight="800" font-size="40" fill="${c.t}" textLength="196" lengthAdjust="spacingAndGlyphs">ACOPERIȘURI</text>
  <text x="98" y="85" ${H} font-weight="700" font-size="20" fill="${c.a}" letter-spacing="7">URGENTE</text>
</svg>`; };

// 6. Casă cu picătură (anti-infiltrații)
const picatura = (p, dark) => { const c = col(p, dark); return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 90">
  <path d="M6 44 44 10l38 34" fill="none" stroke="${c.t}" stroke-width="7"/>
  <path d="M16 40v42h56V40" fill="none" stroke="${c.t}" stroke-width="6"/>
  <path d="M44 40s-13 14-13 22a13 13 0 0 0 26 0c0-8-13-22-13-22z" fill="${c.a}"/>
  <path d="M38 62l5 5 9-10" fill="none" stroke="#fff" stroke-width="3"/>
  <text x="98" y="48" ${H} font-weight="800" font-size="33" fill="${c.t}" textLength="250" lengthAdjust="spacingAndGlyphs">ACOPERIȘURI <tspan fill="${c.a}">URGENTE</tspan></text>
  <rect x="98" y="58" width="250" height="1.5" fill="${c.s}" opacity=".5"/>
  <text x="98" y="78" ${B} font-weight="600" font-size="12.5" fill="${c.s}" letter-spacing="1.4" textLength="250" lengthAdjust="spacing">REPARAȚII ȘI INFILTRAȚII · CLUJ-NAPOCA</text>
</svg>`; };

// 7. Wordmark centrat cu linie de coamă
const wordmark = (p, dark) => { const c = col(p, dark); return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 90">
  <path d="M30 26 180 4l150 22" fill="none" stroke="${c.a}" stroke-width="5"/>
  <rect x="226" y="6" width="10" height="14" fill="${c.a}"/>
  <text x="180" y="62" text-anchor="middle" ${H} font-weight="800" font-size="44" fill="${c.t}" textLength="290" lengthAdjust="spacingAndGlyphs">ACOPERIȘURI</text>
  <rect x="30" y="74" width="60" height="2" fill="${c.a}"/><rect x="270" y="74" width="60" height="2" fill="${c.a}"/>
  <text x="180" y="80" text-anchor="middle" ${B} font-weight="700" font-size="12" fill="${c.a}" letter-spacing="3.5">REPARAȚII URGENTE</text>
</svg>`; };

// 8. Scut cu acoperiș și fulger
const scut = (p, dark) => { const c = col(p, dark); return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 90">
  <path d="M42 2 6 14v26c0 22 15 39 36 48 21-9 36-26 36-48V14z" fill="${c.a}"/>
  <path d="M18 44 42 24l24 20" fill="none" stroke="#fff" stroke-width="6"/>
  <path d="M46 38 35 56h9l-4 15 13-20h-9z" fill="#fff"/>
  <text x="94" y="46" ${H} font-weight="800" font-size="36" fill="${c.t}" textLength="180" lengthAdjust="spacingAndGlyphs">ACOPERIȘURI</text>
  <rect x="94" y="56" width="96" height="26" fill="${c.a}"/>
  <text x="142" y="75" text-anchor="middle" ${H} font-weight="700" font-size="19" fill="#fff" letter-spacing="2.5">URGENTE</text>
  <text x="200" y="75" ${B} font-weight="600" font-size="12.5" fill="${c.s}" letter-spacing="1">REPARAȚII · CLUJ</text>
</svg>`; };

const CONCEPTS = [
  ['coama', 'Casă cu horn', coama, ['portocaliu', 'rosu', 'albastru']],
  ['sigiliu', 'Sigiliu rotund', sigiliu, ['caramiziu', 'albastru', 'verde']],
  ['monograma', 'Monogramă A-acoperiș', monograma, ['portocaliu', 'galben', 'otel']],
  ['placuta', 'Plăcuță cu acoperiș', placuta, ['portocaliu', 'rosu', 'turcoaz']],
  ['tigle', 'Rânduri de țiglă', tigle, ['portocaliu', 'verde', 'albastru']],
  ['picatura', 'Casă cu picătură', picatura, ['albastru', 'turcoaz', 'portocaliu']],
  ['wordmark', 'Linie de coamă', wordmark, ['rosu', 'caramiziu', 'otel']],
  ['scut', 'Scut cu fulger', scut, ['rosu', 'portocaliu', 'galben']],
];

const variants = [];
CONCEPTS.forEach(([key, label, fn, pals]) => pals.forEach(pal => {
  const code = String(variants.length + 1).padStart(2, '0');
  const p = PAL[pal];
  variants.push({ code, key, concept: label, palette: p.name, svg: fn(p, false, 'c' + code), dark: fn(p, true, 'd' + code) });
}));

const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" fill="#0e1a2b"/>
  <path d="M8 34 32 13l24 21" fill="none" stroke="#f26419" stroke-width="7"/>
  <path d="M17 32v20h30V32" fill="none" stroke="#fff" stroke-width="5"/>
</svg>`;

const sheet = SITE => `<!doctype html>
<html lang="ro"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Variante logo</title>
<link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;600;700&family=Barlow+Condensed:wght@600;700;800&display=swap" rel="stylesheet">
<style>
  body { margin: 0; font-family: Barlow, system-ui, sans-serif; background: #f5f2ed; color: #1b1f24; }
  header { background: #0e1a2b; color: #fff; padding: 46px 20px; text-align: center; }
  header h1 { font-family: 'Barlow Condensed'; font-size: 46px; text-transform: uppercase; margin: 0 0 6px; }
  header p { color: #b9c3d1; margin: 0; font-size: 17px; }
  main { max-width: 1320px; margin: 0 auto; padding: 20px 16px 70px; }
  h2 { font-family: 'Barlow Condensed'; text-transform: uppercase; font-size: 28px; margin: 46px 0 16px; border-left: 4px solid #f26419; padding-left: 12px; }
  .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(380px, 1fr)); gap: 20px; }
  .v { background: #fff; box-shadow: 0 6px 20px rgba(14,26,43,.07); }
  .v .l, .v .d { padding: 26px 30px; } .v .d { background: #0e1a2b; }
  .v svg { width: 100%; height: auto; display: block; }
  .v .meta { padding: 12px 20px; display: flex; justify-content: space-between; align-items: center; font-size: 15px; border-top: 1px solid #e2ddd5; }
  .v .meta b { font-family: 'Barlow Condensed'; color: #f26419; font-size: 24px; margin-right: 8px; }
  .v .meta a { color: #0e1a2b; font-weight: 600; margin-left: 14px; }
</style></head><body>
<header><h1>Variante de logo</h1><p>${SITE.name} · alegeți numărul preferat. „Vezi pe site” deschide site-ul cu logo-ul respectiv.</p></header>
<main>
${CONCEPTS.map(([key, label]) => `<h2>${label}</h2><div class="grid">${variants.filter(v => v.key === key).map(v => `
  <div class="v"><div class="l">${v.svg}</div><div class="d">${v.dark}</div>
  <div class="meta"><span><b>${v.code}</b>${v.palette}</span><span><a href="index.html?logo=${v.code}">Vezi pe site</a><a href="logo/svg/logo-${v.code}.svg" download>SVG</a></span></div></div>`).join('')}</div>`).join('\n')}
</main></body></html>`;

// Logo-ul site-ului: emblemă centrată (acoperiș cu horn, casă cu patru ferestre, nume pe două rânduri)
const M = `font-family="Montserrat, Arial, sans-serif"`;
const emblem = (p, dark) => {
  const t = dark ? '#ffffff' : p.t;
  const box = dark ? p.a : p.t;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="24 12 312 282">
  <path d="M66 112 180 22l114 90" fill="none" stroke="${p.a}" stroke-width="14"/>
  <rect x="236" y="38" width="18" height="44" fill="${p.a}"/>
  <path d="M108 100v68h144v-68" fill="none" stroke="${t}" stroke-width="9"/>
  <rect x="163" y="114" width="15" height="15" fill="${p.a}"/><rect x="182" y="114" width="15" height="15" fill="${p.a}"/>
  <rect x="163" y="133" width="15" height="15" fill="${p.a}"/><rect x="182" y="133" width="15" height="15" fill="${p.a}"/>
  <text x="180" y="214" text-anchor="middle" ${M} font-weight="900" font-size="38" fill="${t}" textLength="292" lengthAdjust="spacingAndGlyphs">ACOPERIȘURI</text>
  <text x="180" y="250" text-anchor="middle" ${M} font-weight="800" font-size="27" fill="${p.a}" letter-spacing="9">URGENTE</text>
  <rect x="88" y="262" width="184" height="26" fill="${box}"/>
  <text x="180" y="280" text-anchor="middle" ${M} font-weight="700" font-size="11.5" fill="#fff" letter-spacing="1.6">MONTAJ ȘI REPARAȚII</text>
</svg>`;
};

module.exports = { variants, favicon, sheet, header: emblem(PAL.portocaliu, false), footer: emblem(PAL.portocaliu, true) };
