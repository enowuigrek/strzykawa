import React from 'react';
import { FaPlus, FaCheck } from 'react-icons/fa';
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
    return (
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
                onClick={onToggleOverlay}
                aria-label={`${overlayOpen ? 'Ukryj' : 'Pokaż'} szczegóły kawy ${coffee.name}`}
            >
                i
            </button>

            {/* Add to Cart Button */}
            <button
                onClick={onAddToCart}
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

            <CoffeeOverlay
                coffee={coffee}
                isOpen={overlayOpen}
            />
        </div>
    );
}