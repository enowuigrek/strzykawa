import React from 'react';
import { CafeLocation } from './CafeLocation';
import { RoasteryLocation } from './RoasteryLocation';
import { ContactDetails } from './ContactDetails';
import { useScrollAnimation, scrollAnimations } from '../../../hooks/useScrollAnimation';

export function ContactInfo() {
    const [locationsRef, locationsVisible] = useScrollAnimation({ threshold: 0.2 });
    const [detailsRef, detailsVisible] = useScrollAnimation({ threshold: 0.3 });

    return (
        <div className="px-4 sm:px-6 lg:px-8 py-8 lg:py-10">

            {/* Locations */}
            <div
                ref={locationsRef}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 mb-12 lg:mb-14 transition-all duration-700 ease-out ${
                    locationsVisible ? scrollAnimations.pourDown.visible : scrollAnimations.pourDown.hidden
                }`}
            >
                <CafeLocation />
                <RoasteryLocation />
            </div>

            {/* Contact Details */}
            <div
                ref={detailsRef}
                className={`transition-all duration-700 ease-out ${
                    detailsVisible ? scrollAnimations.pourUp.visible : scrollAnimations.pourUp.hidden
                }`}
            >
                <ContactDetails />
            </div>
        </div>
    );
}