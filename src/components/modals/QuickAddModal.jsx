import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaExclamationCircle } from 'react-icons/fa';
import { QuantitySelector } from '../atoms/QuantitySelector.jsx';
import { Button } from '../atoms/Button.jsx';
import { ModalHeader } from '../layout/ModalHeader.jsx';
import { useBackdropClick } from '../../hooks/useBackdropClick.js';

// Opcje mielenia w zależności od typu palenia
const GRIND_OPTIONS = {
    Espresso: [
        { value: 'Ekspres', label: 'Ekspres' },
        { value: 'Kawiarka', label: 'Kawiarka' }
    ],
    Filter: [
        { value: 'Drip', label: 'Drip' },
        { value: 'Ekspres Przelewowy', label: 'Ekspres Przelewowy' }
    ]
};

export function QuickAddModal({ coffee, isOpen, onClose, onAddToCart }) {
    const [selectedVariant, setSelectedVariant] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [adding, setAdding] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    // Nowa logika - forma kawy i mielenie z aplikacji
    const [coffeeForm, setCoffeeForm] = useState('ziarna'); // 'ziarna' | 'mielona'
    const [grindMethod, setGrindMethod] = useState(null);

    // Animation trigger
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => setIsAnimating(true), 10);
        } else {
            setIsAnimating(false);
        }
    }, [isOpen]);

    // Set default variant when modal opens
    useEffect(() => {
        if (isOpen && coffee?.variants?.length > 0) {
            const availableVariant = coffee.variants.find(v => v.availableForSale);
            setSelectedVariant(availableVariant || coffee.variants[0]);
            setQuantity(1);
            setCoffeeForm('ziarna');
            setGrindMethod(null);
        }
    }, [isOpen, coffee]);

    // Wyciągnij gramatury z wariantów Shopify
    const extractGramatury = () => {
        if (!coffee?.variants) return ['250g'];
        const gramatury = new Set();
        coffee.variants.forEach(variant => {
            const gramOption = variant.selectedOptions?.find(opt => opt.name === 'Gramatura');
            if (gramOption) {
                gramatury.add(gramOption.value);
            }
        });
        if (gramatury.size === 0) {
            gramatury.add('250g');
        }
        return Array.from(gramatury);
    };

    const gramatury = extractGramatury();

    // Pobierz aktualną gramaturę
    const selectedGramatura = selectedVariant?.selectedOptions?.find(
        opt => opt.name === 'Gramatura'
    )?.value || gramatury[0];

    // Sprawdź dostępność gramatury
    const isGramaturaAvailable = (value) => {
        if (!coffee?.variants || coffee.variants.length === 0) return true;
        const hasGramVariants = coffee.variants.some(v =>
            v.selectedOptions?.some(opt => opt.name === 'Gramatura')
        );
        if (!hasGramVariants) return true;

        return coffee.variants.some(v =>
            v.availableForSale &&
            v.selectedOptions?.find(opt => opt.name === 'Gramatura')?.value === value
        );
    };

    // Znajdź wariant po gramaturze
    const findVariantByGramatura = (gram) => {
        if (!coffee?.variants) return null;
        return coffee.variants.find(v =>
            v.selectedOptions?.find(opt => opt.name === 'Gramatura')?.value === gram
        ) || coffee.variants[0];
    };

    // Handle gramatura change
    const handleGramaturaChange = (value) => {
        const newVariant = findVariantByGramatura(value);
        if (newVariant) setSelectedVariant(newVariant);
    };

    // Handle coffee form change
    const handleCoffeeFormChange = (form) => {
        setCoffeeForm(form);
        if (form === 'ziarna') {
            setGrindMethod(null);
        } else if (!grindMethod) {
            // Auto-select first grind option
            const options = GRIND_OPTIONS[coffee?.roastType] || GRIND_OPTIONS.Filter;
            setGrindMethod(options[0].value);
        }
    };

    // Opcje mielenia dla aktualnego roastType
    const grindOptions = GRIND_OPTIONS[coffee?.roastType] || GRIND_OPTIONS.Filter;

    // Handle add to cart
    const handleAdd = async () => {
        if (!selectedVariant || !selectedVariant.availableForSale) return;

        // Walidacja: jeśli mielona, musi być wybrane mielenie
        if (coffeeForm === 'mielona' && !grindMethod) {
            return;
        }

        setAdding(true);
        await onAddToCart(coffee, selectedVariant, quantity, coffeeForm, grindMethod);

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
            {/* Backdrop */}
            <div
                className={`
                    fixed inset-0 bg-black/70 z-[190]
                    backdrop-blur-md
                    transition-all duration-300 ease-out
                    ${isAnimating ? 'opacity-100' : 'opacity-0'}
                `}
                onClick={handleBackdropClick}
            />

            {/* Modal */}
            <div
                className={`
                    fixed w-full md:max-w-md
                    bg-primary border-white/20 md:border
                    z-[200] shadow-2xl flex flex-col
                    transition-all duration-300 ease-out
                    max-h-[85vh] overflow-y-auto

                    left-0 md:left-1/2 md:top-1/2 md:-translate-x-1/2

                    ${isAnimating
                        ? 'bottom-0 md:bottom-auto translate-y-0 md:-translate-y-1/2 opacity-100'
                        : 'bottom-0 md:bottom-auto translate-y-full md:translate-y-0 md:-translate-y-1/2 opacity-0'
                    }
                `}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <ModalHeader
                    title={coffee?.name || 'Kawa'}
                    onClose={onClose}
                    isAnimating={isAnimating}
                />

                {/* Content */}
                <div className="flex-shrink-0">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
                        <div className="space-y-3">
                            {/* Gramatura */}
                            {gramatury.length > 0 && (
                                <div>
                                    <label className="block text-base font-medium text-white mb-2">
                                        Gramatura
                                    </label>
                                    <div className="flex gap-2">
                                        {gramatury.map((value) => {
                                            const available = isGramaturaAvailable(value);

                                            return (
                                                <button
                                                    key={value}
                                                    onClick={() => available && handleGramaturaChange(value)}
                                                    disabled={!available}
                                                    className={`
                                                        ${gramatury.length === 1 ? 'inline-flex' : 'flex-1'}
                                                        px-5 py-2.5 text-base font-medium
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

                            {/* Forma kawy - ZAWSZE pokazuj */}
                            <div>
                                <label className="block text-base font-medium text-white mb-2">
                                    Forma kawy
                                </label>
                                <div className="flex gap-2">
                                    {['ziarna', 'mielona'].map(form => (
                                        <button
                                            key={form}
                                            onClick={() => handleCoffeeFormChange(form)}
                                            className={`
                                                flex-1
                                                px-5 py-2.5 text-base font-medium
                                                transition-all duration-200
                                                rounded-full capitalize
                                                ${coffeeForm === form
                                                    ? 'bg-accent text-white shadow-md'
                                                    : 'bg-primary-light text-muted border border-accent/30 hover:bg-accent/20 hover:text-white'
                                                }
                                            `}
                                        >
                                            {form}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Sposób mielenia - tylko gdy wybrana "mielona" */}
                            {coffeeForm === 'mielona' && (
                                <div>
                                    <label className="block text-base font-medium text-white mb-2">
                                        Sposób mielenia
                                    </label>
                                    <div className="flex flex-col gap-2">
                                        {grindOptions.map(({ value, label }) => (
                                            <button
                                                key={value}
                                                onClick={() => setGrindMethod(value)}
                                                className={`
                                                    px-5 py-2.5 text-base font-medium text-center
                                                    transition-all duration-200
                                                    rounded-full
                                                    ${grindMethod === value
                                                        ? 'bg-accent text-white shadow-md'
                                                        : 'bg-primary-light text-muted border border-accent/30 hover:bg-accent/20 hover:text-white'
                                                    }
                                                `}
                                            >
                                                {label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Liczba */}
                            <div>
                                <label className="block text-base font-medium text-white mb-2">
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
                                    <p className="text-base">
                                        Ten wariant jest obecnie niedostępny
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Total price */}
                <div>
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3">
                        <div className="border-t border-accent/20 pt-3">
                            <div className="flex justify-between items-center">
                                <span className="text-white font-medium">Razem:</span>
                                <span className="text-xl text-white">
                                    {isAvailable ? `${totalPrice} zł` : 'Niedostępne'}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div>
                    <div className="container mx-auto pt-4 pb-8 sm:px-6 lg:px-8 py-4">
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
