import React, { useState } from 'react';
import { FaCreditCard } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Button } from '../atoms/Button';

export function CartFooter({ items, isLoading, totalPrice, onCheckout }) {
    const [regulationsAccepted, setRegulationsAccepted] = useState(false);

    if (items.length === 0) return null;

    const handleCheckout = () => {
        if (regulationsAccepted) {
            onCheckout();
        }
    };

    return (
        <div className="flex-shrink-0 border-t border-white/10 bg-gradient-to-r from-primary-light/30 to-primary/30 z-[110]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-6">
                {/* Total */}
                <div className="flex justify-between items-center mb-3">
                    <span className="text-base sm:text-lg text-white">Suma:</span>
                    <span className="text-lg sm:text-xl font-semibold text-white">
                        {totalPrice} zł
                    </span>
                </div>

                {/* Regulations Checkbox */}
                <label className="flex items-start gap-2 mb-3 cursor-pointer group">
                    <input
                        type="checkbox"
                        checked={regulationsAccepted}
                        onChange={(e) => setRegulationsAccepted(e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded border-white/30 bg-primary-light text-success focus:ring-success focus:ring-offset-0 cursor-pointer"
                    />
                    <span className="text-xs sm:text-sm text-white/70 group-hover:text-white/90 transition-colors">
                        Akceptuję{' '}
                        <Link
                            to="/regulamin"
                            className="text-accent hover:text-white underline"
                            onClick={(e) => e.stopPropagation()}
                        >
                            regulamin sklepu
                        </Link>
                    </span>
                </label>

                {/* Checkout Button */}
                <Button
                    onClick={handleCheckout}
                    disabled={isLoading || items.length === 0 || !regulationsAccepted}
                    fullWidth
                    size="md"
                    variant="primary"
                    leftIcon={FaCreditCard}
                    loading={isLoading}
                    className="sm:!py-3"
                >
                    <span className="hidden sm:inline">Przejdź do płatności</span>
                    <span className="sm:hidden">Płatność</span>
                </Button>

                <p className="text-xs text-muted text-center mt-2">
                    Zostaniesz przekierowany do bezpiecznej płatności Shopify
                </p>
            </div>
        </div>
    );
}