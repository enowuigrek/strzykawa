import React from 'react';

export function CoffeeCardContent({ coffee }) {
    const getOriginDisplay = (origin) => {
        if (!origin || !origin.length) return '';
        return origin.map(o => o.country).filter(Boolean).join(', ');
    };

    const getRoastTypeDisplay = (roastType) => {
        const mapping = { 'Filter': 'Przelew', 'Espresso': 'Espresso' };
        return mapping[roastType] || roastType || '';
    };

    return (
        <div className="p-4 space-y-3 flex-1">
            <div className="flex items-start justify-between gap-2">
                <h3 className="text-xl font-semibold text-white leading-tight flex-grow">
                    {coffee.name}
                </h3>

                {/* Price */}
                <div className="text-right flex-shrink-0">
                    <span className="text-xl font-bold text-white">49 zł</span>
                    <span className="block text-xs text-muted">250g</span>
                </div>
            </div>

            <div className="flex items-center justify-between text-sm">
                <span className="text-muted">{getOriginDisplay(coffee.origin)}</span>
                {getRoastTypeDisplay(coffee.roastType) && (
                    <span className="inline-flex items-center px-2 py-1 bg-accent/20 border border-muted/30 text-muted text-xs font-medium rounded-full">
                        {getRoastTypeDisplay(coffee.roastType)}
                    </span>
                )}
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