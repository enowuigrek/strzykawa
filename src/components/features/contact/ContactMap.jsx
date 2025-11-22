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
        <div className="relative h-96 lg:h-full min-h-[400px] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-8 text-center">

            {/* Content */}
            <div
                ref={contentRef}
                className={`space-y-6 transition-all duration-700 ease-out ${
                    contentVisible ? scrollAnimations.spread.visible : scrollAnimations.spread.hidden
                }`}
            >

                {/* Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16">
                    <FaMapMarkerAlt className="w-8 h-8 text-accent" />
                </div>

                {/* Header */}
                <div>
                    <h4 className="text-2xl font-bold text-white mb-2">Znajdź nas</h4>
                    <p className="text-muted text-lg">ul. Dąbrowskiego 4</p>
                    <p className="text-muted">42-200 Częstochowa</p>
                </div>

                {/* Buttons */}
                <div className="space-y-3">
                    <Button
                        onClick={openGoogleMaps}
                        icon={FaMapMarkerAlt}
                        variant="primary"
                        size="md"
                        className="w-full"
                    >
                        Zobacz na mapie
                    </Button>

                    <Button
                        onClick={openDirections}
                        icon={FaRoute}
                        variant="secondary"
                        size="md"
                        className="w-full"
                    >
                        Wyznacz trasę
                    </Button>
                </div>
            </div>
        </div>
    );
}