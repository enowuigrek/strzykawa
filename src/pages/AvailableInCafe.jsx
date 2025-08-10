import React from 'react';
import { FaMugHot, FaTint, FaFlask, FaBoxOpen } from 'react-icons/fa';
import coffees from '../data/coffees.js';
import CoffeeCard from '../components/CoffeeCard.jsx';

const sections = [
  { key: 'espressoGrinders', title: 'Na młynkach (espresso)', descr: 'Kawy aktualnie na młynkach — pod espresso i mleczne.', icon: FaMugHot,  accent: 'espresso' },
  { key: 'quickFilter',      title: 'Szybki przelew',           descr: 'Batch brew / szybki przelew dostępny od ręki.',       icon: FaTint,    accent: 'batch'    },
  { key: 'brewBar',          title: 'Do parzenia na miejscu',   descr: 'Drip, Aeropress i inne metody w brew barze.',        icon: FaFlask,   accent: 'brewbar'  },
  { key: 'retailShelf',      title: 'Na półce (w paczkach)',    descr: 'Kawy dostępne do zakupu na wynos.',                  icon: FaBoxOpen, accent: 'shelf'    }
];

function filterByAvailability(key) {
  return coffees.filter(c => c.availability && c.availability[key]);
}

export default function AvailableInCafe() {
  return (
    <div className="available-page container">
      <div className="available-intro">
        <h1>Dostępne w kawiarni</h1>
        <p>Co dziś wypijesz w Strzykawie? Zobacz, co jest teraz na młynkach, na szybkim przelewie, do parzenia w brew barze i na półce.</p>
      </div>

      {sections.map(({ key, title, descr, icon: Icon, accent }) => {
        const items = filterByAvailability(key);
        return (
          <section key={key} className={`available-section accent-${accent}`}>
            <div className="section-head">
              <div className="icon-wrap"><Icon aria-hidden /></div>
              <div className="titles">
                <h2>{title}</h2>
                <p className="muted">{descr}</p>
              </div>
              <span className="count-badge" aria-label={`Liczba kaw: ${items.length}`}>{items.length}</span>
            </div>

            {items.length ? (
              <div className="coffee-grid">
                {items.map(c => (<CoffeeCard key={c.id} coffee={c} />))}
              </div>
            ) : (
              <div className="empty">Aktualnie brak pozycji w tej kategorii.</div>
            )}
          </section>
        );
      })}
    </div>
  );
}