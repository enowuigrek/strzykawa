import React from 'react';
import { FaMapMarkerAlt, FaClock, FaIndustry } from 'react-icons/fa';

export function RoasteryLocation() {
    const roasteryHours = [
        { days: 'Piątek', hours: '15:00 - 17:00' },
        { days: 'Sobota', hours: '10:00 - 12:00' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-orange-500/20 border border-orange-500/30">
                    <FaIndustry className="w-6 h-6 text-orange-400" />
                </div>
                <h3 className="text-2xl font-bold text-white">Palarnia</h3>
            </div>

            <div className="space-y-4">
                {/* Adres palarni */}
                <div className="flex items-start gap-3">
                    <FaMapMarkerAlt className="w-4 h-4 text-orange-400 mt-1 flex-shrink-0" />
                    <div>
                        <div className="font-semibold text-white">ul. Przemysłowa 12</div>
                        <div className="text-muted">42-200 Częstochowa</div>
                    </div>
                </div>

                {/* Godziny palarni */}
                <div className="flex items-start gap-3">
                    <FaClock className="w-4 h-4 text-white/70 mt-1 flex-shrink-0" />
                    <div>
                        <div className="font-semibold text-white mb-2">Zwiedzanie palarni</div>
                        {roasteryHours.map((schedule, index) => (
                            <div key={index} className="flex justify-between items-center text-sm">
                                <span className="text-muted">{schedule.days}</span>
                                <span className="text-white font-medium ml-4">{schedule.hours}</span>
                            </div>
                        ))}
                        <p className="text-xs text-muted/80 mt-2">
                            * Wizyty po wcześniejszym umówieniu
                        </p>
                    </div>
                </div>

                {/* Info o palarni */}
                <div className="bg-orange-500/10 border border-orange-500/20 p-4">
                    <p className="text-sm text-white/90 leading-relaxed">
                        Zapraszamy na zwiedzanie naszej palarni! Zobacz jak powstają nasze kawy specialty,
                        poznaj proces palenia i spróbuj świeżo upalonych ziaren. Idealne dla miłośników kawy
                        i grup zorganizowanych.
                    </p>
                </div>
            </div>
        </div>
    );
}