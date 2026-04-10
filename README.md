# Restaurant Boilerplate — High-Performance Web Template

A modern, data-driven, and SEO-optimized web application designed for restaurants, osterias, and bars. Built with **React**, **Vite**, and **Vanilla CSS** for maximum performance and flexibility.

## 🚀 Quick Start

1. **Clone and Install**
   ```bash
   npm install
   ```

2. **Configure Environment**
   Duplicate `.env.example` (or create `.env`) and fill in your details:
   ```bash
   VITE_WHATSAPP_NUMBER=39...
   VITE_PHONE_NUMBER=+39...
   VITE_CONTACT_EMAIL=...
   VITE_ADDRESS_LINE1=...
   VITE_ADDRESS_LINE2=...
   VITE_MAPS_LINK=...
   VITE_MAPS_EMBED_URL=...
   VITE_FACEBOOK_URL=...
   VITE_INSTAGRAM_URL=...
   ```

3. **Run Locally**
   ```bash
   npm run dev
   ```

---

## ⚙️ Data-Driven Customization

This project is designed as a **Boilerplate**. You can change the entire content of the site by editing the JSON files in `src/data/` without touching any JSX code.

| File | Sub-content |
|------|-------------|
| `global.json` | Brand name, tagline, navigation links, and global aria-labels. |
| `hero.json` | Hero section titles, background images description, and CTAs. |
| `about.json` | "About Us" paragraphs, values list, and image card details. |
| `menu.json` | **Menu categories and items** (names, descriptions, prices). |
| `gallery.json` | Image sources and alt texts for the photo grid. |
| `info.json` | Opening hours, location blocks, and contact labels. |
| `footer.json` | Copyright info, credits, and social section titles. |

---

## 🎨 Design System

The styling is handled via CSS variables (Design Tokens) in `src/index.css`. You can brand the site by simply changing these values:

- `--color-primary`: Main branding color (e.g., #400408 for Burgundy).
- `--color-surface`: Background color.
- `--font-serif`: Used for headers and elegance.
- `--font-sans`: Used for readability and interface.

---

## 🌐 SEO & Meta Tags

SEO metadata is managed via environment variables and served through `index.html`. Make sure to set these in your hosting provider (Vercel/Netlify) or local `.env`:

- `VITE_SEO_TITLE`
- `VITE_SEO_DESCRIPTION`
- `VITE_SEO_KEYWORDS`
- `VITE_SEO_OG_TITLE`

---

## 📦 Deployment on Vercel

1. **Push to GitHub**: Connect your local repository to a remote GitHub repo.
2. **Import to Vercel**: Connect the repo to Vercel.
3. **Set Env Vars**: Copy all keys from your `.env` to the Vercel Dashboard (*Settings > Environment Variables*).
4. **Build Settings**: The default Vite settings (`npm run build`, `dist` directory) will work automatically.

---

## 🛠️ Tech Stack

- **Framework**: React 19
- **Build Tool**: Vite 6
- **Styling**: Vanilla CSS (Custom Properties)
- **Deployment**: Vercel-ready (custom headers & SPA routing)
- **Icons**: Custom SVG components in `src/components/Icons.jsx`
