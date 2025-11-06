import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaCheck } from 'react-icons/fa';

/**
 * CoffeeCardActions - Jedna pastylka z kreską pionową
 * Lewo: Zobacz szczegóły (link do produktu) | Prawo: Ikona koszyka (quick add)
 */
export function CoffeeCardActions({
                                      coffee,
                                      onQuickAdd,
                                      isAdding,
                                      justAdded
                                  }) {
    const getCartIcon = () => {
        if (justAdded) return FaCheck;
        return FaShoppingCart;
    };

    const CartIcon = getCartIcon();

    return (
        <div className="flex items-center bg-white/10 border border-white/20 rounded-full overflow-hidden">
            {/* Zobacz szczegóły - LINK do produktu */}
            <Link
                to={`/kawy/${coffee.shopifyHandle || coffee.id}`}
                className="
                    flex-1 group relative inline-flex items-center justify-center
                    px-4 py-2.5 text-sm font-medium text-white
                    hover:bg-white/10
                    transition-all duration-200
                "
            >
                Zobacz szczegóły
            </Link>

            {/* Pionowa kreska */}
            <div className="w-px h-8 bg-white/20" />

            {/* Ikona koszyka - Quick Add */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onQuickAdd && onQuickAdd();
                }}
                disabled={isAdding}
                className={`
                    group relative inline-flex items-center justify-center
                    w-14 h-full
                    text-white
                    hover:bg-white/10
                    transition-all duration-200
                    disabled:opacity-50 disabled:cursor-not-allowed
                `}
            >
                <CartIcon className="w-5 h-5" />
            </button>
        </div>
    );
}