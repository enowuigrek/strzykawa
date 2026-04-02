import React from 'react';
import { FaPhone, FaEnvelope } from 'react-icons/fa';
import {
    CONTACT_PHONE,
    CONTACT_PHONE_HREF,
    CONTACT_EMAIL,
    CONTACT_EMAIL_HREF,
} from '../../../constants/contact';
import { trackPhoneClick, trackEmailClick } from '../../../utils/analytics';

export function ContactDetails() {
    return (
        <div>
            <h3 className="text-2xl text-white mb-8 font-normal">Skontaktuj się z nami</h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {/* Telefon */}
                <div className="flex items-center gap-4">
                    <FaPhone className="w-5 h-5 text-accent flex-shrink-0" />
                    <div>
                        <div className="font-medium text-white">Telefon</div>
                        <a
                            href={CONTACT_PHONE_HREF}
                            onClick={() => trackPhoneClick('contact_page')}
                            className="text-muted hover:text-white transition-colors duration-300"
                        >
                            {CONTACT_PHONE}
                        </a>
                    </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-4">
                    <FaEnvelope className="w-5 h-5 text-accent flex-shrink-0" />
                    <div>
                        <div className="font-medium text-white">Email</div>
                        <a
                            href={CONTACT_EMAIL_HREF}
                            onClick={() => trackEmailClick('contact_page')}
                            className="text-muted hover:text-white transition-colors duration-300"
                        >
                            {CONTACT_EMAIL}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}