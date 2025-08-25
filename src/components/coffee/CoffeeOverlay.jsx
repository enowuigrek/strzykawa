import React from 'react';

export function CoffeeOverlay({ coffee, isOpen }) {
    // Helper functions for data processing
    const getOriginDisplay = (origin) => {
        if (!origin || !origin.length) return '';
        return origin.map(o => o.country).filter(Boolean).join(', ');
    };

    const getVarietyDisplay = (origin) => {
        if (!origin || !origin.length) return '';
        const varieties = origin.flatMap(o => o.variety || []).filter(Boolean);
        return varieties.length ? varieties.join(', ') : '';
    };

    const getProcessingDisplay = (origin) => {
        if (!origin || !origin.length) return '';
        const processing = origin.map(o => o.processing).filter(Boolean);
        return processing.length ? processing[0] : '';
    };

    const getRegionDisplay = (origin) => {
        if (!origin || !origin.length) return '';
        const regions = origin.map(o => o.region).filter(Boolean);
        return regions.length ? regions.join(', ') : '';
    };

    const getFarmDisplay = (origin) => {
        if (!origin || !origin.length) return '';
        const farms = origin.map(o => o.farm).filter(Boolean);
        return farms.length ? farms.join(', ') : '';
    };

    const getAltitudeDisplay = (origin) => {
        if (!origin || !origin.length) return '';
        const altitudes = origin.map(o => o.altitudeMasl).filter(Boolean);
        return altitudes.length ? `${altitudes[0]} m n.p.m.` : '';
    };

    return (
        <div className={`absolute inset-0 bg-gradient-to-t from-primary-dark/95 via-primary/80 to-primary/60 backdrop-blur-md border-t border-white/10 transition-transform duration-300 ease-out z-10 ${isOpen ? 'translate-y-0' : 'translate-y-full'} hover:translate-y-0`}>
            <div className="p-4 h-full overflow-y-auto scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent pt-16">
                <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
                    {getRegionDisplay(coffee.origin) && (
                        <>
                            <dt className="font-semibold text-muted opacity-90">Region:</dt>
                            <dd className="text-white">{getRegionDisplay(coffee.origin)}</dd>
                        </>
                    )}

                    {getProcessingDisplay(coffee.origin) && (
                        <>
                            <dt className="font-semibold text-muted opacity-90">Obróbka:</dt>
                            <dd className="text-white">{getProcessingDisplay(coffee.origin)}</dd>
                        </>
                    )}

                    {getVarietyDisplay(coffee.origin) && (
                        <>
                            <dt className="font-semibold text-muted opacity-90">Odmiana:</dt>
                            <dd className="text-white">{getVarietyDisplay(coffee.origin)}</dd>
                        </>
                    )}

                    {getFarmDisplay(coffee.origin) && (
                        <>
                            <dt className="font-semibold text-muted opacity-90">Farma:</dt>
                            <dd className="text-white">{getFarmDisplay(coffee.origin)}</dd>
                        </>
                    )}

                    {coffee.species && coffee.species.length > 0 && (
                        <>
                            <dt className="font-semibold text-muted opacity-90">Gatunek:</dt>
                            <dd className="text-white">{coffee.species.join(', ')}</dd>
                        </>
                    )}

                    {getAltitudeDisplay(coffee.origin) && (
                        <>
                            <dt className="font-semibold text-muted opacity-90">Wysokość:</dt>
                            <dd className="text-white">{getAltitudeDisplay(coffee.origin)}</dd>
                        </>
                    )}

                    {coffee.roastLevel && (
                        <>
                            <dt className="font-semibold text-muted opacity-90">Wypał:</dt>
                            <dd className="text-white">{coffee.roastLevel}</dd>
                        </>
                    )}
                </dl>
            </div>
        </div>
    );
}