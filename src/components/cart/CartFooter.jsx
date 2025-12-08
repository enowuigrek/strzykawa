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
                {/* Total */}
                <div className="flex justify-between items-center mb-4">
                    <span className="text-lg text-white">Suma:</span>
                    <span className="text-xl text-white">
                        {totalPrice} zł
                    </span>
                </div>

                {/* Free Shipping Info */}
                <div className={`mb-4 p-3 rounded-lg ${hasFreeShipping ? 'bg-success/20 border border-success/30' : 'bg-accent/10 border border-accent/20'}`}>
                    <div className="flex items-center gap-2 text-sm">
                        <FaTruck className={hasFreeShipping ? 'text-success' : 'text-accent'} />
                        {hasFreeShipping ? (
                            <span className="text-success font-medium">
                                Gratulacje! Masz darmową wysyłkę! 🎉
                            </span>
                        ) : (
                            <span className="text-white">
                                Do darmowej wysyłki brakuje:{' '}
                                <span className="font-semibold text-accent">
                                    {remaining.toFixed(2)} zł
                                </span>
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