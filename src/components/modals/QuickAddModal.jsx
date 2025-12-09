import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaExclamationCircle } from 'react-icons/fa';
import { QuantitySelector } from '../atoms/QuantitySelector.jsx';
import { Button } from '../atoms/Button.jsx';
import { ModalHeader } from '../layout/ModalHeader.jsx';
import { useBackdropClick } from '../../hooks/useBackdropClick.js';

export function QuickAddModal({ coffee, isOpen, onClose, onAddToCart }) {
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [adding, setAdding] = useState(false);
    const [grindMethod, setGrindMethod] = useState(null); // Pod ekspres / Pod drip
    const [isAnimating, setIsAnimating] = useState(false);

    // Animation trigger
    useEffect(() => {
        if (isOpen) {
            // Trigger animation after mount
            setTimeout(() => setIsAnimating(true), 10);
        } else {
            setIsAnimating(false);
        }
    }, [isOpen]);

    // Set default variant when modal opens - prioritize "Ziarna" (whole beans)
    useEffect(() => {
        if (isOpen && coffee?.variants?.length > 0) {
            // First try to find available "Ziarna" variant
            const ziarnaVariant = coffee.variants.find(v =>
                v.availableForSale &&
                v.selectedOptions?.some(opt => opt.name === 'Typ' && opt.value === 'Ziarna')
            );

            // If no "Ziarna" available, fall back to any available variant
            const fallbackVariant = coffee.variants.find(v => v.availableForSale);

            setSelectedVariant(ziarnaVariant || fallbackVariant || coffee.variants[0]);
            setQuantity(1);
            setGrindMethod(null); // Reset grind method
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
    const typOptions = extractAllOptions('Typ').sort((a, b) => {
        // Ziarna zawsze pierwsze, potem Mielona
        if (a === 'Ziarna') return -1;
        if (b === 'Ziarna') return 1;
        return 0;
    });

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

    const handleBackdropClick = useBackdropClick(onClose);

    const price = selectedVariant?.price || '0.00';
    const totalPrice = (parseFloat(price) * quantity).toFixed(2);
    const isAvailable = selectedVariant?.availableForSale ?? false;

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop - z animacją fade-in i blur + przyciemnienie */}
            <div
                className={`
                    fixed inset-0 bg-black/70 z-[190]
                    backdrop-blur-md
                    transition-all duration-300 ease-out
                    ${isAnimating ? 'opacity-100' : 'opacity-0'}
                `}
                onClick={handleBackdropClick}
            />

            {/* Modal - Fullscreen mobile, wycentrowany desktop */}
            <div
                className={`
                    fixed h-full w-full md:h-auto md:max-w-md
                    bg-primary border-white/20 md:border
                    z-[200] shadow-2xl flex flex-col
                    transition-all duration-300 ease-out

                    left-0 md:left-1/2 md:top-1/2 md:-translate-x-1/2

                    ${isAnimating
                        ? 'bottom-0 translate-y-0 md:-translate-y-1/2 opacity-100'
                        : 'bottom-0 translate-y-full md:translate-y-0 md:-translate-y-1/2 opacity-0'
                    }
                `}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <ModalHeader
                    title={coffee.name}
                    onClose={onClose}
                    isAnimating={isAnimating}
                />

                {/* Content - scrollable */}
                <div className="flex-1 overflow-y-auto">
                    <div className="p-3 pb-2">
                        <div className="space-y-3">
                            {/* Gramatura */}
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

                            {/* Sposób przygotowania */}
                            {typOptions.length > 1 && (
                                <div>
                                    <label className="block text-sm font-semibold text-white mb-2">
                                        Sposób przygotowania
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
                                                        flex-1
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

                            {/* Sposób mielenia - tylko gdy wybrana "Mielona" */}
                            {selectedTyp === 'Mielona' && (
                                <div>
                                    <label className="block text-sm font-semibold text-white mb-2">
                                        Sposób mielenia
                                    </label>
                                    <div className="flex gap-2">
                                        {['Pod ekspres', 'Pod drip'].map(value => (
                                            <button
                                                key={value}
                                                onClick={() => setGrindMethod(value)}
                                                className={`
                                                    flex-1
                                                    px-5 py-2.5 text-sm font-medium
                                                    transition-all duration-200
                                                    rounded-full
                                                    ${grindMethod === value
                                                        ? 'bg-accent text-white shadow-md'
                                                        : 'bg-primary-light text-muted border border-accent/30 hover:bg-accent/20 hover:text-white'
                                                    }
                                                `}
                                            >
                                                {value}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Liczba */}
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

                            {/* Niedostępny wariant - INFO */}
                            {!isAvailable && (
                                <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/30 text-red-300 rounded-lg">
                                    <FaExclamationCircle className="w-4 h-4 flex-shrink-0" />
                                    <p className="text-sm">
                                        Ten wariant jest obecnie niedostępny
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Total price */}
                    <div className="px-3 py-2 border-t border-accent/20">
                        <div className="flex justify-between items-center">
                            <span className="text-white font-medium">Razem:</span>
                            <span className="text-xl font-bold text-white">
                                {isAvailable ? `${totalPrice} zł` : 'Niedostępne'}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Footer - sticky na dole */}
                <div className="p-3 border-t border-white/10">
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
        </>
    );
}