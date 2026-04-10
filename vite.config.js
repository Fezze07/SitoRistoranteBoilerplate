import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],

  // Sicurezza build: rimuove source maps in produzione per non esporre il codice sorgente
  build: {
    sourcemap: false,
    // Minifica e offusca il codice
    minify: 'oxc',
    rollupOptions: {
      output: {
        // Nomi hash per evitare cache poisoning e fingerprinting prevedibile
        entryFileNames: 'assets/[name]-[hash].js',
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      },
    },
  },

  // Server dev: header di sicurezza già in sviluppo
  server: {
    headers: {
      // Blocca clickjacking
      'X-Frame-Options': 'DENY',
      // Abilita protezione XSS browser (legacy)
      'X-XSS-Protection': '1; mode=block',
      // Impedisce MIME sniffing
      'X-Content-Type-Options': 'nosniff',
      // Limita referrer info su link esterni
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      // Permissions Policy: disabilita funzionalità browser non necessarie
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()',
      // Content Security Policy: sorgenti autorizzate esplicitamente
      'Content-Security-Policy': [
        "default-src 'self'",
        // Script: solo stesso dominio + Vite HMR in dev
        "script-src 'self' 'unsafe-inline'",
        // Stili: stesso dominio + Google Fonts
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        // Font: Google Fonts
        "font-src 'self' https://fonts.gstatic.com data:",
        // Immagini: stesso dominio + data URI per SVG/placeholder
        "img-src 'self' data: blob:",
        // Frame: solo Google Maps embed
        "frame-src https://www.google.com",
        // Connessioni: stesso dominio (no backend calls)
        "connect-src 'self'",
        // Form: nessun form action esterno
        "form-action 'self'",
        // Blocca embed non autorizzati
        "object-src 'none'",
        // Base URI: solo stesso dominio
        "base-uri 'self'",
      ].join('; '),
    },
  },

  // Preview server (npm run preview) - stessi header
  preview: {
    headers: {
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'X-Content-Type-Options': 'nosniff',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
      'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()',
      'Content-Security-Policy': [
        "default-src 'self'",
        "script-src 'self'",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "font-src 'self' https://fonts.gstatic.com data:",
        "img-src 'self' data: blob:",
        "frame-src https://www.google.com",
        "connect-src 'self'",
        "form-action 'self'",
        "object-src 'none'",
        "base-uri 'self'",
      ].join('; '),
    },
  },
})
