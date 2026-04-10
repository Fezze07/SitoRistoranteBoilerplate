// Gallery.jsx — Sezione galleria fotografica con Lightbox (senza tilt 3D)
import { useState, useEffect } from 'react'
import './Gallery.css'
import galleryData from '../data/gallery.json'
import { CloseIcon, MaximizeIcon } from '../components/Icons'

// Pattern di dimensioni per la griglia: [grande, piccolo, piccolo, piccolo, grande, piccolo]
const SLOT_SIZES = ['large', 'small', 'small', 'small', 'large', 'small']

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null)

  // Gestione tasto Esc per chiudere il Lightbox
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setSelectedImage(null)
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  return (
    <section id="galleria" className="gallery">
      <div className="container">

        <div className="gallery__header">
          <span className="section-label">{galleryData.sectionLabel}</span>
          <hr className="section-divider" />
          <h2 className="gallery__title">{galleryData.title}</h2>
        </div>

        <div className="gallery__grid">
          {galleryData.items.map((item, i) => (
            <div
              key={item.id}
              className={`gallery__item gallery__item--${SLOT_SIZES[i]}`}
              onClick={() => setSelectedImage(item)}
              role="button"
              aria-label={`Ingrandisci immagine`}
              tabIndex={0}
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="gallery__img"
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }}
              />
              {/* Overlay hover semplificato: solo zoom e icona */}
              <div className="gallery__item-overlay">
                <MaximizeIcon size={32} color="white" />
              </div>

              {/* Placeholder visibile se l'immagine non esiste */}
              <div className="gallery__placeholder" style={{ display: 'none' }}>
                <MaximizeIcon size={32} opacity={0.2} />
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Lightbox Modal — Zoom a tutto schermo */}
      {selectedImage && (
        <div 
          className="gallery__lightbox" 
          onClick={() => setSelectedImage(null)}
          aria-modal="true"
          role="dialog"
        >
          <button 
            className="gallery__lightbox-close" 
            onClick={(e) => {
              e.stopPropagation()
              setSelectedImage(null)
            }}
            aria-label="Chiudi"
          >
            <CloseIcon size={32} />
          </button>
          
          <div className="gallery__lightbox-content" onClick={(e) => e.stopPropagation()}>
            <img 
              src={selectedImage.src} 
              alt={selectedImage.alt} 
              className="gallery__lightbox-img"
            />
          </div>
        </div>
      )}
    </section>
  )
}
