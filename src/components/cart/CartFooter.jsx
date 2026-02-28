import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCreditCard, FaTruck } from 'react-icons/fa';
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

    const formattedShipping = shippingCost.toFixed(2).replace('.', ',') + '\u00a0zł';
    const formattedTotal    = total.toFixed(2).replace('.', ',') + '\u00a0zł';

    return (
        <div className="flex-shrink-0 bg-primary z-[110]">

            {/* Uwagi do zamówienia */}
            <CartNotes
                note={note}
                onSave={onSaveNote}
                isLoading={isLoading}
            />

            <div className="px-4 sm:px-6 py-3 sm:py-4">

                {/* Postęp darmowej wysyłki */}
                <div className="mb-3">
                    <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                            <FaTruck className={`text-sm ${hasFreeShipping ? 'text-success' : 'text-muted'}`} />
                            {hasFreeShipping ? (
                                <span className="text-sm text-success font-medium">Darmowa wysyłka!</span>
                            ) : (
                                <span className="text-sm text-white/80">Do darmowej wysyłki brakuje</span>
                            )}
                        </div>
                        {!hasFreeShipping && (
                            <span className="text-sm text-white font-semibold">
                                {remaining.toFixed(2).replace('.', ',')} zł
                            </span>
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

                    {/* Koszt wysyłki — zawsze widoczny, 0,00 zł gdy darmowa */}
                    <div className="flex justify-end mt-1.5">
                        <span className="text-sm text-white/50">
                            wysyłka{' '}
                            <span className={hasFreeShipping ? 'text-success font-medium' : 'text-white/60'}>
                                {formattedShipping}
                            </span>
                        </span>
                    </div>
                </div>

                {/* Akceptacja regulaminu */}
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

                {showTermsError && !termsAccepted && (
                    <p className="text-sm text-danger/80 mb-3 -mt-1 pl-8">
                        Zaakceptuj regulamin, aby kontynuować
                    </p>
                )}

                {/* Przycisk kasy */}
                <Button
                    onClick={handleCheckout}
                    disabled={isLoading || items.length === 0}
                    fullWidth
                    size="md"
                    variant="primary"
                    loading={isLoading}
                    leftIcon={FaCreditCard}
                >
                    Przejdź do kasy · {formattedTotal}
                </Button>
            </div>
        </div>
    );
}
