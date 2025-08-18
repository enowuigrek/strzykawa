import React, { useState } from 'react';
import coffeePlaceholder from '../assets/coffee-placeholder.jpg';

function CoffeeCard({ coffee }) {
  const [overlayOpen, setOverlayOpen] = useState(false);

  // Helper functions for data processing
  const getOriginDisplay = (origin) => {
    if (!origin || !origin.length) return '';
    return origin.map(o => o.country).filter(Boolean).join(', ');
  };

  const getVarietyDisplay = (origin) => {
    if (!origin || !origin.length) return '';
    const varieties = origin.flatMap(o => o.variety || []).filter(Boolean);
    return varieties.length ? varieties.join(', ') : '';
  };

  const getProcessingDisplay = (origin) => {
    if (!origin || !origin.length) return '';
    const processing = origin.map(o => o.processing).filter(Boolean);
    return processing.length ? processing[0] : '';
  };

  const getRegionDisplay = (origin) => {
    if (!origin || !origin.length) return '';
    const regions = origin.map(o => o.region).filter(Boolean);
    return regions.length ? regions.join(', ') : '';
  };

  const getFarmDisplay = (origin) => {
    if (!origin || !origin.length) return '';
    const farms = origin.map(o => o.farm).filter(Boolean);
    return farms.length ? farms.join(', ') : '';
  };

  const getAltitudeDisplay = (origin) => {
    if (!origin || !origin.length) return '';
    const altitudes = origin.map(o => o.altitudeMasl).filter(Boolean);
    return altitudes.length ? `${altitudes[0]} m n.p.m.` : '';
  };

  const getRoastTypeDisplay = (roastType) => {
    const mapping = { 'Filter': 'Przelew', 'Espresso': 'Espresso' };
    return mapping[roastType] || roastType || '';
  };

  const toggleOverlay = () => setOverlayOpen(!overlayOpen);

  return (
      <article className="group relative bg-gradient-to-br from-primary to-primary-light rounded-xl overflow-hidden border border-white/5 shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-accent/20 hover:-translate-y-2 hover:scale-[1.02] hover:border-white/10">

        {/* Subtle top border glow effect */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Media Section with Overlay */}
        <div className="relative h-64 overflow-hidden">
          <img
              src={coffee.image || coffeePlaceholder}
              alt={`Opakowanie kawy ${coffee.name}`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
          />

          {/* Mobile Info Button */}
          <button
              className="md:hidden absolute top-3 right-3 w-8 h-8 rounded-full border border-white/60 bg-black/40 backdrop-blur-sm text-white font-bold text-sm flex items-center justify-center z-30 transition-all duration-200 hover:bg-black/60 hover:scale-110 hover:border-white/80"
              onClick={toggleOverlay}
              aria-label={`${overlayOpen ? 'Ukryj' : 'Pokaż'} szczegóły kawy ${coffee.name}`}
          >
            i
          </button>

          {/* Hover/Focus Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t from-primary-dark/95 via-primary/80 to-primary/60 backdrop-blur-md border-t border-white/10 transition-transform duration-300 ease-out ${overlayOpen ? 'translate-y-0' : 'translate-y-full'} group-hover:translate-y-0 group-focus-within:translate-y-0`}>
            <div className="p-4 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent">
              <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
                {getRegionDisplay(coffee.origin) && (
                    <>
                      <dt className="font-semibold text-muted opacity-90">Region:</dt>
                      <dd className="text-white">{getRegionDisplay(coffee.origin)}</dd>
                    </>
                )}

                {getProcessingDisplay(coffee.origin) && (
                    <>
                      <dt className="font-semibold text-muted opacity-90">Obróbka:</dt>
                      <dd className="text-white">{getProcessingDisplay(coffee.origin)}</dd>
                    </>
                )}

                {getVarietyDisplay(coffee.origin) && (
                    <>
                      <dt className="font-semibold text-muted opacity-90">Odmiana:</dt>
                      <dd className="text-white">{getVarietyDisplay(coffee.origin)}</dd>
                    </>
                )}

                {getFarmDisplay(coffee.origin) && (
                    <>
                      <dt className="font-semibold text-muted opacity-90">Farma:</dt>
                      <dd className="text-white">{getFarmDisplay(coffee.origin)}</dd>
                    </>
                )}

                {coffee.species && coffee.species.length > 0 && (
                    <>
                      <dt className="font-semibold text-muted opacity-90">Gatunek:</dt>
                      <dd className="text-white">{coffee.species.join(', ')}</dd>
                    </>
                )}

                {getAltitudeDisplay(coffee.origin) && (
                    <>
                      <dt className="font-semibold text-muted opacity-90">Wysokość:</dt>
                      <dd className="text-white">{getAltitudeDisplay(coffee.origin)}</dd>
                    </>
                )}

                {coffee.roastLevel && (
                    <>
                      <dt className="font-semibold text-muted opacity-90">Wypał:</dt>
                      <dd className="text-white">{coffee.roastLevel}</dd>
                    </>
                )}
              </dl>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-4 space-y-3">
          <h3 className="text-xl font-semibold text-white leading-tight">{coffee.name}</h3>

          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted">{getOriginDisplay(coffee.origin)}</span>
            {getRoastTypeDisplay(coffee.roastType) && (
                <span className="inline-flex items-center px-2 py-1 rounded-md bg-accent/20 border border-accent/30 text-accent text-xs font-medium">
              {getRoastTypeDisplay(coffee.roastType)}
            </span>
            )}
          </div>

          {coffee.tastingNotes && coffee.tastingNotes.length > 0 && (
              <div className="space-y-1">
                <span className="text-xs font-semibold text-muted uppercase tracking-wider">Nuty smakowe</span>
                <p className="text-sm text-white leading-relaxed">{coffee.tastingNotes.join(', ')}</p>
              </div>
          )}

          {coffee.description && (
              <p className="text-sm text-muted/90 leading-relaxed">{coffee.description}</p>
          )}
        </div>
      </article>
  );
}

export default CoffeeCard;