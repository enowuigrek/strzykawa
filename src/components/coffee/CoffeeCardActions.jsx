import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaCheck, FaInfoCircle } from 'react-icons/fa';

/**
 * CoffeeCardActions - Split button: "Zobacz szczegóły" + ikona koszyka
 *
 * Layout:
 * ┌────────────────────┬─────────┐
 * │ Zobacz szczegóły   │   🛒    │
 * └────────────────────┴─────────┘
 */
export function CoffeeCardActions({
                                      coffee, // ✅ Dodane - potrzebne do Linka
                                      onAddToCart,
                                      isAdding,
                                      justAdded,
                                      inCart,
                                      currentQuantity
                                  }) {

    const getCartIcon = () => {
        if (justAdded) return FaCheck;
        return FaShoppingCart;
    };

    const getCartButtonClass = () => {
        const baseClasses = "px-4 py-3 transition-all duration-200 flex items-center justify-center";

        if (justAdded) {
            return `${baseClasses} bg-green-500 text-white`;
        }
        if (isAdding) {
            return `${baseClasses} bg-accent/50 text-white cursor-wait`;
        }
        return `${baseClasses} bg-accent text-white hover:bg-accent/80`;
    };

    const CartIcon = getCartIcon();

    return (
        <div className="flex items-stretch h-[48px] bg-white/10 border border-white/20 rounded-full overflow-hidden">

            {/* Left: Zobacz szczegóły - WIĘKSZY (70%) */}
            <Link
                to={`/kawy/${coffee.shopifyHandle}`}
                className="flex-1 px-4 py-3 text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2 text-white hover:bg-white/20"
            >
                <FaInfoCircle className="w-4 h-4" />
                <span>Zobacz szczegóły</span>
            </Link>

            {/* Vertical divider */}
            <div className="w-px bg-white/20" />

            {/* Right: Dodaj do koszyka - MNIEJSZY (30%) */}
            <button
                onClick={onAddToCart}
                disabled={isAdding}
                className={getCartButtonClass()}
                title={inCart ? `W koszyku: ${currentQuantity}` : 'Dodaj do koszyka'}
                aria-label={inCart ? `Dodaj kolejną (${currentQuantity} w koszyku)` : 'Dodaj do koszyka'}
            >
                {isAdding ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                    <div className="relative">
                        <CartIcon className="w-5 h-5" />
                        {/* Badge z ilością w koszyku */}
                        {inCart && !justAdded && (
                            <span className="absolute -top-2 -right-2 w-4 h-4 bg-white text-accent text-[10px] font-bold rounded-full flex items-center justify-center">
                                {currentQuantity}
                            </span>
                        )}
                    </div>
                )}
            </button>
        </div>
    );
}