// About.jsx — Sezione "Chi Siamo"
import './About.css'
import aboutData from '../data/about.json'

export default function About() {
  return (
    <section id="chi-siamo" className="about">
      <div className="about__inner container">

        <div className="about__text">
          <span className="section-label">{aboutData.sectionLabel}</span>
          <hr className="section-divider" />

          <h2 className="about__title">
            {aboutData.title.normal}<br />
            <em>{aboutData.title.italic}</em>
          </h2>

          {aboutData.paragraphs.map((p, index) => (
            <p key={index} className="about__body">{p}</p>
          ))}

          <div className="about__values">
            <ul className="about__values-list">
              {aboutData.values.map(val => (
                <li key={val}>{val}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="about__image-wrap">
          <div className="about__image" role="img" aria-label="Interno dell'Hostaria" />
          <div className="about__card">
            <span className="about__card-num">{aboutData.imageCard.year}</span>
            <span className="about__card-text">
              {aboutData.imageCard.text.split('\n')[0]}<br />
              {aboutData.imageCard.text.split('\n')[1]}
            </span>
          </div>
        </div>

      </div>
    </section>
  )
}
