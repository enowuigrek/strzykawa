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
 * Normalne tło + kolorowy border-left jako akcent
 */
export function ProductMeta({ coffee }) {
    const origin = coffee?.origin?.[0] || {};

    const country = origin.country || '';
    const accentColor = coffee.themeColor || COUNTRY_COLORS[country] || DEFAULT_COUNTRY_COLOR;

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
        <div
            className="overflow-hidden"
            style={{
                borderLeftWidth: '4px',
                borderLeftColor: accentColor
            }}
        >
            <table className="w-full">
                <tbody>
                {metaItems.map((item, index) => (
                    <tr
                        key={index}
                        className="border-b border-white/10 last:border-b-0"
                    >
                        <td className="px-4 py-3 text-muted text-base font-medium w-32">
                            {item.label}:
                        </td>
                        <td className="px-4 py-3 text-white text-base">
                            {item.value}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}