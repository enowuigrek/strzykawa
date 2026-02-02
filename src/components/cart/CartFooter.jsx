import React from 'react';
import { Button } from '../atoms/Button';

export function CartFooter({ items, isLoading, totalPrice, onCheckout }) {
    if (items.length === 0) return null;

    return (
        <div className="flex-shrink-0 border-t border-white/10 bg-gradient-to-r from-primary-light/30 to-primary/30 z-[110]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-6">
                {/* Total */}
                <div className="flex justify-between items-center mb-4">
                    <span className="text-lg sm:text-xl text-white">Suma:</span>
                    <span className="text-xl sm:text-2xl font-semibold text-white">
                        {totalPrice} zł
                    </span>
                </div>

                {/* Checkout Button */}
                <Button
                    onClick={onCheckout}
                    disabled={isLoading || items.length === 0}
                    fullWidth
                    size="md"
                    variant="primary"
                    loading={isLoading}
                    className="sm:!py-3"
                >
                    <span className="hidden sm:inline">Przejdź do finalizacji</span>
                    <span className="sm:hidden">Finalizuj</span>
                </Button>
            </div>
        </div>
    );
}