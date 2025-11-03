import React, { useMemo, useState, useEffect } from 'react';
import { ParametrSelector, formOptions } from './ParametrSelector.jsx';

export function CoffeeCardContent({ coffee }) {
    // ✅ FIX: Buduj weightOptions DYNAMICZNIE z coffee.variants
    const weightOptions = useMemo(() => {
        if (!coffee?.variants || coffee.variants.length === 0) {
            // Fallback - jeśli brak wariantów
            return [
                { value: '250g', price: 0 },
                { value: '1kg', price: 0 }
            ];
        }

        // Szukaj wariantów z gramaturą w title lub selectedOptions
        const variants250g = coffee.variants.filter(v =>
            v.title?.includes('250g') ||
            v.selectedOptions?.some(opt => opt.value === '250g')
        );

        const variants1kg = coffee.variants.filter(v =>
            v.title?.includes('1kg') ||
            v.selectedOptions?.some(opt => opt.value === '1kg')
        );

        // Weź pierwszy wariant dla każdej gramatury (Ziarna preferowane)
        const variant250g = variants250g.find(v => v.title?.includes('Ziarna')) || variants250g[0];
        const variant1kg = variants1kg.find(v => v.title?.includes('Ziarna')) || variants1kg[0];

        const options = [];

        if (variant250g) {
            options.push({
                value: '250g',
                price: variant250g.price || 0
            });
        }

        if (variant1kg) {
            options.push({
                value: '1kg',
                price: variant1kg.price || 0
            });
        }

        console.log('💰 Built dynamic weight options:', options);
        return options.length > 0 ? options : [{ value: '250g', price: 0 }];
    }, [coffee?.variants]);

    // State - inicjalizuj z pierwszej opcji
    const [currentPrice, setCurrentPrice] = useState(weightOptions[0]?.price || 0);
    const [currentWeight, setCurrentWeight] = useState(weightOptions[0]?.value || '250g');
    const [currentForm, setCurrentForm] = useState('whole');

    // ✅ Update price gdy weightOptions się zmienią (po załadowaniu z API)
    useEffect(() => {
        if (weightOptions.length > 0 && weightOptions[0].price !== currentPrice) {
            setCurrentPrice(weightOptions[0].price);
            setCurrentWeight(weightOptions[0].value);
        }
    }, [weightOptions]);

    const origin = useMemo(() => {
        if (!coffee?.origin?.length) return '';
        return coffee.origin.map(o => o.country).filter(Boolean).join(', ');
    }, [coffee?.origin]);

    const notes = (coffee?.tastingNotes || []).join(', ');

    const formLabel = useMemo(() => {
        const f = formOptions.find(o => o.value === currentForm);
        return f ? f.label : '';
    }, [currentForm]);

    return (
        <div className="p-4 flex-1 grid grid-rows-[auto,1fr,auto] gap-3">
            <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                    {/* 2 linie dla tytułu */}
                    <h3 className="text-lg md:text-xl font-semibold text-white leading-snug line-clamp-2">
                        {coffee.name}
                    </h3>
                    {/* 1 linia dla kraju */}
                    {origin ? (
                        <p className="mt-0.5 text-xs text-white/70 line-clamp-1">{origin}</p>
                    ) : null}
                </div>

                <div className="text-right shrink-0">
                    <div className="text-3xl font-bold text-white leading-none">{currentPrice} zł</div>
                    {/* meta pod ceną */}
                    <div className="mt-1 text-[11px] uppercase tracking-wide text-white/70 flex items-center gap-2 justify-end">
                        <span>{formLabel}</span>
                        <span className="w-1 h-1 rounded-full bg-white/30" />
                        <span>{currentWeight}</span>
                    </div>
                </div>
            </div>
            <div className="flex justify-end">
                <ParametrSelector
                    size="sm"
                    weightOptions={weightOptions} // ✅ Przekaż dynamiczne opcje
                    onPriceChange={setCurrentPrice}
                    onWeightChange={setCurrentWeight}
                    onFormChange={setCurrentForm}
                />
            </div>
            {/* Jeśli chcę profil na karcie */}
            <div className="pt-3 border-t border-white/10">
                <span className="text-xs font-semibold text-white uppercase tracking-wider">Profil</span>
                {notes ? (
                    <p className="mt-1 text-sm text-white/70 leading-relaxed line-clamp-3">
                        {notes}
                    </p>
                ) : null}
            </div>
        </div>
    );
}