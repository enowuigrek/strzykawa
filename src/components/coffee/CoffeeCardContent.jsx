import React, { useState } from 'react';
import { WeightSelector } from './WeightSelector';

export function CoffeeCardContent({ coffee }) {
    const [currentPrice, setCurrentPrice] = useState(49);
    const [currentWeight, setCurrentWeight] = useState('250g');

    const getOriginDisplay = (origin) => {
        if (!origin || !origin.length) return '';
        return origin.map((o) => o.country).filter(Boolean).join(', ');
    };

    const origin = getOriginDisplay(coffee.origin);
    const notes = (coffee.tastingNotes || []).join(', ');

    return (
        <div className="p-4 space-y-4 flex-1">
            {/* Tytuł + kraj / Cena po prawej */}
            <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-semibold text-white leading-tight truncate">
                        {coffee.name}
                    </h3>
                    {origin ? (
                        <p className="mt-1 text-m text-white/70">{origin}</p>
                    ) : null}
                </div>

                {/* Cena (większa) + waga */}
                <div className="text-right shrink-0">
                    <div className="text-3xl md:text-3xl font-bold text-white leading-none">
                        {currentPrice} zł
                    </div>
                    <div className="mt-1 text-s uppercase tracking-wide text-white/60">
                        {currentWeight}
                    </div>
                </div>
            </div>

            {/* Selektor wagi po prawej, profil po lewej */}
            <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
          <span className="text-xs font-semibold text-white uppercase tracking-wider">
            Profil
          </span>
                    {notes ? (
                        <p className="mt-1 text-sm text-white/70 leading-relaxed">
                            {notes}
                        </p>
                    ) : null}
                </div>

                <div className="shrink-0">
                    <WeightSelector
                        onWeightChange={setCurrentWeight}
                        onPriceChange={setCurrentPrice}
                    />
                </div>
            </div>
        </div>
    );
}