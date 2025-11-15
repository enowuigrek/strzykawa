import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaExclamationCircle } from 'react-icons/fa';
import { QuantitySelector } from './atoms/QuantitySelector';
import { Button } from './atoms/Button';
import { CloseButton } from './atoms/CloseButton';

export function QuickAddModal({ coffee, isOpen, onClose, onAddToCart }) {
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [adding, setAdding] = useState(false);

    // Set default variant when modal opens - pierwszy DOSTĘPNY
    useEffect(() => {
        if (isOpen && coffee?.variants?.length > 0) {
            const availableVariant = coffee.variants.find(v => v.availableForSale);
            setSelectedVariant(availableVariant || coffee.variants[0]);
            setQuantity(1);
        }
    }, [isOpen, coffee]);

    // Extract ALL unique options
    const extractAllOptions = (optionName) => {
        if (!coffee?.variants) return [];
        const options = new Set();
        coffee.variants.forEach(variant => {
            const option = variant.selectedOptions?.find(opt => opt.name === optionName);
            if (option) options.add(option.value);
        });
        return Array.from(options);
    };

    // Check if specific option value is available
    const isOptionAvailable = (optionName, optionValue) => {
        return coffee.variants.some(v =>
            v.availableForSale &&
            v.selectedOptions?.find(opt => opt.name === optionName)?.value === optionValue
        );
    };

    const gramaturaOptions = extractAllOptions('Gramatura');
    const typOptions = extractAllOptions('Typ');

    // Get selected options
    const selectedGramatura = selectedVariant?.selectedOptions?.find(
        opt => opt.name === 'Gramatura'
    )?.value;

    const selectedTyp = selectedVariant?.selectedOptions?.find(
        opt => opt.name === 'Typ'
    )?.value;

    // Find variant by options
    const findVariant = (gram, type) => {
        return coffee.variants.find(variant => {
            const variantGram = variant.selectedOptions?.find(opt => opt.name === 'Gramatura')?.value;
            const variantType = variant.selectedOptions?.find(opt => opt.name === 'Typ')?.value;

            if (!type && typOptions.length === 0) {
                return variantGram === gram;
            }

            return variantGram === gram && variantType === type;
        });
    };

    // Handle variant change
    const handleGramaturaChange = (value) => {
        const newVariant = findVariant(value, selectedTyp || typOptions[0]);
        if (newVariant) setSelectedVariant(newVariant);
    };

    const handleTypChange = (value) => {
        const newVariant = findVariant(selectedGramatura, value);
        if (newVariant) setSelectedVariant(newVariant);
    };

    // Handle add to cart
    const handleAdd = async () => {
        if (!selectedVariant || !selectedVariant.availableForSale) return;

        setAdding(true);
        await onAddToCart(coffee, selectedVariant, quantity);

        setTimeout(() => {
            setAdding(false);
            onClose();
        }, 500);
    };

    // Handle backdrop click
    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const price = selectedVariant?.price || '0.00';
    const totalPrice = (parseFloat(price) * quantity).toFixed(2);
    const isAvailable = selectedVariant?.availableForSale ?? false;

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-300"
                onClick={handleBackdropClick}
            />

            {/* Modal */}
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 pointer-events-none">
                <div
                    className="bg-primary w-full max-w-md shadow-2xl pointer-events-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-4">
                        <h3 className="text-xl font-semibold text-white">
                            {coffee.name}
                        </h3>
                        <CloseButton onClick={onClose} />
                    </div>
                    {/* Subtle divider under header title (like cart header) */}
                    <div className="px-4">
                        <div className="border-b border-white/10"></div>
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-4">
                        {/* Gramatura - czerwone tło + opacity + line-through */}
                        {gramaturaOptions.length > 0 && (
                            <div>
                                <label className="block text-sm font-semibold text-white mb-2">
                                    Gramatura
                                </label>
                                <div className="flex gap-2">
                                    {gramaturaOptions.map((value) => {
                                        const available = isOptionAvailable('Gramatura', value);

                                        return (
                                            <button
                                                key={value}
                                                onClick={() => available && handleGramaturaChange(value)}
                                                disabled={!available}
                                                className={`
                                                    ${gramaturaOptions.length === 1 ? 'inline-flex' : 'flex-1'}
                                                    px-5 py-2.5 text-sm font-medium
                                                    transition-all duration-200
                                                    rounded-full
                                                    ${!available
                                                        ? 'bg-red-900/20 text-red-400/70 opacity-60 cursor-not-allowed border border-red-800/30'
                                                        : selectedGramatura === value
                                                            ? 'bg-accent text-white shadow-md'
                                                            : 'bg-primary-light text-muted border border-accent/30 hover:bg-accent/20 hover:text-white'
                                                    }
                                                `}
                                            >
                                                <span className={!available ? 'line-through' : ''}>{value}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Typ - czerwone tło + opacity + line-through */}
                        {typOptions.length > 1 && (
                            <div>
                                <label className="block text-sm font-semibold text-white mb-2">
                                    Typ
                                </label>
                                <div className="flex gap-2">
                                    {typOptions.map((value) => {
                                        const available = isOptionAvailable('Typ', value);

                                        return (
                                            <button
                                                key={value}
                                                onClick={() => available && handleTypChange(value)}
                                                disabled={!available}
                                                className={`
                                                    ${typOptions.length === 1 ? 'inline-flex' : 'flex-1'}
                                                    px-5 py-2.5 text-sm font-medium
                                                    transition-all duration-200
                                                    rounded-full
                                                    ${!available
                                                        ? 'bg-red-900/20 text-red-400/70 opacity-60 cursor-not-allowed border border-red-800/30'
                                                        : selectedTyp === value
                                                            ? 'bg-accent text-white shadow-md'
                                                            : 'bg-primary-light text-muted border border-accent/30 hover:bg-accent/20 hover:text-white'
                                                    }
                                                `}
                                            >
                                                <span className={!available ? 'line-through' : ''}>{value}</span>
                                            </button>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Niedostępny wariant - INFO */}
                        {!isAvailable && (
                            <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 text-red-300">
                                <FaExclamationCircle className="w-4 h-4 flex-shrink-0" />
                                <p className="text-sm">
                                    Ten wariant jest obecnie niedostępny
                                </p>
                            </div>
                        )}

                        {/* Quantity - SIZE MD (mniejszy) */}
                        <div>
                            <label className="block text-sm font-semibold text-white mb-2">
                                Liczba
                            </label>
                            <QuantitySelector
                                quantity={quantity}
                                onQuantityChange={setQuantity}
                                min={1}
                                max={20}
                                size="md"
                                disabled={!isAvailable}
                            />
                        </div>

                        {/* Total price */}
                        <div className="p-3  border-t border-accent/20">
                            <div className="flex justify-between items-center">
                                <span className="text-white font-medium">Razem:</span>
                                <span className="text-xl font-bold text-white">
                                    {isAvailable ? `${totalPrice} zł` : 'Niedostępne'}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-4">
                        <Button
                            onClick={handleAdd}
                            disabled={!selectedVariant || !isAvailable || adding}
                            loading={adding}
                            leftIcon={FaShoppingCart}
                            variant="primary"
                            size="lg"
                            fullWidth
                        >
                            {adding ? 'Dodawanie...' :
                                !isAvailable ? 'Niedostępne' :
                                    `Dodaj - ${totalPrice} zł`}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}