import React from 'react';
import { Link } from 'react-router-dom';
import { COUNTRY_COLORS, DEFAULT_COUNTRY_COLOR } from '../../constants/colors.js';

/**
 * CoffeeOverlay - Style jak na naklejce z nagłówkiem kraju
 */
export function CoffeeOverlay({ coffee, isOpen }) {
    const origin = coffee?.origin?.[0] || {};
    const country = origin.country || '';

    // Check if it's a blend - either multiple origins OR comma-separated countries in one origin
    const countries = country.includes(',')
        ? country.split(',').map(c => c.trim())
        : [country];
    const isBlend = countries.length > 1 || coffee?.origin?.length > 1;

    // Determine background color/gradient based on blend status
    let backgroundStyle;
    if (isBlend && countries.length > 1) {
        // Blend with comma-separated countries: horizontal gradient
        const color1 = coffee.themeColor || COUNTRY_COLORS[countries[0]] || DEFAULT_COUNTRY_COLOR;
        const color2 = COUNTRY_COLORS[countries[1]] || DEFAULT_COUNTRY_COLOR;

        backgroundStyle = `
            linear-gradient(to top, rgba(0,0,0,0.08), transparent 40%, rgba(0,0,0,0.05)),
            linear-gradient(to right, ${color1}, ${color2})
        `;
    } else if (isBlend && coffee?.origin?.length > 1) {
        // Blend with multiple origin objects: horizontal gradient
        const country1 = coffee.origin[0]?.country || '';
        const country2 = coffee.origin[1]?.country || '';
        const color1 = coffee.themeColor || COUNTRY_COLORS[country1] || DEFAULT_COUNTRY_COLOR;
        const color2 = COUNTRY_COLORS[country2] || DEFAULT_COUNTRY_COLOR;

        backgroundStyle = `
            linear-gradient(to top, rgba(0,0,0,0.08), transparent 40%, rgba(0,0,0,0.05)),
            linear-gradient(to right, ${color1}, ${color2})
        `;
    } else {
        // Single origin: existing vertical gradient
        const bgColor = coffee.themeColor || COUNTRY_COLORS[country] || DEFAULT_COUNTRY_COLOR;
        backgroundStyle = `linear-gradient(to top, ${bgColor}f2, ${bgColor}e6 40%, ${bgColor}cc)`;
    }

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
                transition-all duration-300 ease-out
                block
                ${isOpen ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'} z-20
            `}
            style={{
                background: backgroundStyle
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