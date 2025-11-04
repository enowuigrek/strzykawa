import React from 'react';

/**
 * ProductMeta - Metadane produktu kawy
 * Wyświetla: kraj, region, odmiany, obróbkę, profil smakowy w prostej tabeli
 */
export function ProductMeta({ coffee }) {
    const origin = coffee?.origin?.[0] || {};
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
        <div className="border border-white/10 bg-primary-light overflow-hidden">
            <table className="w-full">
                <tbody>
                {metaItems.map((item, index) => (
                    <tr
                        key={index}
                        className="border-b border-white/10 last:border-b-0"
                    >
                        <td className="px-4 py-3 text-muted text-sm font-medium w-32">
                            {item.label}:
                        </td>
                        <td className="px-4 py-3 text-white text-sm">
                            {item.value}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}