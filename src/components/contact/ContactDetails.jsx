import React from 'react';
import { FaPhone, FaEnvelope } from 'react-icons/fa';

export function ContactDetails() {
    return (
        <div className="border-t border-white/10 pt-8">
            <h4 className="text-xl font-bold text-white mb-6 text-center">Skontaktuj się z nami</h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Telefon */}
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-white/10 border border-white/20">
                        <FaPhone className="w-5 h-5 text-white/70" />
                    </div>
                    <div>
                        <div className="font-semibold text-white">Telefon</div>
                        <a
                            href="tel:+48668011806"
                            className="text-muted hover:text-white transition-colors duration-300"
                        >
                            +48 668 011 806
                        </a>
                    </div>
                </div>

                {/* Email */}
                <div className="flex items-center gap-3">
                    <div className="p-3 bg-green-500/20 border border-green-500/30">
                        <FaEnvelope className="w-5 h-5 text-green-400" />
                    </div>
                    <div>
                        <div className="font-semibold text-white">Email</div>
                        <a
                            href="mailto:fitanddrink@gmail.com"
                            className="text-muted hover:text-green-400 transition-colors duration-300 break-all"
                        >
                            fitanddrink@gmail.com
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}