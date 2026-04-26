// FloatingCTA.jsx — Barra flottante prenotazione (solo mobile)
import './FloatingCTA.css'

import { WHATSAPP_URL, PHONE_LINK } from '../constants'
import { PhoneIcon, MessageIcon, ArrowDownIcon } from './Icons'
import globalData from '../data/global.json'
import specialMenuData from '../data/specialEventMenu.json'
import { isSpecialMenuVisible } from '../utils/dateUtils'

export default function FloatingCTA() {
  return (
    <div className="floating-cta" role="complementary" aria-label={globalData.aria.floatingCta}>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-cta__btn floating-cta__btn--whatsapp"
        aria-label={globalData.labels.whatsappBtnFull}
        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}
      >
        <MessageIcon size={20} />
        {globalData.labels.whatsappBtn}
      </a>

      <a
        href={PHONE_LINK}
        className="floating-cta__btn floating-cta__btn--call"
        aria-label={globalData.labels.callBtnFull}
        style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}
      >
        <PhoneIcon size={20} />
        {globalData.labels.callBtn}
      </a>

      {isSpecialMenuVisible(specialMenuData) && (
        <a
          href="#menu-speciale"
          className="floating-cta__btn floating-cta__btn--special"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', justifyContent: 'center' }}
        >
          <div className="navbar__special-badge-dot" style={{ margin: 0 }} />
          <ArrowDownIcon size={20} />
        </a>
      )}
    </div>
  )
}
