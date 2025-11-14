import React from 'react';
import { FaCreditCard } from 'react-icons/fa';

/**
 * CartFooter - Footer koszyka z totalem i checkout button
 * FIXED: Dodano container mx-auto dla consistency
 */
export function CartFooter({ items, isLoading, totalPrice, onCheckout }) {
    if (items.length === 0) return null;

    return (
        <div className="flex-shrink-0 border-t border-white/10 bg-gradient-to-r from-primary-light/30 to-primary/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Total */}
                <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold text-white">Suma:</span>
                    <span className="text-xl font-bold text-white">
                        {totalPrice} zł
                    </span>
                </div>

                {/* Checkout Button - Rounded-full (pastylka) */}
                <button
                    onClick={onCheckout}
                    disabled={isLoading || items.length === 0}
                    className="group relative inline-flex items-center w-full justify-center bg-white/10 backdrop-blur-sm border border-white/30 rounded-full px-6 py-4 transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:border-white/50 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden"
                >
                    <div className="flex items-center space-x-3">
                        {/* Icon box - sharp corners */}
                        <div className="p-2 bg-accent/20">
                            {isLoading ? (
                                <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                <FaCreditCard className="w-4 h-4 text-accent" />
                            )}
                        </div>
                        <span className="text-white font-semibold text-lg">
                            {isLoading ? 'Ładowanie...' : 'Przejdź do płatności'}
                        </span>
                    </div>

                    {/* Shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out" />
                </button>

                <p className="text-xs text-muted text-center mt-3">
                    Zostaniesz przekierowany do bezpiecznej płatności Shopify
                </p>
            </div>
        </div>
    );
}