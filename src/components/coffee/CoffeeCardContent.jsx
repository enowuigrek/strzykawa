import React from 'react';
import { Link } from 'react-router-dom';

/**
 * CoffeeCardContent - Better spacing and typography
 */
export function CoffeeCardContent({ coffee }) {
    // Get price - najniższa cena z wariantów
    const getPrice = () => {
        if (!coffee.variants || coffee.variants.length === 0) {
            return { prefix: '', value: '0.00' };
        }

        const prices = coffee.variants.map((v) => parseFloat(v.price));
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);

        if (minPrice === maxPrice) {
            return { prefix: '', value: minPrice.toFixed(2) };
        }

        return { prefix: 'od', value: minPrice.toFixed(2) };
    };

    return (
        <div className="p-5 space-y-3">
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
            <div className="flex items-baseline gap-2">
                {(() => {
                    const price = getPrice();
                    return (
                        <>
                            {price.prefix && (
                                <span className="text-sm text-muted uppercase tracking-wide">
                                    {price.prefix}
                                </span>
                            )}
                            <span className="text-xl md:text-2xl text-accent font-semibold">
                                {price.value} zł
                            </span>
                        </>
                    );
                })()}
            </div>
        </div>
    );
}