import React, { useState } from 'react';
import { FaPlus, FaShoppingCart, FaCheck } from 'react-icons/fa';
import { useCartStore } from '../store/cartStore.js';
import coffeePlaceholder from '../assets/coffee-placeholder.jpg';

function CoffeeCard({ coffee }) {
  const [overlayOpen, setOverlayOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  // Cart store
  const { addCoffeeToCart, isInCart, getItemQuantity } = useCartStore();

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

  // Add to cart handler
  const handleAddToCart = async (e) => {
    e.stopPropagation(); // Prevent overlay toggle

    setIsAdding(true);

    // Add to cart
    addCoffeeToCart(coffee.id, 1);

    // Show feedback
    setTimeout(() => {
      setIsAdding(false);
      setJustAdded(true);

      // Reset feedback after 2 seconds
      setTimeout(() => setJustAdded(false), 2000);
    }, 800);
  };

  const currentQuantity = getItemQuantity(coffee.id);
  const inCart = isInCart(coffee.id);

  return (
      <article className="relative bg-gradient-to-br from-primary to-primary-light overflow-hidden border border-white/5 shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-accent/20 hover:-translate-y-2 hover:scale-[1.02] hover:border-white/10">

        {/* Subtle top border glow effect */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>

        {/* Media Section with Overlay */}
        <div className="relative h-64 overflow-hidden">
          <img
              src={coffee.image || coffeePlaceholder}
              alt={`Opakowanie kawy ${coffee.name}`}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              loading="lazy"
          />

          {/* Mobile Info Button */}
          <button
              className="md:hidden absolute top-3 right-3 w-8 h-8 border border-white/60 bg-black/40 backdrop-blur-sm text-white font-bold text-sm flex items-center justify-center z-30 transition-all duration-200 hover:bg-black/60 hover:scale-110 hover:border-white/80 rounded-full"
              onClick={toggleOverlay}
              aria-label={`${overlayOpen ? 'Ukryj' : 'Pokaż'} szczegóły kawy ${coffee.name}`}
          >
            i
          </button>

          {/* Add to Cart Button */}
          <button
              onClick={handleAddToCart}
              disabled={isAdding}
              className={`
                absolute top-3 left-3 w-10 h-10 border backdrop-blur-sm text-white font-bold text-sm 
                flex items-center justify-center z-30 transition-all duration-300 rounded-full
                ${justAdded
                  ? 'bg-green-500 border-green-400 scale-110'
                  : isAdding
                      ? 'bg-accent/80 border-accent animate-pulse'
                      : inCart
                          ? 'bg-accent border-accent/80 hover:scale-110'
                          : 'bg-black/40 border-white/60 hover:bg-accent hover:border-accent hover:scale-110'
              }
              `}
              aria-label={`Dodaj ${coffee.name} do koszyka`}
          >
            {isAdding ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : justAdded ? (
                <FaCheck className="w-4 h-4" />
            ) : inCart ? (
                <span className="text-xs font-bold">{currentQuantity}</span>
            ) : (
                <FaPlus className="w-4 h-4" />
            )}
          </button>

          {/* Hover/Focus Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t from-primary-dark/95 via-primary/80 to-primary/60 backdrop-blur-md border-t border-white/10 transition-transform duration-300 ease-out ${overlayOpen ? 'translate-y-0' : 'translate-y-full'} hover:translate-y-0`}>
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
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-xl font-semibold text-white leading-tight flex-grow">{coffee.name}</h3>

            {/* Price */}
            <div className="text-right flex-shrink-0">
              <span className="text-xl font-bold text-white">24.99 zł</span>
              <span className="block text-xs text-muted">250g</span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <span className="text-muted">{getOriginDisplay(coffee.origin)}</span>
            {getRoastTypeDisplay(coffee.roastType) && (
                <span className="inline-flex items-center px-2 py-1 bg-accent/20 border border-accent/30 text-accent text-xs font-medium rounded-full">
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

          {/* Add to Cart Button for Bottom */}
          <div className="pt-2">
            <button
                onClick={handleAddToCart}
                disabled={isAdding}
                className={`
                  w-full py-3 px-4 font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2
                  ${justAdded
                    ? 'bg-green-500 hover:bg-green-600'
                    : isAdding
                        ? 'bg-accent/80 cursor-not-allowed'
                        : 'bg-gradient-to-r from-accent to-muted hover:from-muted hover:to-accent hover:shadow-lg hover:shadow-accent/25'
                }
                  ${!isAdding && !justAdded ? 'hover:scale-105' : ''}
                  disabled:opacity-70 rounded-lg
                `}
            >
              {isAdding ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Dodawanie...</span>
                  </>
              ) : justAdded ? (
                  <>
                    <FaCheck className="w-4 h-4" />
                    <span>Dodano do koszyka</span>
                  </>
              ) : inCart ? (
                  <>
                    <FaShoppingCart className="w-4 h-4" />
                    <span>Dodaj kolejną ({currentQuantity} w koszyku)</span>
                  </>
              ) : (
                  <>
                    <FaShoppingCart className="w-4 h-4" />
                    <span>Dodaj do koszyka</span>
                  </>
              )}
            </button>
          </div>
        </div>
      </article>
  );
}

export default CoffeeCard;