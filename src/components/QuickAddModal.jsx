import React, { useState, useEffect } from 'react';
import { IoClose } from 'react-icons/io5';
import { FaShoppingCart } from 'react-icons/fa';
import { QuantitySelector } from './atoms/QuantitySelector';
import { Button } from './atoms/Button';

/**
 * QuickAddModal - Modal do szybkiego dodawania do koszyka
 * Wybór: ziarna/mielona, gramatura, liczba sztuk
 */
export function QuickAddModal({ coffee, isOpen, onClose, onAddToCart }) {
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [adding, setAdding] = useState(false);

    // Set default variant when modal opens
    useEffect(() => {
        if (isOpen && coffee?.variants?.length > 0) {
            setSelectedVariant(coffee.variants[0]);
            setQuantity(1);
        }
    }, [isOpen, coffee]);

    // Extract unique options
    const extractOptions = (optionName) => {
        if (!coffee?.variants) return [];
        const options = new Set();
        coffee.variants.forEach(variant => {
            const option = variant.selectedOptions?.find(opt => opt.name === optionName);
            if (option) options.add(option.value);
        });
        return Array.from(options);
    };

    const gramaturaOptions = extractOptions('Gramatura');
    const typOptions = extractOptions('Typ');

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
        if (!selectedVariant) return;

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

    const price = selectedVariant?.price || 0;
    const totalPrice = (price * quantity).toFixed(2);

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={handleBackdropClick}
            >
                {/* Modal */}
                <div
                    className="bg-primary border border-accent/30 w-full max-w-md"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-4 border-b border-white/10">
                        <h3 className="text-lg font-bold text-white">
                            Dodaj do koszyka
                        </h3>
                        <button
                            onClick={onClose}
                            className="w-8 h-8 flex items-center justify-center text-muted hover:text-white transition-colors"
                        >
                            <IoClose className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-4 space-y-4">
                        {/* Product name */}
                        <div>
                            <h4 className="text-white font-medium">{coffee.name}</h4>
                            <p className="text-sm text-muted">{coffee.origin?.[0]?.country}</p>
                        </div>

                        {/* Gramatura */}
                        {gramaturaOptions.length > 0 && (
                            <div>
                                <label className="block text-sm font-semibold text-white mb-2">
                                    Gramatura
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {gramaturaOptions.map(value => (
                                        <button
                                            key={value}
                                            onClick={() => handleGramaturaChange(value)}
                                            className={`
                                                px-4 py-2 font-medium transition-all rounded-full
                                                ${selectedGramatura === value
                                                ? 'bg-accent text-white'
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

                        {/* Typ - tylko jeśli więcej niż 1 opcja */}
                        {typOptions.length > 1 && (
                            <div>
                                <label className="block text-sm font-semibold text-white mb-2">
                                    Sposób przygotowania
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {typOptions.map(value => (
                                        <button
                                            key={value}
                                            onClick={() => handleTypChange(value)}
                                            className={`
                                                px-4 py-2 font-medium transition-all rounded-full
                                                ${selectedTyp === value
                                                ? 'bg-accent text-white'
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

                        {/* Quantity */}
                        <div>
                            <label className="block text-sm font-semibold text-white mb-2">
                                Liczba
                            </label>
                            <QuantitySelector
                                quantity={quantity}
                                onQuantityChange={setQuantity}
                                min={1}
                                max={20}
                                size="lg"
                            />
                        </div>

                        {/* Total price */}
                        <div className="p-3 bg-accent/10 border border-accent/20">
                            <div className="flex justify-between items-center">
                                <span className="text-white font-medium">Razem:</span>
                                <span className="text-xl font-bold text-white">
                                    {totalPrice} zł
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-4 border-t border-white/10">
                        <Button
                            onClick={handleAdd}
                            disabled={!selectedVariant || adding}
                            loading={adding}
                            icon={FaShoppingCart}
                            variant="primary"
                            size="lg"
                            className="w-full"
                        >
                            {adding ? 'Dodawanie...' : `Dodaj - ${totalPrice} zł`}
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}