import React from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { CoffeeOverlay } from './CoffeeOverlay';
import coffeePlaceholder from '../../assets/coffee-placeholder.jpg';

export function CoffeeCardMedia({
                                    coffee,
                                    overlayOpen,
                                    onToggleOverlay,
                                    onAddToCart,
                                    isAdding,
                                    justAdded,
                                    inCart,
                                    currentQuantity,
                                }) {
    const getRoastTypeDisplay = (roastType) => {
        const mapping = { Filter: 'Przelew', Espresso: 'Espresso' };
        return mapping[roastType] || roastType || '';
    };

    return (
        <div className="relative h-64 overflow-hidden cursor-pointer">
            <img
                src={coffee.image || coffeePlaceholder}
                alt={`Opakowanie kawy ${coffee.name}`}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
            />

            {/* Roast Type Badge (naklejka) */}
            {getRoastTypeDisplay(coffee.roastType) && (
                <div
                    className={`
            absolute top-3 left-3 z-20 flex items-center justify-center
            w-16 h-16 rounded-full text-sm font-bold
            border border-white/20 shadow-[4px_4px_10px_rgba(0,0,0,0.35)]
            transition-transform duration-300
            ${overlayOpen ? 'rotate-[55deg]' : 'rotate-[45deg]'}
            ${coffee.roastType === 'Filter'
                        ? 'bg-blue-500 text-white'
                        : 'bg-amber-900 text-white'}
          `}
                    aria-label={getRoastTypeDisplay(coffee.roastType)}
                >
                    {/* Tekst celowo lekko po skosie względem naklejki */}
                    <span className="-rotate-[40deg] tracking-wide">
            {getRoastTypeDisplay(coffee.roastType)}
          </span>
                </div>
            )}

            {/* Details Toggle */}
            <button
                className={`absolute bottom-3 right-3 w-8 h-8 rounded-full
          flex items-center justify-center z-20
          bg-gradient-to-br from-white/15 to-black/20 text-white/90 backdrop-blur-md
          ring-1 ring-white/10 shadow-[0_4px_10px_rgba(0,0,0,0.4)]
          transition-all duration-300
          hover:bg-white/25 hover:ring-white/20 hover:shadow-[0_6px_14px_rgba(0,0,0,0.5)]
          active:scale-95
          ${overlayOpen ? 'bg-white/20 ring-white/25' : ''}`}
                onClick={onToggleOverlay}
                aria-pressed={overlayOpen}
                aria-label={`${overlayOpen ? 'Ukryj' : 'Pokaż'} szczegóły kawy ${coffee.name}`}
                title={overlayOpen ? 'Ukryj szczegóły' : 'Pokaż szczegóły'}
            >
                {overlayOpen ? (
                    <FaEyeSlash className="w-3.5 h-3.5" />
                ) : (
                    <FaEye className="w-3.5 h-3.5 text-muted" />
                )}
            </button>

            {/* Cart Quantity Indicator */}
            {inCart && (
                <div className="absolute bottom-3 right-3 w-6 h-6 bg-accent border border-accent/80 rounded-full flex items-center justify-center z-20">
                    <span className="text-white text-xs font-bold">{currentQuantity}</span>
                </div>
            )}

            <CoffeeOverlay coffee={coffee} isOpen={overlayOpen} />
        </div>
    );
}