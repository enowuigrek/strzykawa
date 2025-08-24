import React from 'react';
import { FaArrowRight, FaShoppingCart, FaCheck } from 'react-icons/fa';

export function CoffeeCardActions({
                                      onAddToCart,
                                      isAdding,
                                      justAdded,
                                      inCart,
                                      currentQuantity
                                  }) {
    const getButtonIcon = () => {
        if (isAdding) return null; // Loading spinner handled separately
        if (justAdded) return FaCheck;
        return FaShoppingCart;
    };

    const getButtonText = () => {
        if (isAdding) return 'Dodawanie...';
        if (justAdded) return 'Dodano do koszyka';
        if (inCart) return `Dodaj kolejną (${currentQuantity} w koszyku)`;
        return 'Dodaj do koszyka';
    };

    const getColorClass = () => {
        if (justAdded) return 'bg-green-500/20';
        return 'bg-accent/20';
    };

    const Icon = getButtonIcon();

    return (
        <button
            onClick={onAddToCart}
            disabled={isAdding}
            className="group relative inline-flex items-center w-full justify-center bg-white/10 backdrop-blur-sm border border-white/30 rounded-full px-6 py-3 transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:border-white/50 disabled:opacity-70 disabled:hover:scale-100"
        >
            <div className="flex items-center space-x-3">
                <div className={`p-2 ${getColorClass()} rounded-full`}>
                    {isAdding ? (
                        <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
                    ) : Icon ? (
                        <Icon className="w-4 h-4 text-accent" />
                    ) : null}
                </div>
                <span className="text-white font-semibold">
                    {getButtonText()}
                </span>
            </div>

            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out rounded-full" />
        </button>
    );
}