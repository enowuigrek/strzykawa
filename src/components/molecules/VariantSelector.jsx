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

    // Check if specific option is available
    const isOptionAvailable = (optionName, optionValue) => {
        return variants.some(v =>
            v.availableForSale &&
            v.selectedOptions?.find(opt => opt.name === optionName)?.value === optionValue
        );
    };

    const gramatura = extractOptions('Gramatura');
    const typ = extractOptions('Typ').sort((a, b) => {
        // Ziarna zawsze pierwsze, potem Mielona
        if (a === 'Ziarna') return -1;
        if (b === 'Ziarna') return 1;
        return 0;
    });

    // Get currently selected options
    const selectedGramatura = selectedVariant?.selectedOptions?.find(
        opt => opt.name === 'Gramatura'
    )?.value;

    const selectedTyp = selectedVariant?.selectedOptions?.find(
        opt => opt.name === 'Typ'
    )?.value;

    // Find variant by selected options
    const findVariant = (gram, type) => {
        return variants.find(variant => {
            const variantGram = variant.selectedOptions?.find(opt => opt.name === 'Gramatura')?.value;
            const variantType = variant.selectedOptions?.find(opt => opt.name === 'Typ')?.value;

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
                                            px-5 py-2.5 font-medium transition-all rounded-full
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
                {/* Sposób przygotowania */}
                {typ.length > 1 && (
                    <div>
                        {/* Nagłówek w grid - nad drugim przyciskiem (Mielona) */}
                        <div className="grid grid-cols-2 gap-2 mb-2">
                            <div /> {/* Pusta kolumna nad Ziarna */}
                            <label className="text-sm text-white">
                                Sposób przygotowania
                            </label>
                        </div>
                        {/* Przyciski w grid - Ziarna | Mielona */}
                        <div className="grid grid-cols-2 gap-2">
                            {typ.map(value => {
                                const available = isOptionAvailable('Typ', value);

                                return (
                                    <button
                                        key={value}
                                        onClick={() => available && handleTypChange(value)}
                                        disabled={!available}
                                        className={`
                                            px-5 py-2.5 font-medium transition-all rounded-full
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
                        <label className="block text-sm text-white mb-2 text-right">
                            Sposób mielenia
                        </label>
                        <div className="flex flex-wrap gap-2 justify-end">
                            {['Pod ekspres', 'Pod drip'].map(value => (
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
                                    {value}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}