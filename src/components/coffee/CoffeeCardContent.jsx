import React from 'react';
import { Link } from 'react-router-dom';

/**
 * CoffeeCardContent - Better spacing and typography
 */
export function CoffeeCardContent({ coffee }) {
    // Get price - najniższa cena z wariantów
    const getPrice = () => {
        if (!coffee.variants || coffee.variants.length === 0) {
            return '0.00';
        }

        const prices = coffee.variants.map(v => parseFloat(v.price));
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);

        if (minPrice === maxPrice) {
            return minPrice.toFixed(2);
        }

        return `od ${minPrice.toFixed(2)}`;
    };

    return (
        <div className="p-5 space-y-4">
            {/* Nazwa - klikalana */}
            <Link
                to={`/kawy/${coffee.shopifyHandle || coffee.id}`}
                className="block hover:text-accent transition-colors"
            >
                <h3 className="text-xl md:text-2xl  text-white leading-tight">
                    {coffee.name}
                </h3>
            </Link>

            {/* Cena */}
            <div>
                <span className="text-xl md:text-xl text-muted">
                    {getPrice()} zł
                </span>
            </div>
        </div>
    );
}