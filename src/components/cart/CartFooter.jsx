import React from 'react';
import { FaCreditCard } from 'react-icons/fa';
import { Button } from '../atoms/Button';

/**
 * CartFooter - Footer koszyka z totalem i checkout button
 * FIXED: Dodano container mx-auto dla consistency
 */
export function CartFooter({ items, isLoading, totalPrice, onCheckout }) {
    if (items.length === 0) return null;

    return (
        <div className="flex-shrink-0 border-t border-white/10 bg-gradient-to-r from-primary-light/30 to-primary/30 z-[110]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Total */}
                <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold text-white">Suma:</span>
                    <span className="text-xl font-bold text-white">
                        {totalPrice} zł
                    </span>
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