import React, { useState } from 'react';
import { WeightSelector } from './WeightSelector';

export function CoffeeCardContent({ coffee }) {
    const [currentPrice, setCurrentPrice] = useState(49);
    const [currentWeight, setCurrentWeight] = useState('250g');

    const getOriginDisplay = (origin) => {
        if (!origin || !origin.length) return '';
        return origin.map(o => o.country).filter(Boolean).join(', ');
    };

    return (
        <div className="p-4 space-y-3 flex-1">
            <div className="flex items-start justify-between gap-2">
                <h3 className="text-xl font-semibold text-white leading-tight flex-grow">
                    {coffee.name}
                </h3>

                {/* Price */}
                <div className="text-right flex-shrink-0">
                    <span className="text-xl font-bold text-white">{currentPrice} zł</span>
                    <span className="block text-xs text-muted">{currentWeight}</span>
                </div>
            </div>

            <div className="flex items-center justify-between text-sm">
                <span className="text-muted">{getOriginDisplay(coffee.origin)}</span>
                {/* Weight Selector - w miejscu gdzie był roast type */}
                <WeightSelector
                    onWeightChange={setCurrentWeight}
                    onPriceChange={setCurrentPrice}
                />
            </div>

            {coffee.tastingNotes && coffee.tastingNotes.length > 0 && (
                <div className="space-y-1">
                    <span className="text-xs font-semibold text-muted uppercase tracking-wider">
                        Nuty smakowe
                    </span>
                    <p className="text-sm text-white leading-relaxed">
                        {coffee.tastingNotes.join(', ')}
                    </p>
                </div>
            )}
        </div>
    );
}