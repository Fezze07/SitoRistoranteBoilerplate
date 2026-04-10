# Hostaria ai Porteghi — Sito Web

Sito vetrina per il ristorante **Hostaria ai Porteghi** di Portobuffolè (TV).

## 🚀 Come avviare

```bash
cd "Sito Ristorante"
npm install
npm run dev
```

Apri il browser su `http://localhost:5173`

---

## ⚙️ Configurazione prima del rilascio

Cerca e sostituisci `INSERISCINUMERO` in questi file:

| File | Cosa cambiare |
|------|--------------|
| `src/components/Navbar.jsx` | Numero di telefono WhatsApp e tel: |
| `src/components/FloatingCTA.jsx` | Numero di telefono WhatsApp e tel: |
| `src/sections/Info.jsx` | Numero di telefono WhatsApp e tel: |
| `src/sections/Footer.jsx` | Numero di telefono WhatsApp e tel: |

### Social media
In `src/sections/Footer.jsx` sostituisci:
- `INSERISCI_PROFILO` con il vero username Instagram
- `INSERISCI_PROFILO` con il vero username Facebook

### Google Maps
In `src/sections/Info.jsx`, il parametro `src` dell'`<iframe>` è attualmente puntato a Portobuffolè generico. Per ottenere il link esatto:
1. Vai su [maps.google.com](https://maps.google.com)
2. Cerca "Hostaria ai Porteghi Portobuffolè"
3. Clicca su **Condividi → Incorpora una mappa**
4. Copia il link `src` e incollalo in `Info.jsx`

---

## 🖼️ Immagini

Metti le foto in `/public/images/`. Vedi `public/images/LEGGI_QUI.md` per i dettagli.

---

## 📁 Struttura progetto

```
src/
├── components/
│   ├── Navbar.jsx / .css       # Navigazione glassmorphism
│   ├── FloatingCTA.jsx / .css  # Barra CTA mobile
│   └── MenuItem.jsx / .css     # Singola voce menù
├── sections/
│   ├── Hero.jsx / .css         # Sezione principale
│   ├── About.jsx / .css        # Chi siamo
│   ├── Menu.jsx / .css         # Menù con tab
│   ├── Gallery.jsx / .css      # Galleria foto
│   ├── Info.jsx / .css         # Orari e mappa
│   └── Footer.jsx / .css       # Footer
├── data/
│   └── menu.json               # Dati del menù (modifica qui!)
├── App.jsx                     # Componente root
└── App.css                     # Design system globale (token CSS)
```

---

## 🎨 Design System

Dal progetto Stitch **"Sito Hostaria"** (ID: 9362968696261866088):

| Token | Valore | Uso |
|-------|--------|-----|
| `--color-primary` | `#400408` | Titoli, bottoni, footer |
| `--color-primary-container` | `#5d1a1a` | Accent borgogna |
| `--color-surface` | `#fdf9f3` | Sfondo pagina (crema calda) |
| `--font-serif` | Noto Serif | Headlines, prezzi |
| `--font-sans` | Manrope | Corpo testo, label |

---

## 🌐 Deploy

Build di produzione:
```bash
npm run build
```
I file statici saranno in `/dist` — caricali su qualsiasi hosting (Netlify, Vercel, hosting web tradizionale).
