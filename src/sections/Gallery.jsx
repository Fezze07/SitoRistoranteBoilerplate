// Gallery.jsx — Sezione galleria fotografica
import './Gallery.css'
import galleryData from '../data/gallery.json'

// Pattern di dimensioni per la griglia: [grande, piccolo, piccolo, piccolo, grande, piccolo]
const SLOT_SIZES = ['large', 'small', 'small', 'small', 'large', 'small']

export default function Gallery() {
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
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                className="gallery__img"
                // Se l'immagine non esiste, la nasconde e mostra il placeholder
                onError={(e) => {
                  e.target.style.display = 'none'
                  e.target.nextSibling.style.display = 'flex'
                }}
              />
              {/* Placeholder mostrato di default come display:none, attivato dall'onError */}
              <div className="gallery__placeholder" style={{ display: 'none' }}>
                <span className="gallery__placeholder-text">{item.alt}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
