import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCreditCard } from 'react-icons/fa';
import { Button } from '../atoms/Button';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';

export function CartFooter({ items, isLoading, totalPrice }) {
    const [termsAccepted, setTermsAccepted] = useState(false);
    const { goToCheckout } = useCartStore();
    const { user } = useAuthStore();

    if (items.length === 0) return null;

    const handleCheckout = () => {
        if (!termsAccepted) return;
        // Przekieruj do Shopify checkout z danymi użytkownika (jeśli zalogowany)
        goToCheckout(user);
    };

    return (
        <div className="flex-shrink-0 bg-gradient-to-r from-primary-light/30 to-primary/30 z-[110]">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-6">
                {/* Total */}
                <div className="flex justify-between items-center mb-4">
                    <span className="text-lg sm:text-xl text-white">Suma:</span>
                    <span className="text-xl sm:text-2xl text-white">
                        {totalPrice.toFixed(2)} zł
                    </span>
                </div>

                {/* Terms checkbox */}
                <label className="flex items-center gap-3 mb-4 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={termsAccepted}
                        onChange={(e) => setTermsAccepted(e.target.checked)}
                        className="w-5 h-5 rounded border-white/30 bg-primary-light text-accent focus:ring-accent focus:ring-offset-0 cursor-pointer"
                    />
                    <span className="text-sm text-white/80">
                        Akceptuję{' '}
                        <Link
                            to="/regulamin"
                            className="text-accent hover:text-accent/80 underline"
                            target="_blank"
                        >
                            regulamin sklepu
                        </Link>
                    </span>
                </label>

                {/* Checkout Button */}
                <Button
                    onClick={handleCheckout}
                    disabled={isLoading || items.length === 0 || !termsAccepted}
                    fullWidth
                    size="md"
                    variant="primary"
                    loading={isLoading}
                    leftIcon={FaCreditCard}
                    className="sm:!py-3"
                >
                    <span className="hidden sm:inline">Przejdź do płatności</span>
                    <span className="sm:hidden">Przejdź do płatności</span>
                </Button>

                {/* Info text */}
                <p className="text-center text-sm text-white/50 mt-3">
                    Zostaniesz przekierowany do bezpiecznej płatności Shopify
                </p>
            </div>
        </div>
    );
}
