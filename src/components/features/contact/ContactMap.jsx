import React from 'react';
import { FaMapMarkerAlt, FaRoute } from 'react-icons/fa';
import { Button } from '../../atoms/Button.jsx';
import { useScrollAnimation, scrollAnimations } from '../../../hooks/useScrollAnimation';

export function ContactMap() {
    const [contentRef, contentVisible] = useScrollAnimation({ threshold: 0.3 });

    const openGoogleMaps = () => {
        window.open(`https://maps.app.goo.gl/TkVzjmw5Z8tXtYiq8`, '_blank');
    };

    const openDirections = () => {
        window.open(`https://www.google.com/maps/dir/?api=1&destination=Strzykawa`, '_blank');
    };

    return (
        <div className="flex flex-col items-start justify-start">

            {/* Content */}
            <div
                ref={contentRef}
                className={`space-y-6 transition-all duration-700 ease-out ${
                    contentVisible ? scrollAnimations.spread.visible : scrollAnimations.spread.hidden
                }`}
            >

                {/* Header */}
                <div className="space-y-5">
                    <h3 className="text-2xl text-white">Znajdź nas</h3>
                    <div className="flex items-start gap-3">
                        <FaMapMarkerAlt className="w-4 h-4 text-muted mt-1 flex-shrink-0" />
                        <div>
                            <div className="font-medium text-white">ul. Dąbrowskiego 4</div>
                            <div className="text-muted">42-200 Częstochowa</div>
                        </div>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                    <Button
                        onClick={openGoogleMaps}
                        icon={FaMapMarkerAlt}
                        variant="primary"
                        size="md"
                    >
                        Zobacz na mapie
                    </Button>

                    <Button
                        onClick={openDirections}
                        icon={FaRoute}
                        variant="secondary"
                        size="md"
                    >
                        Wyznacz trasę
                    </Button>
                </div>
            </div>
        </div>
    );
}