import React from 'react';

/**
 * VariantSelector - Wybór wariantu produktu
 * ULTIMATE FIX: Czerwone tło + opacity + line-through (BEZ tekstu "niedostępne")
 * UPDATE: Dodano sposób mielenia (ekspres/drip) - pokazuje się gdy wybrana Mielona
 */
export function VariantSelector({
                                    variants = [],
                                    selectedVariant,
                                    onVariantChange,
                                    grindMethod = null,
                                    onGrindMethodChange = null,
                                    roastType = null, // "Filter" (przelew) lub "Espresso"
                                    children = null // Slot dla dodatkowej zawartości w lewej kolumnie (np. Liczba)
                                }) {
    if (!variants || variants.length === 0) {
        return null;
    }

    // Extract ALL unique option values
    const extractOptions = (optionName) => {
        const options = new Set();
        variants.forEach(variant => {
            const option = variant.selectedOptions?.find(opt => opt.name === optionName);
            if (option) {
                options.add(option.value);
            }
        });
        return Array.from(options);
    };

    // Check if specific option is available (for current gramatura selection)
    const isOptionAvailable = (optionName, optionValue, currentGramatura = null) => {
        return variants.some(v => {
            const matchesOption = v.selectedOptions?.find(opt => opt.name === optionName)?.value === optionValue;
            // Jeśli sprawdzamy Forma kawy, musi pasować do aktualnej gramatury
            if (optionName === 'Forma kawy' && currentGramatura) {
                const matchesGramatura = v.selectedOptions?.find(opt => opt.name === 'Gramatura')?.value === currentGramatura;
                return v.availableForSale && matchesOption && matchesGramatura;
            }
            return v.availableForSale && matchesOption;
        });
    };

    const gramatura = extractOptions('Gramatura');
    // Shopify używa "Forma kawy" z wartościami "Całe ziarna" / "Mielona"
    const typ = extractOptions('Forma kawy').sort((a, b) => {
        // Całe ziarna zawsze pierwsze, potem Mielona
        if (a === 'Całe ziarna') return -1;
        if (b === 'Całe ziarna') return 1;
        return 0;
    });

    // Get currently selected options
    const selectedGramatura = selectedVariant?.selectedOptions?.find(
        opt => opt.name === 'Gramatura'
    )?.value;

    const selectedTyp = selectedVariant?.selectedOptions?.find(
        opt => opt.name === 'Forma kawy'
    )?.value;

    // Find variant by selected options
    const findVariant = (gram, type) => {
        return variants.find(variant => {
            const variantGram = variant.selectedOptions?.find(opt => opt.name === 'Gramatura')?.value;
            const variantType = variant.selectedOptions?.find(opt => opt.name === 'Forma kawy')?.value;

            if (!type && typ.length === 0) {
                return variantGram === gram;
            }

            return variantGram === gram && variantType === type;
        });
    };

    // Handle gramatura change
    const handleGramaturaChange = (value) => {
        const newVariant = findVariant(value, selectedTyp || typ[0]);
        if (newVariant && onVariantChange) {
            onVariantChange(newVariant);
        }
    };

    // Handle typ change
    const handleTypChange = (value) => {
        const newVariant = findVariant(selectedGramatura, value);
        if (newVariant && onVariantChange) {
            onVariantChange(newVariant);
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* LEWA KOLUMNA: Gramatura + children (np. Liczba) */}
            <div className="space-y-4">
                {gramatura.length > 0 && (
                    <div>
                        <label className="block text-sm text-white mb-2">
                            Gramatura
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {gramatura.map(value => {
                                const available = isOptionAvailable('Gramatura', value);

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

            {/* PRAWA KOLUMNA: Sposób przygotowania + Sposób mielenia */}
            <div className="space-y-4">
                {/* Forma kawy */}
                {typ.length > 1 && (
                    <div>
                        {/* Nagłówek zawsze na lewo */}
                        <label className="block text-sm text-white mb-2">
                            Forma kawy
                        </label>
                        {/* Przyciski zawsze grid 2 kolumny - obok siebie */}
                        <div className="grid grid-cols-2 gap-2">
                            {typ.map(value => {
                                const available = isOptionAvailable('Forma kawy', value, selectedGramatura);

                                return (
                                    <button
                                        key={value}
                                        onClick={() => available && handleTypChange(value)}
                                        disabled={!available}
                                        className={`
                                            min-w-[100px] px-5 py-2.5 font-medium transition-all rounded-full
                                            ${!available
                                            ? 'bg-red-900/20 text-red-400/70 opacity-60 cursor-not-allowed border border-red-800/30'
                                            : selectedTyp === value
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

                {/* Sposób mielenia - tylko gdy wybrana "Mielona" */}
                {selectedTyp === 'Mielona' && onGrindMethodChange && (
                    <div>
                        {/* Nagłówek zawsze na lewo */}
                        <label className="block text-sm text-white mb-2">
                            Sposób mielenia
                        </label>
                        {/* Opcje zależne od typu palenia */}
                        {/* Espresso → ekspres, kawiarka */}
                        {/* Filter/Przelew → drip, ekspres przelewowy */}
                        <div className="grid grid-cols-2 gap-2">
                            {(roastType === 'Espresso'
                                ? [
                                    { value: 'Ekspres', label: 'ekspres' },
                                    { value: 'Kawiarka', label: 'kawiarka' }
                                ]
                                : [
                                    { value: 'Drip', label: 'drip' },
                                    { value: 'EkspresPrzelewowy', label: 'ekspres przelewowy' }
                                ]
                            ).map(({ value, label }) => (
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