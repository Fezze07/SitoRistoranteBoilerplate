// Menu.jsx —   Carosello infinito basato su CSS transform (nessuno scroll nativo)
import { useRef, useState, useEffect, useCallback, useMemo } from 'react'
import MenuItem from '../components/MenuItem'
import menuData from '../data/menu.json'
import specialMenuData from '../data/specialEventMenu.json'
import { isSpecialMenuVisible, getVisibleSpecialMenus } from '../utils/dateUtils'
import { ChevronLeftIcon, ChevronRightIcon } from '../components/Icons'
import './Menu.css'


export default function Menu() {
  const trackRef = useRef(null)
  const timerRef = useRef(null)
  // Impedisce nuovi click mentre un'animazione CSS è in corso
  const lockRef = useRef(false)
  const touchStartX = useRef(0)

  // Costruisce l'array delle categorie dinamicamente
  const categoriesToRender = useMemo(() => {
    const list = []
    const visibleSpecials = getVisibleSpecialMenus(specialMenuData)
    
    visibleSpecials.forEach((specialMenu) => {
      list.push({
        category: specialMenu.eventName,
        isSpecial: true,
        description: specialMenu.description,
        fixedPrice: specialMenu.fixedPrice,
        showPrice: specialMenu.showPrice,
        items: specialMenu.items
      })
    })

    list.push(...menuData.categories)
    return list
  }, [specialMenuData, menuData])

  // Array esteso: [clone-ultimo, ...categorie reali, clone-primo]
  const extendedMenu = useMemo(() => [
    categoriesToRender[categoriesToRender.length - 1],
    ...categoriesToRender,
    categoriesToRender[0],
  ], [categoriesToRender])

  // L'indice parte da 1 perché lo slot 0 è il clone dell'ultimo elemento
  const [currentIdx, setCurrentIdx] = useState(1)

  const getTranslate = useCallback((idx) =>
    `translateX(calc(var(--peek-width) - ${idx} * var(--slide-width)))`, [])

  // Salta istantaneamente all'indice reale corrispondente dopo aver raggiunto un clone,
  // disabilitando la transizione per evitare il jitter visivo
  const silentJump = useCallback((targetIdx) => {
    const track = trackRef.current
    if (!track) return

    track.style.transition = 'none'
    track.style.transform = getTranslate(targetIdx)
    // Forza reflow
    void track.offsetHeight 
    
    setCurrentIdx(targetIdx)
    
    // Riabilita la transizione nel frame successivo
    requestAnimationFrame(() => {
      if (trackRef.current) trackRef.current.style.transition = ''
      lockRef.current = false
    })
  }, [getTranslate])

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

  // Auto-avanzamento ogni 15 s.
  useEffect(() => {
    timerRef.current = setInterval(() => navigate('next'), 15000)
    return () => clearInterval(timerRef.current)
  }, [currentIdx, navigate])

  // Listener per l'ancora esterna
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#menu-speciale') {
        const specialIdx = categoriesToRender.findIndex(cat => cat.isSpecial)
        if (specialIdx !== -1) {
          // Usiamo un timeout per assicurarci che la transizione allo scroll (nativa) 
          // non interferisca con il jump del carosello
          setTimeout(() => {
            silentJump(specialIdx + 1)
            // Puliamo l'hash così che il timer non ci riporti qui
            window.history.replaceState(null, null, '#menu')
          }, 100)
        }
      }
    }
    
    window.addEventListener('hashchange', handleHashChange)
    // Eseguiamo anche all'avvio se l'hash è già presente
    if (window.location.hash === '#menu-speciale') handleHashChange()
    
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [silentJump, categoriesToRender])

  // Normalizza l'indice per trattare cloni e slide reali come equivalenti
  const isSlideActive = (idx) => {
    const norm = (i) => {
      if (i === 0) return categoriesToRender.length - 1
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
            onTouchStart={e => {
              clearInterval(timerRef.current) // Ferma il timer appena l'utente tocca
              touchStartX.current = e.touches[0].clientX
            }}
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
                  id={cat.isSpecial && isSlideActive(idx) ? 'menu-speciale' : undefined}
                  className={`menu-carousel__slide ${isSlideActive(idx) ? 'menu-carousel__slide--active' : ''}`}
                >
                  <div className={`menu-carousel__slide-inner ${cat.isSpecial ? 'menu-carousel__slide--special' : ''}`}>
                    <h3 className="menu-carousel__category-title">{cat.category}</h3>
                    {cat.isSpecial && (
                      <p className="menu-carousel__special-desc">{cat.description}</p>
                    )}
                    
                    <div className={`menu-section__list ${cat.items.length > 6 ? 'menu-section__list--grid' : ''}`}>
                      {cat.items.map(item => (
                        <MenuItem
                          key={item.name}
                          name={item.name}
                          description={item.description}
                          price={(cat.isSpecial && cat.showPrice === false) ? null : item.price}
                        />
                      ))}
                    </div>

                    {cat.isSpecial && cat.fixedPrice && cat.showPrice !== false && (
                      <div className="menu-carousel__fixed-price">
                         <span className="price-label">Tutto compreso a</span>
                         <span className="price-value">{cat.fixedPrice}</span>
                      </div>
                    )}
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
