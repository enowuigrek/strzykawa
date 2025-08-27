import React from 'react';
import { FaMapMarkerAlt, FaRoute } from 'react-icons/fa';
import { UniversalButton } from '../UniversalButton';

export function ContactMap() {
    const openGoogleMaps = () => {
        window.open(`https://maps.app.goo.gl/TkVzjmw5Z8tXtYiq8`, '_blank');
    };

    const openDirections = () => {
        const address = encodeURIComponent('ul. Dąbrowskiego 4, 42-200 Częstochowa');
        window.open(`https://www.google.com/maps/dir/?api=1&destination=Strzykawa`, '_blank');
    };

    return (
        <div className="relative h-96 lg:h-full min-h-[400px] bg-gradient-to-br from-primary-light/50 to-primary/50 border border-white/10 flex flex-col items-center justify-center p-8 text-center">

            {/* Content */}
            <div className="space-y-6">

                {/* Icon */}
                <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/20 border border-accent/30">
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
                    <UniversalButton
                        onClick={openGoogleMaps}
                        icon={FaMapMarkerAlt}
                        variant="primary"
                        size="md"
                        className="w-full"
                    >
                        Zobacz na mapie
                    </UniversalButton>

                    <UniversalButton
                        onClick={openDirections}
                        icon={FaRoute}
                        variant="secondary"
                        size="md"
                        className="w-full"
                    >
                        Wyznacz trasę
                    </UniversalButton>
                </div>
            </div>
        </div>
    );
}