// Navbar.jsx — Navigazione con glassmorphism e drawer mobile
import { useState, useEffect } from 'react'
import './Navbar.css'

import { WHATSAPP_URL, PHONE_LINK } from '../constants'
import globalData from '../data/global.json'
import { PhoneIcon, MessageIcon } from './Icons'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  // Aggiunge la classe CSS "scrolled" dopo 20px di scroll (attiva lo sfondo glassmorphism)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Chiude il drawer mobile quando l'utente naviga a una sezione
  const closeDrawer = () => setDrawerOpen(false)

  return (
    <>
      <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} role="navigation" aria-label={globalData.aria.mainNav}>
        <div className="navbar__inner">

          <a href="#top" className="navbar__logo" onClick={closeDrawer}>
            <span className="navbar__logo-name">{globalData.brand.name}</span>
            <span className="navbar__logo-sub">{globalData.brand.subLocality}</span>
          </a>

          <ul className="navbar__links" role="list">
            {globalData.navLinks.map(link => (
              <li key={link.href}>
                <a href={link.href} className="navbar__link">{link.label}</a>
              </li>
            ))}
          </ul>

          <a href={PHONE_LINK}
            className="btn-primary navbar__cta" aria-label={globalData.labels.callBtnFull}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <PhoneIcon size={18} />
            {globalData.labels.callBtn}
          </a>

          <button
            className={`navbar__hamburger ${drawerOpen ? 'open' : ''}`}
            onClick={() => setDrawerOpen(prev => !prev)}
            aria-label={drawerOpen ? globalData.aria.closeMenu : globalData.aria.openMenu}
            aria-expanded={drawerOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div className={`navbar__drawer ${drawerOpen ? 'open' : ''}`} aria-hidden={!drawerOpen}>
        {globalData.navLinks.map(link => (
          <a key={link.href} href={link.href} className="navbar__drawer-link" onClick={closeDrawer}>
            {link.label}
          </a>
        ))}
        <div className="navbar__drawer-actions">
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
            className="btn-primary" onClick={closeDrawer}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
            <MessageIcon size={18} />
            {globalData.labels.whatsappBtnFull}
          </a>
          <a href={PHONE_LINK} className="btn-secondary" onClick={closeDrawer}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
            <PhoneIcon size={18} />
            {globalData.labels.callBtnFull}
          </a>
        </div>
      </div>
    </>
  )
}
