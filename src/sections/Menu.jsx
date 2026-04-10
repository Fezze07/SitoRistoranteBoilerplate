// Menu.jsx —   Carosello infinito basato su CSS transform (nessuno scroll nativo)
import { useRef, useState, useEffect, useCallback } from 'react'
import MenuItem from '../components/MenuItem'
import menuData from '../data/menu.json'
import { ChevronLeftIcon, ChevronRightIcon } from '../components/Icons'
import './Menu.css'

// Ogni slide occupa il 75% del container; il peek laterale è 12.5% per lato
const SLIDE_PCT = 75
const PEEK_PCT = (100 - SLIDE_PCT) / 2   // 12.5

export default function Menu() {
  const trackRef = useRef(null)
  const timerRef = useRef(null)
  // Impedisce nuovi click mentre un'animazione CSS è in corso
  const lockRef = useRef(false)
  const touchStartX = useRef(0)

  // Array esteso: [clone-ultimo, ...categorie reali, clone-primo]
  // Permette il loop infinito senza salti visibili
  const extendedMenu = [
    menuData.categories[menuData.categories.length - 1],
    ...menuData.categories,
    menuData.categories[0],
  ]

  // L'indice parte da 1 perché lo slot 0 è il clone dell'ultimo elemento
  const [currentIdx, setCurrentIdx] = useState(1)

  const getTranslate = (idx) =>
    `translateX(calc(${PEEK_PCT - idx * SLIDE_PCT}%))`

  // Salta istantaneamente all'indice reale corrispondente dopo aver raggiunto un clone,
  // disabilitando la transizione per evitare il jitter visivo
  const silentJump = useCallback((targetIdx) => {
    const track = trackRef.current
    if (!track) return

    track.style.transition = 'none'
    track.style.transform = getTranslate(targetIdx)
    void track.getBoundingClientRect() // forza reflow per applicare il cambio prima di riattivare la transizione
    setCurrentIdx(targetIdx)
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (trackRef.current) trackRef.current.style.transition = ''
        lockRef.current = false
      })
    })
  }, [])

  const handleTransitionEnd = useCallback((e) => {
    if (e.target !== trackRef.current || e.propertyName !== 'transform') return

    if (currentIdx === extendedMenu.length - 1) {
      silentJump(1)
    } else if (currentIdx === 0) {
      silentJump(extendedMenu.length - 2)
    } else {
      lockRef.current = false
    }
  }, [currentIdx, extendedMenu.length, silentJump])

  const navigate = useCallback((direction) => {
    if (lockRef.current) return
    lockRef.current = true
    setCurrentIdx(prev => prev + (direction === 'next' ? 1 : -1))
  }, [])

  // Auto-avanzamento ogni 10 s
  useEffect(() => {
    timerRef.current = setInterval(() => navigate('next'), 10000)
    return () => clearInterval(timerRef.current)
  }, [navigate])

  // Normalizza l'indice per trattare cloni e slide reali come equivalenti
  const isSlideActive = (idx) => {
    const norm = (i) => {
      if (i === 0) return menuData.categories.length - 1
      if (i === extendedMenu.length - 1) return 0
      return i - 1
    }
    return norm(idx) === norm(currentIdx)
  }

  return (
    <section id="menu" className="menu-section">
      <div className="container">

        <div className="menu-section__header">
          <span className="section-label">{menuData.sectionLabel}</span>
          <hr className="section-divider" />
          <h2 className="menu-section__title">{menuData.title}</h2>
          <p className="menu-section__subtitle">
            {menuData.subtitle}
          </p>
        </div>

        <div className="menu-carousel-wrapper">
          <button
            className="menu-carousel__btn menu-carousel__btn--prev"
            onClick={() => navigate('prev')}
            aria-label={menuData.aria.prevMenu}
          >
            <ChevronLeftIcon size={24} />
          </button>

          {/* overflow: hidden nasconde i cloni laterali senza usare scroll nativo */}
          <div 
            className="menu-carousel"
            onTouchStart={e => touchStartX.current = e.touches[0].clientX}
            onTouchEnd={e => {
              const touchEndX = e.changedTouches[0].clientX
              if (touchStartX.current - touchEndX > 40) navigate('next')
              else if (touchEndX - touchStartX.current > 40) navigate('prev')
            }}
          >
            <div
              ref={trackRef}
              className="menu-carousel__track"
              style={{ transform: getTranslate(currentIdx) }}
              onTransitionEnd={handleTransitionEnd}
            >
              {extendedMenu.map((cat, idx) => (
                <div
                  key={`${cat.category}-${idx}`}
                  className={`menu-carousel__slide ${isSlideActive(idx) ? 'menu-carousel__slide--active' : ''}`}
                >
                  <h3 className="menu-carousel__category-title">{cat.category}</h3>
                  <div className="menu-section__list">
                    {cat.items.map(item => (
                      <MenuItem
                        key={item.name}
                        name={item.name}
                        description={item.description}
                        price={item.price}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            className="menu-carousel__btn menu-carousel__btn--next"
            onClick={() => navigate('next')}
            aria-label={menuData.aria.nextMenu}
          >
            <ChevronRightIcon size={24} />
          </button>
        </div>

        <p className="menu-section__note">
          {menuData.note}
        </p>

      </div>
    </section>
  )
}
