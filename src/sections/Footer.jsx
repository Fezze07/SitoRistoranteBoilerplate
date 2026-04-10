// Footer.jsx — Footer con social, info rapide e copyright
import './Footer.css'

import { WHATSAPP_URL, PHONE_LINK, FACEBOOK_URL, INSTAGRAM_URL, ADDRESS_LINE1, ADDRESS_LINE2 } from '../constants'
import { PhoneIcon, MessageIcon } from '../components/Icons'
import footerData from '../data/footer.json'
import globalData from '../data/global.json'

const SOCIAL_LINKS = [
  {
    id: 'instagram',
    label: 'Instagram',
    href: INSTAGRAM_URL,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    id: 'facebook',
    label: 'Facebook',
    href: FACEBOOK_URL,
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
]

const CURRENT_YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container">
        <div className="footer__inner">

          <div className="footer__brand">
            <h2 className="footer__name">{globalData.brand.name}</h2>
            <p className="footer__tagline">{globalData.brand.tagline} · {globalData.brand.subLocality.split('·')[0].trim()}</p>

            <div className="footer__social" aria-label={globalData.aria.social}>
              {SOCIAL_LINKS.map(s => (
                <a
                  key={s.id}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="footer__social-link"
                  aria-label={`Seguici su ${s.label}`}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <nav className="footer__nav" aria-label={globalData.aria.quickLinks}>
            <h3 className="footer__nav-title">{footerData.exploreTitle}</h3>
            <ul className="footer__nav-list" role="list">
              {globalData.navLinks.map(l => (
                <li key={l.href}>
                  <a href={l.href} className="footer__nav-link">{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer__contact">
            <h3 className="footer__nav-title">{footerData.contactsTitle}</h3>
            <address className="footer__address">
              <p>{ADDRESS_LINE1}</p>
              <p>{ADDRESS_LINE2}</p>
            </address>
            <div className="footer__actions">
              <a href={PHONE_LINK} className="footer__action-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <PhoneIcon size={18} />
                {globalData.labels.callBtnFull}
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="footer__action-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <MessageIcon size={18} />
                {globalData.labels.whatsappBtn}
              </a>
            </div>
          </div>

        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            © {CURRENT_YEAR} {footerData.copyrightPrefix}
          </p>
          <p className="footer__credit">
            {footerData.credit}
          </p>
        </div>

      </div>
    </footer>
  )
}
