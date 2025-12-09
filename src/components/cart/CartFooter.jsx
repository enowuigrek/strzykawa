import React from 'react';
import { FaCreditCard, FaTruck } from 'react-icons/fa';
import { Button } from '../atoms/Button';
import { FREE_SHIPPING_THRESHOLD } from '../../constants/shipping';

export function CartFooter({ items, isLoading, totalPrice, onCheckout }) {
    if (items.length === 0) return null;

    // Oblicz ile brakuje do darmowej wysyłki
    const totalAmount = parseFloat(totalPrice);
    const remaining = FREE_SHIPPING_THRESHOLD - totalAmount;
    const hasFreeShipping = totalAmount >= FREE_SHIPPING_THRESHOLD;

    return (
        <div className="flex-shrink-0 border-t border-white/10 bg-gradient-to-r from-primary-light/30 to-primary/30 z-[110]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Total + Free Shipping Info (jedna linia, bardziej minimalistycznie) */}
                <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                        <span className="text-lg text-white">Suma:</span>
                        <span className="text-xl font-semibold text-white">
                            {totalPrice} zł
                        </span>
                    </div>

                    {/* Minimalistyczna info o darmowej wysyłce - jedna linia z ikoną */}
                    <div className="flex items-center justify-center gap-2 text-sm">
                        <FaTruck className={`${hasFreeShipping ? 'text-success' : 'text-muted'}`} />
                        {hasFreeShipping ? (
                            <span className="text-success font-medium">
                                Darmowa wysyłka
                            </span>
                        ) : (
                            <span className="text-muted">
                                Darmowa wysyłka od {FREE_SHIPPING_THRESHOLD} zł
                            </span>
                        )}
                    </div>
                </div>

                {/* Checkout Button */}
                <Button
                    onClick={onCheckout}
                    disabled={isLoading || items.length === 0}
                    fullWidth
                    size="lg"
                    variant="primary"
                    leftIcon={FaCreditCard}
                    loading={isLoading}
                >
                    Przejdź do płatności
                </Button>

                <p className="text-xs text-muted text-center mt-3">
                    Zostaniesz przekierowany do bezpiecznej płatności Shopify
                </p>
            </div>
        </div>
    );
}