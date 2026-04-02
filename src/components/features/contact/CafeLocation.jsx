import React from 'react';
import { FaMapMarkerAlt, FaClock, FaCoffee, FaExternalLinkAlt } from 'react-icons/fa';
import { CAFE_STREET, CAFE_ZIP_CITY, CAFE_HOURS, CAFE_MAPS_URL } from '../../../constants/contact';
import { trackMapsClick } from '../../../utils/analytics';

export function CafeLocation() {
    const openGoogleMaps = () => {
        trackMapsClick('cafe_location');
        window.open(CAFE_MAPS_URL, '_blank');
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
                        <div className="font-medium text-white">{CAFE_STREET}</div>
                        <div className="text-muted">{CAFE_ZIP_CITY}</div>
                    </div>
                </div>

                {/* Godziny kawiarni */}
                <div className="flex items-start gap-3">
                    <FaClock className="w-4 h-4 text-muted mt-1 flex-shrink-0" />
                    <div>
                        <div className="font-medium text-white mb-2">Godziny otwarcia</div>
                        {CAFE_HOURS.map((schedule, index) => (
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