import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCreditCard, FaLock, FaTruck } from 'react-icons/fa';
import { Button } from '../atoms/Button';
import { CartNotes } from './CartNotes';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';
import { FREE_SHIPPING_THRESHOLD, SHIPPING_COST } from '../../constants/shipping';

export function CartFooter({ items, isLoading, totalPrice, note, onSaveNote }) {
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [showTermsError, setShowTermsError] = useState(false);
    const { goToCheckout } = useCartStore();
    const { user } = useAuthStore();

    if (items.length === 0) return null;

    const subtotal = parseFloat(totalPrice);
    const hasFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
    const shippingCost = hasFreeShipping ? 0 : SHIPPING_COST;
    const total = subtotal + shippingCost;
    const remaining = FREE_SHIPPING_THRESHOLD - subtotal;
    const progress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);

    const handleCheckout = () => {
        if (!termsAccepted) {
            setShowTermsError(true);
            return;
        }
        goToCheckout(user);
    };

    const handleTermsChange = (checked) => {
        setTermsAccepted(checked);
        if (checked) setShowTermsError(false);
    };

    return (
        <div className="flex-shrink-0 bg-primary-dark border-t border-white/10 z-[110]">

            {/* Cart notes — above price breakdown */}
            <CartNotes
                note={note}
                onSave={onSaveNote}
                isLoading={isLoading}
            />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">

                {/* Shipping progress */}
                <div className="mb-3">
                    <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-1.5">
                            <FaTruck className={`text-xs sm:text-sm ${hasFreeShipping ? 'text-success' : 'text-muted'}`} />
                            <span className="text-xs sm:text-sm text-white/60">
                                {hasFreeShipping
                                    ? 'Darmowa wysyłka'
                                    : `Do darmowej wysyłki brakuje ${remaining.toFixed(2)} zł`
                                }
                            </span>
                        </div>
                        {hasFreeShipping && (
                            <span className="text-xs sm:text-sm text-success">✓</span>
                        )}
                    </div>
                    <div className="w-full h-1 bg-primary-light/50 rounded-full overflow-hidden">
                        <div
                            className={`h-full transition-all duration-500 ease-out ${
                                hasFreeShipping ? 'bg-success' : 'bg-accent'
                            }`}
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Price breakdown */}
                <div className="space-y-1.5 mb-3">
                    <div className="flex justify-between items-center">
                        <span className="text-sm sm:text-base text-white/60">Produkty</span>
                        <span className="text-sm sm:text-base text-white/60">{subtotal.toFixed(2)} zł</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="text-sm sm:text-base text-white/60">Wysyłka</span>
                        <span className={`text-sm sm:text-base ${hasFreeShipping ? 'text-success' : 'text-white/60'}`}>
                            {hasFreeShipping ? 'Darmowa' : `${shippingCost.toFixed(2)} zł`}
                        </span>
                    </div>
                    <div className="border-t border-white/10 pt-1.5">
                        <div className="flex justify-between items-center">
                            <span className="text-base sm:text-lg text-white font-medium">Razem</span>
                            <span className="text-lg sm:text-xl text-white font-bold">{total.toFixed(2)} zł</span>
                        </div>
                    </div>
                </div>

                {/* Terms checkbox */}
                <label className="flex items-start gap-3 mb-3 cursor-pointer group">
                    <div className={`
                        w-5 h-5 flex-shrink-0 flex items-center justify-center mt-0.5
                        border transition-colors duration-200
                        ${showTermsError && !termsAccepted
                            ? 'border-danger bg-danger/10'
                            : termsAccepted
                                ? 'bg-accent border-accent'
                                : 'bg-primary border-white/30 group-hover:border-accent/60'
                        }
                    `}>
                        {termsAccepted && (
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 12 12">
                                <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        )}
                    </div>
                    <input
                        type="checkbox"
                        checked={termsAccepted}
                        onChange={(e) => handleTermsChange(e.target.checked)}
                        className="sr-only"
                    />
                    <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors">
                        Akceptuję{' '}
                        <Link
                            to="/regulamin"
                            className="text-accent hover:text-white transition-colors"
                            target="_blank"
                        >
                            regulamin sklepu
                        </Link>
                    </span>
                </label>

                {/* Validation message */}
                {showTermsError && !termsAccepted && (
                    <p className="text-sm text-danger/80 mb-3 -mt-1 pl-8">
                        Zaakceptuj regulamin, aby kontynuować
                    </p>
                )}

                {/* Checkout button */}
                <Button
                    onClick={handleCheckout}
                    disabled={isLoading || items.length === 0}
                    fullWidth
                    size="md"
                    variant="primary"
                    loading={isLoading}
                    leftIcon={FaCreditCard}
                    className="sm:!py-3"
                >
                    Zapłać {total.toFixed(2)} zł
                </Button>

                {/* Trust microcopy */}
                <p className="flex items-center justify-center gap-1.5 text-xs text-white/40 mt-2.5">
                    <FaLock className="w-3 h-3" />
                    Bezpieczna płatność online
                </p>
            </div>
        </div>
    );
}
