// MenuItem.jsx — Singola voce del menù
// Usato dalla sezione Menu per ogni piatto
import './MenuItem.css'

export default function MenuItem({ name, description, price }) {
  return (
    <article className="menu-item">
      <div className="menu-item__top">
        {/* Nome piatto (Manrope bold) */}
        <span className="menu-item__name">{name}</span>
        {/* Prezzo (Noto Serif — enfasi premium) */}
        <span className="menu-item__price">€ {price}</span>
      </div>
      {/* Descrizione ingredienti */}
      {description && (
        <p className="menu-item__desc">{description}</p>
      )}
    </article>
  )
}
