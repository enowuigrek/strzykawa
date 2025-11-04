import React from 'react';

/**
 * VariantSelector - Wybór wariantu produktu
 * Obsługuje dwie opcje: Gramaturę (250g/1kg) i Typ (Ziarna/Mielona)
 */
export function VariantSelector({
                                    variants = [],
                                    selectedVariant,
                                    onVariantChange
                                }) {
    if (!variants || variants.length === 0) {
        return null;
    }

    // Extract unique option values
    // Shopify variants mają selectedOptions: [{name: "Gramatura", value: "250g"}, {name: "Typ", value: "Ziarna"}]
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

    const gramatura = extractOptions('Gramatura');
    const typ = extractOptions('Typ');

    // Get currently selected options from selectedVariant
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

            // Jeśli produkt nie ma opcji Typ (tylko gramatura), to szukamy tylko po gramaturze
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
        <div className="space-y-4">
            {/* Gramatura */}
            {gramatura.length > 0 && (
                <div>
                    <label className="block text-sm font-semibold text-white mb-2">
                        Gramatura
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {gramatura.map(value => (
                            <button
                                key={value}
                                onClick={() => handleGramaturaChange(value)}
                                className={`
                                    px-5 py-2.5 font-medium transition-all rounded-full
                                    ${selectedGramatura === value
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

            {/* Typ (Ziarna/Mielona) - tylko jeśli istnieje ta opcja */}
            {typ.length > 1 && (
                <div>
                    <label className="block text-sm font-semibold text-white mb-2">
                        Sposób przygotowania
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {typ.map(value => (
                            <button
                                key={value}
                                onClick={() => handleTypChange(value)}
                                className={`
                                    px-5 py-2.5 font-medium transition-all rounded-full
                                    ${selectedTyp === value
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
    );
}