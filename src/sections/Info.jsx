// Info.jsx — Sezione orari, indirizzo e mappa
import './Info.css'

import { PHONE_LINK, WHATSAPP_URL, ADDRESS_LINE1, ADDRESS_LINE2, CONTACT_EMAIL, MAPS_LINK, MAPS_EMBED_URL } from '../constants'
import { ClockIcon, MapPinIcon, PhoneIcon, MailIcon, MessageIcon } from '../components/Icons'
import infoData from '../data/info.json'
import globalData from '../data/global.json'

export default function Info() {
  return (
    <section id="info" className="info">
      <div className="container">

        <div className="info__header">
          <span className="section-label">{infoData.sectionLabel}</span>
          <hr className="section-divider" />
          <h2 className="info__title">{infoData.title}</h2>
        </div>

        <div className="info__grid">

          <div className="info__details">

            <div className="info__block">
              <h3 className="info__block-title" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <ClockIcon size={20} />
                {infoData.blocks.hours.title}
              </h3>
              <div className="info__hours">
                {infoData.hours.map(row => (
                  <div key={row.days} className={`info__hour-row ${row.lunch === infoData.labels.closed ? 'info__hour-row--closed' : ''}`}>
                    <span className="info__hour-day">{row.days}</span>
                    <div className="info__hour-times">
                      {row.lunch !== infoData.labels.closed ? (
                        <>
                          <span>{row.lunch}</span>
                          <span className="info__hour-sep">·</span>
                          <span>{row.dinner}</span>
                        </>
                      ) : (
                        <span className="info__hour-closed">{infoData.labels.closed}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="info__block">
              <h3 className="info__block-title" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <MapPinIcon size={20} />
                {infoData.blocks.location.title}
              </h3>
              <address className="info__address">
                <p>{ADDRESS_LINE1}</p>
                <p>{ADDRESS_LINE2}</p>
              </address>
              <a
                href={MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="info__map-link"
                aria-label={infoData.blocks.location.mapAriaLabel}
              >
                {infoData.blocks.location.mapLinkText}
              </a>
              <div style={{ marginTop: '1rem', fontStyle: 'italic', fontSize: '0.9rem', color: 'var(--color-on-surface-variant)', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <MailIcon size={16} />
                <p>{CONTACT_EMAIL}</p>
              </div>
            </div>

          </div>

          {/* Mappa Google embed — non richiede API key */}
          <div className="info__map-wrap">
            <iframe
              title={`${infoData.title} - ${globalData.brand.name}`}
              className="info__map"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              src={MAPS_EMBED_URL}
              allowFullScreen=""
              aria-hidden="false"
              tabIndex="0"
            />
          </div>

        </div>
      </div>
    </section>
  )
}
