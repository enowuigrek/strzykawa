import React from 'react';
import { COUNTRY_COLORS, DEFAULT_COUNTRY_COLOR } from '../../constants/colors.js';

/**
 * Helper: Kapitalizuje pierwszy wyraz w liście
 */
const capitalizeFirst = (items) => {
    if (!items || items.length === 0) return '';
    const capitalized = items.map((item, index) =>
        index === 0 ? item.charAt(0).toUpperCase() + item.slice(1) : item
    );
    return capitalized.join(', ');
};

/**
 * ProductMeta - Metadane produktu z akcentem koloru kraju
 * Normalne tło + kolorowy border-left jako akcent (z gradientem dla blendów)
 */
export function ProductMeta({ coffee }) {
    const origin = coffee?.origin?.[0] || {};
    const country = origin.country || '';

    // Check if it's a blend - either multiple origins OR comma-separated countries
    const countries = country.includes(',')
        ? country.split(',').map(c => c.trim())
        : [country];
    const isBlend = countries.length > 1 || coffee?.origin?.length > 1;

    // Determine accent color/gradient
    let accentStyle;
    if (isBlend && countries.length > 1) {
        // Blend with comma-separated countries: vertical gradient
        const color1 = coffee.themeColor || COUNTRY_COLORS[countries[0]] || DEFAULT_COUNTRY_COLOR;
        const color2 = COUNTRY_COLORS[countries[1]] || DEFAULT_COUNTRY_COLOR;
        accentStyle = `linear-gradient(to bottom, ${color1}, ${color2})`;
    } else if (isBlend && coffee?.origin?.length > 1) {
        // Blend with multiple origin objects: vertical gradient
        const country1 = coffee.origin[0]?.country || '';
        const country2 = coffee.origin[1]?.country || '';
        const color1 = coffee.themeColor || COUNTRY_COLORS[country1] || DEFAULT_COUNTRY_COLOR;
        const color2 = COUNTRY_COLORS[country2] || DEFAULT_COUNTRY_COLOR;
        accentStyle = `linear-gradient(to bottom, ${color1}, ${color2})`;
    } else {
        // Single origin: solid color
        const accentColor = coffee.themeColor || COUNTRY_COLORS[country] || DEFAULT_COUNTRY_COLOR;
        accentStyle = accentColor;
    }

    const metaItems = [];

    // Kraj
    if (origin.country) {
        metaItems.push({
            label: 'Kraj',
            value: origin.country
        });
    }

    // Region
    if (origin.region) {
        metaItems.push({
            label: 'Region',
            value: origin.region
        });
    }

    // Obróbka
    if (origin.processing) {
        metaItems.push({
            label: 'Obróbka',
            value: origin.processing
        });
    }

    // Odmiana
    if (origin.variety && origin.variety.length > 0) {
        metaItems.push({
            label: 'Odmiana',
            value: origin.variety.join(', ')
        });
    }

    // Profil smakowy - z wielką literą na początku
    if (coffee.tastingNotes && coffee.tastingNotes.length > 0) {
        metaItems.push({
            label: 'Profil',
            value: capitalizeFirst(coffee.tastingNotes)
        });
    }

    if (metaItems.length === 0) {
        return null;
    }

    return (
        <div className="flex overflow-hidden">
            {/* Lewy kolorowy pasek (gradient dla blendów) */}
            <div
                className="w-1 flex-shrink-0"
                style={{
                    background: accentStyle
                }}
            />

            {/* Container z parametrami */}
            <div className="flex-1">
                {metaItems.map((item, index) => (
                    <div key={index} className="relative">
                        <div className="flex px-4 py-3">
                            <div className="text-muted text-base font-medium w-32">
                                {item.label}:
                            </div>
                            <div className="text-white text-base flex-1">
                                {item.value}
                            </div>
                        </div>
                        {/* Separator odsunięty od obu krawędzi */}
                        {index < metaItems.length - 1 && (
                            <div className="h-px bg-white/10 mx-4" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}