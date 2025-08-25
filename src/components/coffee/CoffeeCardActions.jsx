import React from 'react';
import { FaShoppingCart, FaCheck } from 'react-icons/fa';
import { UniversalButton } from '../UniversalButton';

export function CoffeeCardActions({
                                      onAddToCart,
                                      isAdding,
                                      justAdded,
                                      inCart,
                                      currentQuantity
                                  }) {
    const getButtonIcon = () => {
        if (justAdded) return FaCheck;
        return FaShoppingCart;
    };

    const getButtonText = () => {
        if (isAdding) return 'Dodawanie...';
        if (justAdded) return 'Dodano';
        if (inCart) return `Dodaj kolejną (${currentQuantity} w koszyku)`;
        return 'Dodaj do koszyka';
    };

    const getVariant = () => {
        if (justAdded) return 'success';
        return 'primary';
    };

    return (
        <UniversalButton
            onClick={onAddToCart}
            disabled={isAdding}
            loading={isAdding}
            icon={getButtonIcon()}
            variant={getVariant()}
            size="md"
            className="w-full"
        >
            {getButtonText()}
        </UniversalButton>
    );
}