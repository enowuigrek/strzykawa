import React from 'react';

/**
 * ProductMeta - Metadane produktu z akcentem koloru kraju
 * Normalne tło + kolorowy border-left jako akcent
 */
export function ProductMeta({ coffee }) {
    const origin = coffee?.origin?.[0] || {};

    // Kolory kraju - jako akcent
    const COUNTRY_COLOR = {
        Brazylia: '#1b8851',
        Kolumbia: '#F4C64E',
        Etiopia:  '#4AA3DF',
        Kenia:    '#b62424',
        Peru:     '#8B6CEB',
        Rwanda:   '#F29C52',
    };
    const country = origin.country || '';
    const accentColor = coffee.themeColor || COUNTRY_COLOR[country] || '#F1CE6A';

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

    // Profil smakowy
    if (coffee.tastingNotes && coffee.tastingNotes.length > 0) {
        metaItems.push({
            label: 'Profil',
            value: coffee.tastingNotes.join(', ')
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