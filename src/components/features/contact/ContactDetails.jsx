import React from 'react';
import { FaPhone, FaEnvelope } from 'react-icons/fa';

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
                            href="tel:+48668011806"
                            className="text-muted hover:text-white transition-colors duration-300"
                        >
                            +48 668 011 806
                        </a>
                    </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-4">
                    <FaEnvelope className="w-5 h-5 text-accent flex-shrink-0" />
                    <div>
                        <div className="font-medium text-white">Email</div>
                        <a
                            href="mailto:kontakt@strzykawa.com"
                            className="text-muted hover:text-white transition-colors duration-300"
                        >
                            kontakt@strzykawa.com
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}