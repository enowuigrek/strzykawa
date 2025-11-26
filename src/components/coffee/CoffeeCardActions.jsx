import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaCheck } from 'react-icons/fa';
import { useCartStore } from '../../store/cartStore';

/**
 * CoffeeCardActions - Split button z badge i green success state
 * FINAL FIX v4:
 * - Hover NA CAŁYM buttonie (fixed height issue)
 * - Badge w dobrej pozycji (nie za nisko)
 * - Koszyk w dobrej wysokości (nie wypchany)
 */
export function CoffeeCardActions({
                                      coffee,
                                      onQuickAdd,
                                      isAdding,
                                      justAdded
                                  }) {
    const { getItemQuantity } = useCartStore();

    // Ile sztuk tej kawy jest w koszyku
    const cartQuantity = getItemQuantity(coffee.id);
    const isUnavailable = !coffee.availableForSale;

    const getCartIcon = () => {
        if (justAdded) return FaCheck;
        return FaShoppingCart;
    };

    const CartIcon = getCartIcon();

    return (
        <div className="group flex items-stretch bg-white/5 border border-white/15 rounded-full overflow-visible">
            {/* Zobacz szczegóły - LINK do produktu */}
            <Link
                to={`/kawy/${coffee.shopifyHandle || coffee.id}`}
                className="
                    flex-1 relative inline-flex items-center justify-center
                    px-4 py-2.5 text-sm font-medium text-white
                    transition-all duration-200
                    rounded-l-full
                    hover:bg-white/15
                "
            >
                <span className="relative z-10">Zobacz szczegóły</span>
            </Link>

            {/* Pionowa kreska */}
            <div
                className="w-px bg-white/20 my-auto transition-opacity duration-150 group-hover:opacity-0"
                style={{ height: '2rem' }}
            />

            {/* Ikona koszyka - Quick Add */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    if (!isUnavailable) {
                        onQuickAdd && onQuickAdd();
                    }
                }}
                disabled={isAdding || isUnavailable}
                className={`
                    relative
                    w-14 py-2.5
                    inline-flex items-center justify-center
                    text-white
                    transition-all duration-300
                    disabled:opacity-50 disabled:cursor-not-allowed
                    rounded-r-full
                    ${justAdded
                        ? 'bg-success hover:bg-success-dark'
                        : isUnavailable
                            ? 'bg-white/5'
                            : 'hover:bg-white/15'
                    }
                `}
                title={isUnavailable ? 'Produkt niedostępny' : 'Dodaj do koszyka'}
            >
                <CartIcon className="w-5 h-5" />

                {/* Badge z liczbą sztuk w koszyku */}
                {cartQuantity > 0 && !justAdded && (
                    <span className="absolute -top-1 -right-1 bg-success text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold z-20 shadow-lg pointer-events-none">
                        {cartQuantity}
                    </span>
                )}
            </button>
        </div>
    );
}

CoffeeCardActions.propTypes = {
    coffee: PropTypes.shape({
        id: PropTypes.string.isRequired,
        shopifyHandle: PropTypes.string,
        availableForSale: PropTypes.bool,
    }).isRequired,
    onQuickAdd: PropTypes.func,
    isAdding: PropTypes.bool,
    justAdded: PropTypes.bool,
};