import React, { useState, useEffect } from 'react';

/**
 * VariantSelector - Wybór wariantu produktu
 *
 * NOWA LOGIKA:
 * - Gramatura: z Shopify wariantów (jeśli brak → domyślnie 250g)
 * - Forma kawy (Ziarna/Mielona): ZAWSZE z aplikacji, nie z Shopify
 * - Mielenie: zależne od roastType (Espresso vs Filter/Przelew)
 */

// Opcje mielenia w zależności od typu palenia
const GRIND_OPTIONS = {
    Espresso: [
        { value: 'ekspres', label: 'ekspres' },
        { value: 'kawiarka', label: 'kawiarka' }
    ],
    Filter: [
        { value: 'drip', label: 'drip' },
        { value: 'ekspres przelewowy', label: 'ekspres przelewowy' }
    ]
};

export function VariantSelector({
    variants = [],
    selectedVariant,
    onVariantChange,
    coffeeForm = 'ziarna', // 'ziarna' | 'mielona'
    onCoffeeFormChange,
    grindMethod = null,
    onGrindMethodChange,
    roastType = null, // "Filter" (przelew) lub "Espresso"
    children = null // Slot dla dodatkowej zawartości w lewej kolumnie (np. Liczba)
}) {
    // Wyciągnij gramatury z wariantów Shopify
    const extractGramatury = () => {
        const gramatury = new Set();
        variants.forEach(variant => {
            const gramOption = variant.selectedOptions?.find(opt => opt.name === 'Gramatura');
            if (gramOption) {
                gramatury.add(gramOption.value);
            }
        });
        // Jeśli brak gramatur w Shopify, dodaj domyślną 250g
        if (gramatury.size === 0) {
            gramatury.add('250g');
        }
        return Array.from(gramatury);
    };

    const gramatury = extractGramatury();

    // Pobierz aktualną gramaturę z wybranego wariantu
    const selectedGramatura = selectedVariant?.selectedOptions?.find(
        opt => opt.name === 'Gramatura'
    )?.value || gramatury[0];

    // Sprawdź dostępność gramatury
    const isGramaturaAvailable = (value) => {
        // Jeśli brak wariantów z gramaturą, traktuj jako dostępne
        if (variants.length === 0) return true;
        const hasGramVariants = variants.some(v =>
            v.selectedOptions?.some(opt => opt.name === 'Gramatura')
        );
        if (!hasGramVariants) return true;

        return variants.some(v =>
            v.availableForSale &&
            v.selectedOptions?.find(opt => opt.name === 'Gramatura')?.value === value
        );
    };

    // Znajdź wariant po gramaturze
    const findVariantByGramatura = (gram) => {
        // Szukaj wariantu z tą gramaturą (ignoruj inne opcje jak Forma kawy z Shopify)
        return variants.find(v =>
            v.selectedOptions?.find(opt => opt.name === 'Gramatura')?.value === gram
        ) || variants[0];
    };

    // Handle gramatura change
    const handleGramaturaChange = (value) => {
        const newVariant = findVariantByGramatura(value);
        if (newVariant && onVariantChange) {
            onVariantChange(newVariant);
        }
    };

    // Handle coffee form change
    const handleCoffeeFormChange = (form) => {
        if (onCoffeeFormChange) {
            onCoffeeFormChange(form);
        }
        // Reset grind method when switching to ziarna
        if (form === 'ziarna' && onGrindMethodChange) {
            onGrindMethodChange(null);
        }
        // Auto-select first grind option when switching to mielona
        if (form === 'mielona' && onGrindMethodChange && !grindMethod) {
            const options = GRIND_OPTIONS[roastType] || GRIND_OPTIONS.Filter;
            onGrindMethodChange(options[0].value);
        }
    };

    // Opcje mielenia dla aktualnego roastType
    const grindOptions = GRIND_OPTIONS[roastType] || GRIND_OPTIONS.Filter;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* LEWA KOLUMNA: Gramatura + children (np. Liczba) */}
            <div className="space-y-4">
                {gramatury.length > 0 && (
                    <div>
                        <label className="block text-base text-white mb-2">
                            Gramatura
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {gramatury.map(value => {
                                const available = isGramaturaAvailable(value);

                                return (
                                    <button
                                        key={value}
                                        onClick={() => available && handleGramaturaChange(value)}
                                        disabled={!available}
                                        className={`
                                            min-w-[100px] px-5 py-2.5 font-medium transition-all rounded-full
                                            ${!available
                                            ? 'bg-red-900/20 text-red-400/70 opacity-60 cursor-not-allowed border border-red-800/30'
                                            : selectedGramatura === value
                                                ? 'bg-accent text-white shadow-md ring-2 ring-accent/30'
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

                {/* Renderuj children (np. Liczba) w lewej kolumnie */}
                {children}
            </div>

            {/* PRAWA KOLUMNA: Forma kawy + Sposób mielenia */}
            <div className="space-y-4">
                {/* Forma kawy - ZAWSZE pokazuj (z aplikacji, nie Shopify) */}
                <div>
                    <label className="block text-base text-white mb-2">
                        Forma kawy
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                        {['ziarna', 'mielona'].map(form => (
                            <button
                                key={form}
                                onClick={() => handleCoffeeFormChange(form)}
                                className={`
                                    min-w-[100px] px-5 py-2.5 font-medium transition-all rounded-full capitalize
                                    ${coffeeForm === form
                                        ? 'bg-accent text-white shadow-md ring-2 ring-accent/30'
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
                {coffeeForm === 'mielona' && onGrindMethodChange && (
                    <div>
                        <label className="block text-base text-white mb-2">
                            Sposób mielenia
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                            {grindOptions.map(({ value, label }) => (
                                <button
                                    key={value}
                                    onClick={() => onGrindMethodChange(value)}
                                    className={`
                                        px-5 py-2.5 font-medium transition-all rounded-full
                                        ${grindMethod === value
                                            ? 'bg-accent text-white shadow-md ring-2 ring-accent/30'
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
            </div>
        </div>
    );
}
