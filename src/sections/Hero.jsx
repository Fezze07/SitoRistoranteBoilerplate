// Hero.jsx — Sezione principale con immagine di sfondo e CTA
import './Hero.css'

import { WHATSAPP_URL, PHONE_LINK } from '../constants'
import { PhoneIcon, MessageIcon } from '../components/Icons'
import heroData from '../data/hero.json'
import globalData from '../data/global.json'

export default function Hero() {
  return (
    <section id="top" className="hero" aria-label={heroData.aria.section}>
      <div className="hero__bg" role="img" aria-label={heroData.aria.bgImage} />

      {/* Gradiente per garantire la leggibilità del testo sull'immagine */}
      <div className="hero__overlay" />

      <div className="hero__content container">
        <span className="hero__label">{heroData.contextLabel}</span>

        <h1 className="hero__title">
          {heroData.title.normal}<br />
          <em>{heroData.title.italic}</em>
        </h1>

        <p className="hero__tagline">
          {heroData.tagline[0]}<br className="hide-mobile" />
          {heroData.tagline[1]}
        </p>

        {/* Su mobile questi bottoni sono nascosti: usa la FloatingCTA */}
        <div className="hero__actions">
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary hero__btn"
            id="hero-cta-whatsapp"
            aria-label={globalData.labels.whatsappBtnFull}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}
          >
            <MessageIcon size={20} />
            {globalData.labels.whatsappBtnFull}
          </a>
          <a
            href={PHONE_LINK}
            className="btn-secondary hero__btn hero__btn--outline"
            id="hero-cta-phone"
            aria-label={globalData.labels.callBtnFull}
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}
          >
            <PhoneIcon size={20} />
            {globalData.labels.callBtnFull}
          </a>
        </div>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <span className="hero__scroll-line" />
        <span className="hero__scroll-text">{heroData.scrollText}</span>
      </div>
    </section>
  )
}
