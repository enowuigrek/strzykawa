import React from 'react';
import { FaMapMarkerAlt, FaClock, FaCoffee, FaExternalLinkAlt } from 'react-icons/fa';

export function CafeLocation() {
    const cafeHours = [
        { days: 'Poniedziałek - Piątek', hours: '9:00 - 17:00' },
        { days: 'Sobota', hours: '10:00 - 15:00' },
        { days: 'Niedziela', hours: 'zamknięte' },
    ];

    const openGoogleMaps = () => {
        window.open(`https://maps.app.goo.gl/TkVzjmw5Z8tXtYiq8`, '_blank');
    };

    return (
        <div className="space-y-7">
            <div className="flex items-center gap-3 mb-5">
                {/*<div className="p-3 bg-accent/20">*/}
                {/*    /!*<FaCoffee className="w-6 h-6 text-muted" />*!/*/}
                {/*</div>*/}
                <h3 className="text-2xl text-white font-normal">Kawiarnia</h3>
            </div>

            <div className="space-y-5">
                {/* Adres z przyciskiem do map */}
                <div className="flex items-start gap-3">
                    <FaMapMarkerAlt className="w-4 h-4 text-muted mt-1 flex-shrink-0" />
                    <div className="flex-1">
                        <div className="font-medium text-white">ul. Dąbrowskiego 4</div>
                        <div className="text-muted">42-200 Częstochowa</div>
                    </div>
                </div>

                {/* Godziny kawiarni */}
                <div className="flex items-start gap-3">
                    <FaClock className="w-4 h-4 text-muted mt-1 flex-shrink-0" />
                    <div>
                        <div className="font-medium text-white mb-2">Godziny otwarcia</div>
                        {cafeHours.map((schedule, index) => (
                            <div key={index} className="flex justify-between items-center text-base">
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