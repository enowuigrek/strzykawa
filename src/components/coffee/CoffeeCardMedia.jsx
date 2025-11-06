import React from 'react';
import { CoffeeOverlay } from './CoffeeOverlay';
import coffeePlaceholder from '../../assets/coffee-placeholder.jpg';

/**
 * CoffeeCardMedia - naklejka znika gdy overlay open
 */
export function CoffeeCardMedia({ coffee, overlayOpen, onToggleOverlay }) {
    const getRoastTypeDisplay = (roastType) => {
        const mapping = { Filter: 'Przelew', Espresso: 'Espresso' };
        return mapping[roastType] || roastType || '';
    };

    return (
        <div className="relative h-64 overflow-hidden">
            <img
                src={coffee.image || coffeePlaceholder}
                alt={`Opakowanie kawy ${coffee.name}`}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                loading="lazy"
            />

            {/* Naklejka roast type - FADE OUT gdy overlay open */}
            {getRoastTypeDisplay(coffee.roastType) && (
                <div
                    className={`
                        absolute top-2 left-2 z-20 flex items-center justify-center
                        w-14 h-14 rounded-full text-[11px] font-bold
                        shadow-lg transform rotate-12
                        transition-opacity duration-300
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

            {/* Slide-up overlay */}
            <CoffeeOverlay coffee={coffee} isOpen={overlayOpen} />
        </div>
    );
}