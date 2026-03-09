import React from 'react';
import { Link } from 'react-router-dom';
import { trackSelectItem } from '../../utils/analytics';

/**
 * CoffeeCardContent - Better spacing and typography
 */
export function CoffeeCardContent({ coffee }) {
    // Get price - najniższa cena z wariantów + compareAtPrice dla promocji
    const getPrice = () => {
        const variants = coffee.variants || [];
        if (variants.length === 0) {
            return { prefix: '', value: '0.00', compareAtPrice: null };
        }

        const prices = variants.map((v) => parseFloat(v.price));
        const minPrice = Math.min(...prices);
        const maxPrice = Math.max(...prices);
        const cheapestVariant = variants.find((v) => parseFloat(v.price) === minPrice);

        return {
            prefix: minPrice !== maxPrice ? 'od' : '',
            value: minPrice.toFixed(2),
            compareAtPrice: cheapestVariant?.compareAtPrice
                ? parseFloat(cheapestVariant.compareAtPrice)
                : null,
        };
    };

    const isUnavailable = !coffee.availableForSale;

    return (
        <div className="p-5 space-y-3">
            {/* Nazwa - klikalana */}
            <Link
                to={`/kawy/${coffee.shopifyHandle || coffee.id}`}
                className="block hover:text-accent transition-colors"
                onClick={() => trackSelectItem(coffee)}
            >
                <h3 className="text-xl md:text-2xl text-white leading-tight">
                    {coffee.name}
                </h3>
            </Link>

            {/* Cena i status */}
            <div className="flex items-baseline gap-2 flex-wrap">
                {isUnavailable ? (
                    <span className="px-3 py-1 bg-danger/20 border border-danger/30 text-danger text-sm font-bold rounded-full">
                        Niedostępne
                    </span>
                ) : (
                    <>
                        {(() => {
                            const price = getPrice();
                            const hasDiscount = price.compareAtPrice && price.compareAtPrice > parseFloat(price.value);
                            return (
                                <>
                                    {hasDiscount && (
                                        <span className="text-base text-muted/50 line-through">
                                            {price.compareAtPrice.toFixed(2)} zł
                                        </span>
                                    )}
                                    {price.prefix && (
                                        <span className="text-base text-muted">
                                            {price.prefix}
                                        </span>
                                    )}
                                    <span className="text-xl md:text-2xl text-muted">
                                        {price.value} zł
                                    </span>
                                </>
                            );
                        })()}
                    </>
                )}
            </div>
        </div>
    );
}