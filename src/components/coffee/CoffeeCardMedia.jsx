import React from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { CoffeeOverlay } from './CoffeeOverlay';
import coffeePlaceholder from '../../assets/coffee-placeholder.jpg';

export function CoffeeCardMedia({ coffee, overlayOpen, onToggleOverlay }) {
    const getRoastTypeDisplay = (roastType) => {
        const mapping = { Filter: 'Przelew', Espresso: 'Espresso' };
        return mapping[roastType] || roastType || '';
    };

    const isUnavailable = !coffee.availableForSale;

    return (
        <div className="relative h-64 overflow-hidden">
            {/* Zdjęcie - klikalny link */}
            <Link
                to={`/kawy/${coffee.shopifyHandle || coffee.id}`}
                className="absolute inset-0 z-10 block"
            >
                <img
                    src={coffee.image || coffeePlaceholder}
                    alt={`Opakowanie kawy ${coffee.name}`}
                    className={`w-full h-full object-cover transition-all duration-500 hover:scale-105 ${
                        isUnavailable ? 'opacity-40 grayscale' : ''
                    }`}
                    loading="lazy"
                />
            </Link>

            {/* Overlay niedostępności */}
            {isUnavailable && (
                <div className="absolute inset-0 z-15 bg-primary-dark/40 backdrop-blur-[2px] flex items-center justify-center pointer-events-none">
                    <div className="bg-danger text-white px-6 py-3 font-bold text-lg tracking-wide shadow-lg">
                        NIEDOSTĘPNE
                    </div>
                </div>
            )}

            {/* Naklejka roast type - FADE OUT gdy overlay open */}
            {getRoastTypeDisplay(coffee.roastType) && (
                <div
                    className={`
                        absolute top-2 left-2 z-20 flex items-center justify-center
                        w-14 h-14 rounded-full text-[11px] font-bold
                        shadow-lg transform rotate-12
                        transition-opacity duration-300
                        pointer-events-none
                        ${coffee.roastType === 'Filter'
                        ? 'bg-badge-blue text-white'
                        : 'bg-badge-orange text-white'}
                    `}
                    aria-label={getRoastTypeDisplay(coffee.roastType)}
                >
                    <span className="-rotate-12 uppercase tracking-wide">
                        {getRoastTypeDisplay(coffee.roastType)}
                    </span>
                </div>
            )}

            <button
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onToggleOverlay();
                }}
                className={`
                    absolute bottom-3 right-3 w-8 h-8 rounded-full
                    flex items-center justify-center z-30
                    bg-muted/15 backdrop-blur-md text-white
                    ring-1 ring-white/10 shadow-lg
                    transition-all duration-300
                    hover:bg-white/25 hover:ring-white/20
                    ${overlayOpen ? 'bg-white/20 ring-white/25' : ''}
                `}
                aria-pressed={overlayOpen}
                aria-label={`${overlayOpen ? 'Ukryj' : 'Pokaż'} szczegóły kawy ${coffee.name}`}
            >
                {overlayOpen ? (
                    <FaEyeSlash className="w-3.5 h-3.5" />
                ) : (
                    <FaEye className="w-3.5 h-3.5 text-muted" />
                )}
            </button>

            {/* Slide-up overlay (klikalny gdy open) - z-40 */}
            <CoffeeOverlay coffee={coffee} isOpen={overlayOpen} />
        </div>
    );
}