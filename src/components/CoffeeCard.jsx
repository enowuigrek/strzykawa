import React, { useState } from 'react';

/**
 * CoffeeCard (new schema)
 * Visible (no hover): image, name, countries, roastType (Filter/Espresso), tasting notes.
 * On hover: slide-up panel with extra details (region, processing, variety, altitude, availability).
 */
function uniqueList(arr = []) {
  return Array.from(new Set(arr.filter(Boolean)));
}

function getCountries(coffee) {
  const countries = (coffee.origin || []).map(o => o.country).filter(Boolean);
  return uniqueList(countries).join(', ');
}

function getRegions(coffee) {
  const regions = (coffee.origin || []).map(o => o.region).filter(Boolean);
  return uniqueList(regions).join(', ');
}

function getProcessings(coffee) {
  const procs = (coffee.origin || []).map(o => o.processing).filter(Boolean);
  return uniqueList(procs).join(', ');
}

function getVarieties(coffee) {
  const vars = (coffee.origin || []).flatMap(o => o.variety || []).filter(Boolean);
  return uniqueList(vars).join(', ');
}

function getAltitude(coffee) {
  // For simplicity take first non-empty altitude
  const alt = (coffee.origin || []).map(o => o.altitudeMasl).find(v => v != null);
  return typeof alt === 'number' ? `${alt} masl` : alt || '';
}

function getFarms(coffee) {
  const farms = (coffee.origin || []).map(o => o.farm).filter(Boolean);
  return Array.from(new Set(farms)).join(', ');
}

function getSpecies(coffee) {
  return Array.from(new Set((coffee.species || []).filter(Boolean))).join(', ');
}

export default function CoffeeCard({ coffee }) {
  const [open, setOpen] = useState(false);

  const roastMap = { Filter: 'Przelew', Espresso: 'Espresso' };

  const countries = getCountries(coffee) || '—';
  const regions = getRegions(coffee);
  const processing = getProcessings(coffee);
  const varieties = getVarieties(coffee);
  const altitude = getAltitude(coffee);
  const farms = getFarms(coffee);
  const species = getSpecies(coffee);
  const roastType = roastMap[coffee.roastType] || coffee.roastType || '—';
  const roastLevel = coffee.roastLevel || '';
  const notes = (coffee.tastingNotes || []).join(' · ');

  return (
    <div className="coffee-card">
      <div className="coffee-card-media">
        <img src={coffee.image} alt={coffee.name} />
        <button
          type="button"
          className="info-btn"
          aria-label="Show details"
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpen(v => !v); }}
        >
          i
        </button>
        {/* CSS should ensure .coffee-card-overlay.open is visible on mobile and .info-btn is positioned top-right over the image */}
        <div className={`coffee-card-overlay ${open ? 'open' : ''}`}>
          <div className="overlay-content">
            <dl className="meta">
              {regions && (<><dt>Region</dt><dd>{regions}</dd></>)}
              {processing && (<><dt>Obróbka</dt><dd>{processing}</dd></>)}
              {varieties && (<><dt>Odmiana</dt><dd>{varieties}</dd></>)}
              {farms && (<><dt>Farma</dt><dd>{farms}</dd></>)}
              {species && (<><dt>Species</dt><dd>{species}</dd></>)}
              {altitude && (<><dt>Wysokość</dt><dd>{altitude}</dd></>)}
              {(roastLevel || roastType) && (
                <>
                  <dt>Wypał</dt>
                  <dd>{[roastLevel, roastType].filter(Boolean).join(' • ')}</dd>
                </>
              )}
            </dl>
          </div>
        </div>
      </div>

      <div className="coffee-card-content">
        <h3 className="coffee-title">{coffee.name}</h3>
        <div className="coffee-sub">{countries} • {roastType}</div>
        {notes && <p className="coffee-profile">{notes}</p>}
      </div>
    </div>
  );
}