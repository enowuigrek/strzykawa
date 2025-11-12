import React from 'react';
import { FaMapMarkerAlt, FaFire, FaExternalLinkAlt } from 'react-icons/fa';

export function RoasteryLocation() {
    const openGoogleMaps = () => {
        const address = encodeURIComponent('ul. Mstowska 1C, 42-242 Rędziny');
        window.open(`https://www.google.com/maps/search/?api=1&query=${address}`, '_blank');
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-accent/20">
                    <FaFire className="w-6 h-6 text-muted" />
                </div>
                <div>
                    <h3 className="text-2xl font-bold text-white">Palarnia</h3>
                </div>
            </div>

            <div className="space-y-4">
                {/* Adres palarni */}
                <div className="flex items-start gap-3">
                    <FaMapMarkerAlt className="w-4 h-4 text-muted mt-1 flex-shrink-0" />
                    <div className="flex-1">
                        <div className="font-semibold text-white">ul. Mstowska 1C</div>
                        <div className="text-muted">42-242 Rędziny</div>
                    </div>
                </div>

                {/* Info o palarni */}
                <div className="text-sm text-white/80">
                    <p>
                        Palarnie otwieramy dla gości w kazdą pierwszą niedziele miesiąca, gdzie najczęściej wspolnie wybieramy, które kawy będziemy dla Was wypalać w najbliszej przyszłości. O szczegółach informujemy na naszym mediach społecznościowych, dlatego zachęcamu do śledzenia.
                    </p>
                </div>
            </div>
        </div>
    );
}