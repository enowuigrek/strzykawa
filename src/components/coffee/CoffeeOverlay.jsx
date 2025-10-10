import React from 'react';

export function CoffeeOverlay({ coffee, isOpen }) {
    // Helper functions
    const getOriginDisplay = (origin) =>
        origin?.length ? origin.map((o) => o.country).filter(Boolean).join(', ') : '';

    const getVarietyDisplay = (origin) => {
        if (!origin?.length) return '';
        const varieties = origin.flatMap((o) => o.variety || []).filter(Boolean);
        return varieties.length ? varieties.join(', ') : '';
    };

    const getProcessingDisplay = (origin) =>
        origin?.length ? (origin.map((o) => o.processing).filter(Boolean)[0] || '') : '';

    const getRegionDisplay = (origin) =>
        origin?.length ? origin.map((o) => o.region).filter(Boolean).join(', ') : '';

    const getFarmDisplay = (origin) =>
        origin?.length ? origin.map((o) => o.farm).filter(Boolean).join(', ') : '';

    const getAltitudeDisplay = (origin) => {
        if (!origin?.length) return '';
        const altitudes = origin.map((o) => o.altitudeMasl).filter(Boolean);
        return altitudes.length ? `${altitudes[0]} m n.p.m.` : '';
    };

    return (
        <div
            className={`absolute inset-0 bg-gradient-to-t from-primary-dark/95 via-primary/80 to-primary/60
        backdrop-blur-md border-t border-white/10
        transition-transform duration-300 ease-out z-10
        ${isOpen ? 'translate-y-0' : 'translate-y-full'} hover:translate-y-0`}
        >
            {/* Prawy panel na treść */}
            <div className="h-full flex">
                <div
                    className="
            ml-auto w-full sm:w-[75%] md:w-[65%] lg:w-[55%]
            pl-4 pr-0 pt-3
            overflow-y-auto scrollbar-thin scrollbar-thumb-white/30 scrollbar-track-transparent
            [scrollbar-gutter:stable]
          "
                >
                    <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm">
                        {getRegionDisplay(coffee.origin) && (
                            <>
                                <dt className="font-semibold text-muted opacity-90">Region:</dt>
                                <dd className="text-white text-right">{getRegionDisplay(coffee.origin)}</dd>
                            </>
                        )}

                        {getProcessingDisplay(coffee.origin) && (
                            <>
                                <dt className="font-semibold text-muted opacity-90">Obróbka:</dt>
                                <dd className="text-white text-right">{getProcessingDisplay(coffee.origin)}</dd>
                            </>
                        )}

                        {getVarietyDisplay(coffee.origin) && (
                            <>
                                <dt className="font-semibold text-muted opacity-90">Odmiana:</dt>
                                <dd className="text-white text-right">{getVarietyDisplay(coffee.origin)}</dd>
                            </>
                        )}

                        {getFarmDisplay(coffee.origin) && (
                            <>
                                <dt className="font-semibold text-muted opacity-90">Farma:</dt>
                                <dd className="text-white text-right">{getFarmDisplay(coffee.origin)}</dd>
                            </>
                        )}

                        {coffee.species?.length > 0 && (
                            <>
                                <dt className="font-semibold text-muted opacity-90">Gatunek:</dt>
                                <dd className="text-white text-right">{coffee.species.join(', ')}</dd>
                            </>
                        )}

                        {getAltitudeDisplay(coffee.origin) && (
                            <>
                                <dt className="font-semibold text-muted opacity-90">Wysokość:</dt>
                                <dd className="text-white text-right">{getAltitudeDisplay(coffee.origin)}</dd>
                            </>
                        )}

                        {coffee.roastLevel && (
                            <>
                                <dt className="font-semibold text-muted opacity-90">Wypał:</dt>
                                <dd className="text-white text-right">{coffee.roastLevel}</dd>
                            </>
                        )}
                    </dl>
                </div>
            </div>
        </div>
    );
}