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
                                    currentQuantity
                                }) {

    const getRoastTypeDisplay = (roastType) => {
        const mapping = { 'Filter': 'Przelew', 'Espresso': 'Espresso' };
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

            {/* Roast Type Badge - lewy górny róg */}
            {getRoastTypeDisplay(coffee.roastType) && (
                <div className={`absolute top-3 left-3 px-3 py-1 text-xs font-bold rounded-full z-20 ${
                    coffee.roastType === 'Filter'
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-300 text-gray-800'
                }`}>
                    {getRoastTypeDisplay(coffee.roastType)}
                </div>
            )}

            {/* Details Toggle - prawy górny róg */}
            <button
                className="absolute top-3 right-3 w-8 h-8 border border-white/60 bg-black/40 backdrop-blur-sm text-white font-bold text-sm flex items-center justify-center z-20 transition-all duration-200 hover:bg-black/60 hover:scale-110 hover:border-white/80 rounded-full"
                onClick={onToggleOverlay}
                aria-label={`${overlayOpen ? 'Ukryj' : 'Pokaż'} szczegóły kawy ${coffee.name}`}
            >
                {overlayOpen ? <FaEyeSlash className="w-3 h-3" /> : <FaEye className="w-3 h-3" />}
            </button>

            {/* Cart Quantity Indicator - tylko jeśli w koszyku */}
            {inCart && (
                <div className="absolute bottom-3 right-3 w-6 h-6 bg-accent border border-accent/80 rounded-full flex items-center justify-center z-20">
                    <span className="text-white text-xs font-bold">{currentQuantity}</span>
                </div>
            )}

            <CoffeeOverlay
                coffee={coffee}
                isOpen={overlayOpen}
            />
        </div>
    );
}