# Reparații Acoperișuri Urgente

Site de prezentare pentru Reparații Acoperișuri Urgente, firmă de acoperișuri din Cluj-Napoca. Telefon: 0754 704 243.

Live: https://reparatii-acoperisuri-urgente-cj.netlify.app

## Pagini

- `index.html`: Acasă, cu Despre noi, servicii, recenzii, galerie, orașe deservite și contact
- `reparatii-acoperisuri.html`, `montaj-acoperisuri.html`, `dulgherii-complete.html`, `mansardari-finisaje.html`, `hidroizolatii-terase.html`: serviciile
- `galerie.html`: Galerie, Galerie 2026 și Video
- `logo-uri.html`: variantele de logo, pentru ales (nu apare în meniu)

## Logo-uri

- `logo/svg/`: 24 de variante, `logo-NN.svg` pentru fundal deschis și `logo-NN-alb.svg` pentru fundal închis
- `logo/png/`: aceleași variante ca PNG transparent
- `logo/toate-logo-urile.png`: toate variantele pe o singură imagine
- `index.html?logo=NN` arată site-ul cu varianta NN în header

## Modificări

Paginile HTML și fișierele de logo se generează din `build.js` și `logos.js`. După ce schimbați texte, servicii sau date de contact în `build.js`, rulați:

```
node build.js
```

Stilurile sunt în `css/style.css`, iar pozele în `img/`.
