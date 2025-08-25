import React from 'react';
import { FaMapMarkerAlt, FaClock, FaCoffee } from 'react-icons/fa';

export function CafeLocation() {
    const cafeHours = [
        { days: 'Poniedziałek - Piątek', hours: '9:00 - 17:00' },
        { days: 'Sobota - Niedziela', hours: '10:00 - 15:00' },
    ];

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-accent/20 border border-accent/30">
                    <FaCoffee className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-2xl font-bold text-white">Kawiarnia</h3>
            </div>

            <div className="space-y-4">
                {/* Adres kawiarni */}
                <div className="flex items-start gap-3">
                    <FaMapMarkerAlt className="w-4 h-4 text-accent mt-1 flex-shrink-0" />
                    <div>
                        <div className="font-semibold text-white">ul. Dąbrowskiego 4</div>
                        <div className="text-muted">42-200 Częstochowa</div>
                    </div>
                </div>

                {/* Godziny kawiarni */}
                <div className="flex items-start gap-3">
                    <FaClock className="w-4 h-4 text-white/70 mt-1 flex-shrink-0" />
                    <div>
                        <div className="font-semibold text-white mb-2">Godziny otwarcia</div>
                        {cafeHours.map((schedule, index) => (
                            <div key={index} className="flex justify-between items-center text-sm">
                                <span className="text-muted">{schedule.days}</span>
                                <span className="text-white font-medium ml-4">{schedule.hours}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}