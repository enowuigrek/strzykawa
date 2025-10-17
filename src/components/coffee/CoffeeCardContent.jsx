import React, { useMemo, useState } from 'react';
import { ParametrSelector, weightOptions, formOptions } from './ParametrSelector.jsx';

export function CoffeeCardContent({ coffee }) {
    const [currentPrice, setCurrentPrice]   = useState(weightOptions[0].price);
    const [currentWeight, setCurrentWeight] = useState(weightOptions[0].value);
    const [currentForm, setCurrentForm]     = useState('whole');

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
                    onPriceChange={setCurrentPrice}
                    onWeightChange={setCurrentWeight}
                    onFormChange={setCurrentForm}
                />
            </div>
            {/*Jesli chcę profil na karcie*/}
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