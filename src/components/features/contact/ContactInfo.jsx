import React from 'react';
import { CafeLocation } from './CafeLocation';
import { RoasteryLocation } from './RoasteryLocation';
import { ContactDetails } from './ContactDetails';

export function ContactInfo() {
    return (
        <div className="p-8">

            {/* Locations */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
                <CafeLocation />
                <RoasteryLocation />
            </div>

            {/* Contact Details */}
            <ContactDetails />
        </div>
    );
}