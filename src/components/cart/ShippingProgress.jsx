import React from 'react';
import { FaTruck } from 'react-icons/fa';
import { FREE_SHIPPING_THRESHOLD } from '../../constants/shipping';

/**
 * ShippingProgress - Wyświetla postęp do darmowej wysyłki
 * Umieszczany na dole koszyka, przed footrem
 */
export function ShippingProgress({ totalPrice }) {
    const totalAmount = parseFloat(totalPrice);
    const remaining = FREE_SHIPPING_THRESHOLD - totalAmount;
    const hasFreeShipping = totalAmount >= FREE_SHIPPING_THRESHOLD;

    // Procent postępu (0-100%)
    const progress = Math.min((totalAmount / FREE_SHIPPING_THRESHOLD) * 100, 100);

    return (
        <div className="flex-shrink-0 border-t border-white/5 bg-primary-dark/40 px-4 sm:px-6 lg:px-8 py-4">
            <div className="container mx-auto">
                {/* Tekst + kwota */}
                <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                        <FaTruck className={`${hasFreeShipping ? 'text-success' : 'text-muted'}`} />
                        <span className="text-sm text-white">
                            Darmowa wysyłka
                        </span>
                    </div>

                    <span className={`text-sm font-semibold ${hasFreeShipping ? 'text-success' : 'text-accent'}`}>
                        {hasFreeShipping ? (
                            '✓ Osiągnięto'
                        ) : (
                            `Brakuje ${remaining.toFixed(2)} zł`
                        )}
                    </span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 bg-primary-light/50 rounded-full overflow-hidden">
                    <div
                        className={`h-full transition-all duration-500 ease-out ${
                            hasFreeShipping ? 'bg-success' : 'bg-accent'
                        }`}
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </div>
    );
}
