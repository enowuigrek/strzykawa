import React from 'react';
import { Link } from 'react-router-dom';
import { COUNTRY_COLORS, DEFAULT_COUNTRY_COLOR } from '../../constants/colors.js';

/**
 * CoffeeOverlay - Style jak na naklejce z nagłówkiem kraju
 */
export function CoffeeOverlay({ coffee, isOpen }) {
    const origin = coffee?.origin?.[0] || {};

    const country = origin.country || '';
    const bgColor = coffee.themeColor || COUNTRY_COLORS[country] || DEFAULT_COUNTRY_COLOR;

    // IF: Jeśli nazwa zaczyna się od kraju, usuń kraj z nazwy
    let displayName = coffee.name;
    if (country && coffee.name.startsWith(country)) {
        displayName = coffee.name.replace(country, '').trim();
    }

    // Prepare details - BEZ kraju (będzie w nagłówku)
    const details = [];

    if (origin.region) {
        details.push({ label: 'Region', value: origin.region });
    }

    if (origin.processing) {
        details.push({ label: 'Obróbka', value: origin.processing });
    }

    if (origin.variety && origin.variety.length > 0) {
        details.push({ label: 'Odmiana', value: origin.variety.join(', ') });
    }

    if (coffee.tastingNotes && coffee.tastingNotes.length > 0) {
        details.push({ label: 'Profil', value: coffee.tastingNotes.join(', ') });
    }

    return (
        <Link
            to={`/kawy/${coffee.shopifyHandle || coffee.id}`}
            className={`
                absolute inset-0
                backdrop-blur-md
                transition-transform duration-300 ease-out
                block
                ${isOpen ? 'translate-y-0 z-20' : 'translate-y-full pointer-events-none'}
            `}
            style={{
                background: `linear-gradient(to top, ${bgColor}f2, ${bgColor}e6 40%, ${bgColor}cc)`
            }}
        >
            <div className="h-full overflow-y-auto p-3 flex flex-col items-center justify-center">
                {/* Nagłówek z krajem - jak na naklejce */}
                {country && (
                    <div className="text-center mb-5">
                        <h3 className="text-2xl font-bold text-black uppercase tracking-wide">
                            {country}
                        </h3>
                        <p className="text-lg text-black">
                            {displayName}
                        </p>
                    </div>
                )}

                {/* Details jak na naklejce */}
                {details.length > 0 ? (
                    <div className="space-y-2 w-full max-w-xs">
                        {details.map((detail, index) => (
                            <div
                                key={index}
                                className="flex items-start gap-2"
                            >
                                {/* Label - normalny font */}
                                <dt className="text-base text-black font-bold shrink-0">
                                    {detail.label}:
                                </dt>
                                {/* Value - bold */}
                                <dd className="text-base text-black">
                                    {detail.value}
                                </dd>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-sm text-black/70 text-center mt-4">
                        Brak dodatkowych szczegółów
                    </p>
                )}
            </div>
        </Link>
    );
}