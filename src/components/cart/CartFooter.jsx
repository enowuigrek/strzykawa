import React, { useState } from 'react';
import { FaCreditCard } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Button } from '../atoms/Button';

export function CartFooter({ items, isLoading, totalPrice, onCheckout, onClose }) {
    const [regulationsAccepted, setRegulationsAccepted] = useState(false);
    const [showRegulationsError, setShowRegulationsError] = useState(false);

    if (items.length === 0) return null;

    const handleCheckout = () => {
        if (!regulationsAccepted) {
            setShowRegulationsError(true);
            return;
        }

        setShowRegulationsError(false);
        onCheckout();
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
                <label className="flex flex-col items-start gap-1 mb-3 cursor-pointer group">
                    <div className="flex items-start gap-2">
                        <input
                            type="checkbox"
                            checked={regulationsAccepted}
                            onChange={(e) => {
                                const checked = e.target.checked;
                                setRegulationsAccepted(checked);
                                if (checked) {
                                    setShowRegulationsError(false);
                                }
                            }}
                            className="mt-0.5 w-4 h-4 rounded-sm border border-white/40 bg-primary/40 accent-accent focus:ring-2 focus:ring-accent/60 focus:ring-offset-0 focus:outline-none cursor-pointer"
                        />
                        <span className="text-xs sm:text-sm text-white/70 group-hover:text-white/90 transition-colors">
                            Akceptuję{' '}
                            <Link
                                to="/regulamin"
                                className="text-accent hover:text-white underline"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (onClose) {
                                        onClose();
                                    }
                                }}
                            >
                                regulamin sklepu
                            </Link>
                        </span>
                    </div>
                    {showRegulationsError && (
                        <p className="mt-1 text-xs text-red-400">
                            Aby kontynuować, zaznacz akceptację regulaminu sklepu.
                        </p>
                    )}
                </label>

                {/* Checkout Button */}
                <Button
                    onClick={handleCheckout}
                    disabled={isLoading || items.length === 0}
                    fullWidth
                    size="md"
                    variant="primary"
                    leftIcon={FaCreditCard}
                    loading={isLoading}
                    className="sm:!py-3"
                >
                    <span className="hidden sm:inline">Przejdź do zamówienia</span>
                    <span className="sm:hidden">Zamawiam</span>
                </Button>

                <p className="text-xs text-muted text-center mt-2">
                    Podaj dane do wysyłki i przejdź do płatności
                </p>
            </div>
        </div>
    );
}