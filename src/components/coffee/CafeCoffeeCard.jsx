import React, { useState } from 'react';
import { FaEye, FaEyeSlash, FaCoffee } from 'react-icons/fa';
import coffeePlaceholder from '../../assets/coffee-placeholder.jpg';

export function CafeCoffeeCard({ coffee }) {
    const [showDetails, setShowDetails] = useState(false);

    const getOriginDisplay = (origin) => {
        if (!origin || !origin.length) return '';
        return origin.map(o => o.country).filter(Boolean).join(', ');
    };

    const getRoastTypeDisplay = (roastType) => {
        const mapping = { 'Filter': 'Przelew', 'Espresso': 'Espresso' };
        return mapping[roastType] || roastType || '';
    };

    const getOriginDetails = (origin) => {
        if (!origin || !origin.length) return {};
        const firstOrigin = origin[0];
        return {
            region: firstOrigin.region || '',
            farm: firstOrigin.farm || '',
            processing: firstOrigin.processing || '',
            variety: firstOrigin.variety ? firstOrigin.variety.join(', ') : '',
            altitude: firstOrigin.altitudeMasl ? `${firstOrigin.altitudeMasl} m n.p.m.` : ''
        };
    };

    const originDetails = getOriginDetails(coffee.origin);

    return (
        <article className="bg-gradient-to-br from-primary to-primary-light overflow-hidden border border-white/5 shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-accent/20 hover:border-white/10 flex flex-col">

            {/* Subtle top border glow effect */}
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>

            {/* Image Section - większa niż w sklepie */}
            <div className="relative h-56 overflow-hidden cursor-pointer">
                <img
                    src={coffee.image || coffeePlaceholder}
                    alt={`Kawa ${coffee.name}`}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    loading="lazy"
                />

                {/* Roast Type Badge */}
                {getRoastTypeDisplay(coffee.roastType) && (
                    <div className={`absolute top-3 left-3 px-3 py-1 text-xs font-bold rounded-full z-20 ${
                        coffee.roastType === 'Filter'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-300 text-gray-800'
                    }`}>
                        {getRoastTypeDisplay(coffee.roastType)}
                    </div>
                )}

                {/* Details Toggle */}
                <button
                    onClick={() => setShowDetails(!showDetails)}
                    className="absolute top-3 right-3 w-10 h-10 bg-black/40 hover:bg-accent backdrop-blur-sm border border-white/60 hover:border-accent text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-20"
                    aria-label={`${showDetails ? 'Ukryj' : 'Pokaż'} szczegóły kawy ${coffee.name}`}
                >
                    {showDetails ? <FaEyeSlash className="w-4 h-4" /> : <FaEye className="w-4 h-4" />}
                </button>

                {/* Expandable Details Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t from-primary-dark/95 via-primary/80 to-primary/60 backdrop-blur-md border-t border-white/10 transition-transform duration-300 ease-out z-10 ${showDetails ? 'translate-y-0' : 'translate-y-full'}`}>
                    <div className="p-4 h-full overflow-y-auto pt-16">
                        <div className="text-xs font-semibold text-muted uppercase tracking-wider mb-3">
                            Szczegóły pochodzenia
                        </div>
                        <dl className="grid grid-cols-1 gap-2 text-sm">
                            {originDetails.region && (
                                <div className="flex justify-between">
                                    <dt className="text-muted">Region:</dt>
                                    <dd className="text-white font-medium">{originDetails.region}</dd>
                                </div>
                            )}
                            {originDetails.processing && (
                                <div className="flex justify-between">
                                    <dt className="text-muted">Obróbka:</dt>
                                    <dd className="text-white font-medium">{originDetails.processing}</dd>
                                </div>
                            )}
                            {originDetails.variety && (
                                <div className="flex justify-between">
                                    <dt className="text-muted">Odmiana:</dt>
                                    <dd className="text-white font-medium">{originDetails.variety}</dd>
                                </div>
                            )}
                            {originDetails.farm && (
                                <div className="flex justify-between">
                                    <dt className="text-muted">Farma:</dt>
                                    <dd className="text-white font-medium">{originDetails.farm}</dd>
                                </div>
                            )}
                            {originDetails.altitude && (
                                <div className="flex justify-between">
                                    <dt className="text-muted">Wysokość:</dt>
                                    <dd className="text-white font-medium">{originDetails.altitude}</dd>
                                </div>
                            )}
                            {coffee.species && coffee.species.length > 0 && (
                                <div className="flex justify-between">
                                    <dt className="text-muted">Gatunek:</dt>
                                    <dd className="text-white font-medium">{coffee.species.join(', ')}</dd>
                                </div>
                            )}
                        </dl>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="p-4 space-y-3 flex-1">

                {/* Header - bez ceny */}
                <div className="flex items-start justify-between gap-2">
                    <h3 className="text-xl font-semibold text-white leading-tight flex-grow">
                        {coffee.name}
                    </h3>
                </div>

                <div className="flex items-center justify-between text-sm">
                    <span className="text-muted">{getOriginDisplay(coffee.origin)}</span>
                    {/* Roast level przeniesiony tutaj */}
                    {coffee.roastLevel && (
                        <span className="inline-flex items-center px-2 py-1 bg-accent/20 border border-muted/30 text-muted text-xs font-medium rounded-full">
                            {coffee.roastLevel}
                        </span>
                    )}
                </div>

                {/* Roast Level - usunięte, przeniesione wyżej */}

                {/* Tasting Notes - zachowane jak w sklepie (po przecinku) */}
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

                {/* Description - nowy element dla kawiarni */}
                {coffee.description && (
                    <div className="space-y-1">
                        <span className="text-xs font-semibold text-muted uppercase tracking-wider">
                            Charakterystyka
                        </span>
                        <p className="text-sm text-white/90 leading-relaxed">
                            {coffee.description}
                        </p>
                    </div>
                )}

                {/* Expandable Details - usunięte, przeniesione na overlay */}
            </div>
        </article>
    );
}