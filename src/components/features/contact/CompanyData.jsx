import React from 'react';
import { FaBuilding, FaIdCard, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { useScrollAnimation, scrollAnimations } from '../../../hooks/useScrollAnimation';
import {
    COMPANY_NAME,
    HQ_STREET,
    HQ_ZIP_CITY,
    COMPANY_NIP,
    CONTACT_PHONE,
    CONTACT_PHONE_HREF,
    CONTACT_EMAIL,
    CONTACT_EMAIL_HREF,
} from '../../../constants/contact';
import { trackPhoneClick, trackEmailClick } from '../../../utils/analytics';

export function CompanyData() {
    const [ref, visible] = useScrollAnimation({ threshold: 0.2 });

    return (
        <div
            ref={ref}
            className={`space-y-7 transition-all duration-700 ease-out ${
                visible ? scrollAnimations.pourDown.visible : scrollAnimations.pourDown.hidden
            }`}
        >
            <h3 className="text-2xl text-white font-normal">Dane firmy</h3>

            <div className="space-y-5">
                <div className="flex items-start gap-3">
                    <FaBuilding className="w-4 h-4 text-muted mt-1 flex-shrink-0" />
                    <div className="font-medium text-white">{COMPANY_NAME}</div>
                </div>

                <div className="flex items-start gap-3">
                    <FaMapMarkerAlt className="w-4 h-4 text-muted mt-1 flex-shrink-0" />
                    <div>
                        <div className="font-medium text-white">{HQ_STREET}</div>
                        <div className="text-muted">{HQ_ZIP_CITY}</div>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <FaIdCard className="w-4 h-4 text-muted mt-1 flex-shrink-0" />
                    <div className="font-medium text-white">NIP: {COMPANY_NIP}</div>
                </div>

                <div className="flex flex-col items-start">
                    <div className="flex items-start gap-3">
                        <FaPhone className="w-4 h-4 text-muted mt-1 flex-shrink-0" />
                        <a
                            href={CONTACT_PHONE_HREF}
                            onClick={() => trackPhoneClick('company_data')}
                            className="text-white hover:text-muted transition-colors duration-300">
                            {CONTACT_PHONE}
                        </a>
                    </div>
                    <div className="flex items-start gap-3">
                        <FaEnvelope className="w-4 h-4 text-muted mt-1 flex-shrink-0" />
                        <a
                                href={CONTACT_EMAIL_HREF}
                                onClick={() => trackEmailClick('company_data')}
                                className="text-white hover:text-muted transition-colors duration-300"
                        >
                                {CONTACT_EMAIL}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
