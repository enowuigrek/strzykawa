import React from 'react';
import { FaBuilding, FaIdCard, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';
import { useScrollAnimation, scrollAnimations } from '../../../hooks/useScrollAnimation';

export function CompanyData() {
    const [ref, visible] = useScrollAnimation({ threshold: 0.2 });

    return (
        <div
            ref={ref}
            className={`space-y-7 transition-all duration-700 ease-out ${
                visible ? scrollAnimations.pourDown.visible : scrollAnimations.pourDown.hidden
            }`}
        >
            <h3 className="text-2xl text-white">Dane firmy</h3>

            <div className="space-y-5">
                <div className="flex items-start gap-3">
                    <FaBuilding className="w-4 h-4 text-muted mt-1 flex-shrink-0" />
                    <div className="font-medium text-white">Strzykawa Damian Dzik</div>
                </div>

                <div className="flex items-start gap-3">
                    <FaMapMarkerAlt className="w-4 h-4 text-muted mt-1 flex-shrink-0" />
                    <div>
                        <div className="font-medium text-white">ul. Warszawska 241</div>
                        <div className="text-muted">42-209 Częstochowa</div>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <FaIdCard className="w-4 h-4 text-muted mt-1 flex-shrink-0" />
                    <div className="font-medium text-white">NIP: 7441726899</div>
                </div>

                <div className="flex flex-col items-start">
                    <div className="flex items-start gap-3">
                        <FaPhone className="w-4 h-4 text-muted mt-1 flex-shrink-0" />
                        <a
                            href="tel:+48668011806"
                            className="text-white hover:text-muted transition-colors duration-300">
                            +48 668 011 806
                        </a>
                    </div>
                    <div className="flex items-start gap-3">
                        <FaEnvelope className="w-4 h-4 text-muted mt-1 flex-shrink-0" />
                        <a
                                href="mailto:kontakt@strzykawa.com"
                                className="text-white hover:text-muted transition-colors duration-300"
                        >
                                kontakt@strzykawa.com
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
