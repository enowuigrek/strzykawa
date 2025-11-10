import React from 'react';
import { Link } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { CoffeeOverlay } from './CoffeeOverlay';
import coffeePlaceholder from '../../assets/coffee-placeholder.jpg';

/**
 * CoffeeCardMedia - zdjęcie klikalane, oczko toggle, overlay klikalny
 * FIXED: z-index hierarchy (oczko z-50, overlay z-40, naklejka z-20, zdjęcie z-10)
 */
export function CoffeeCardMedia({ coffee, overlayOpen, onToggleOverlay }) {
    const getRoastTypeDisplay = (roastType) => {
        const mapping = { Filter: 'Przelew', Espresso: 'Espresso' };
        return mapping[roastType] || roastType || '';
    };

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
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                />
            </Link>

            {/* Naklejka roast type - FADE OUT gdy overlay open */}
            {getRoastTypeDisplay(coffee.roastType) && (
                <div
                    className={`
                        absolute top-2 left-2 z-20 flex items-center justify-center
                        w-14 h-14 rounded-full text-[11px] font-bold
                        shadow-lg transform rotate-12
                        transition-opacity duration-300
                        pointer-events-none
                        ${overlayOpen ? 'opacity-0' : 'opacity-100'}
                        ${coffee.roastType === 'Filter'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gradient-to-br from-amber-600 to-amber-800 text-white'}
                    `}
                    aria-label={getRoastTypeDisplay(coffee.roastType)}
                >
                    <span className="-rotate-12 uppercase tracking-wide">
                        {getRoastTypeDisplay(coffee.roastType)}
                    </span>
                </div>
            )}

            {/* OCZKO - toggle overlay - ZAWSZE NA WIERZCHU (z-50) */}
            <button
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onToggleOverlay();
                }}
                className={`
                    absolute bottom-3 right-3 w-8 h-8 rounded-full
                    flex items-center justify-center z-50
                    bg-white/15 backdrop-blur-md text-white
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