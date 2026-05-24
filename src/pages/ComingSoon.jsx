import React from 'react';
import { FaCoffee, FaEnvelope } from 'react-icons/fa';
import { CAFE_ADDRESS } from '../constants/contact';

export function ComingSoon() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4 pt-32 pb-20">
            <div className="text-center max-w-md">

                {/* Ikona */}
                <div
                    className="text-5xl mb-8 inline-block"
                    style={{ animation: 'gentleRock 3s ease-in-out infinite' }}
                >
                    🔧
                </div>

                {/* Komunikat */}
                <h1 className="text-3xl md:text-4xl text-white font-normal mb-4">
                    Sklep chwilowo niedostępny
                </h1>
                <p className="text-white/60 text-lg mb-12">
                    Robimy przerwę techniczną. Wrócimy niebawem!
                </p>

                {/* CTA — kawiarnia */}
                <div className="space-y-6">
                    <div>
                        <p className="text-white/50 text-sm mb-3">
                            Tymczasem zapraszamy do kawiarni:
                        </p>
                        <a
                            href="https://maps.app.goo.gl/TkVzjmw5Z8tXtYiq8"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-cta text-white px-8 py-3.5 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:bg-cta-hover shadow-md"
                        >
                            <FaCoffee />
                            Kawiarnia w Częstochowie
                        </a>
                        <p className="text-white/40 text-sm mt-3">{CAFE_ADDRESS}</p>
                    </div>

                    {/* Kontakt */}
                    <div>
                        <p className="text-white/50 text-sm mb-2">Masz pytania?</p>
                        <a
                            href="mailto:kontakt@strzykawa.com"
                            className="inline-flex items-center gap-2 text-accent hover:text-white transition-colors duration-300"
                        >
                            <FaEnvelope />
                            kontakt@strzykawa.com
                        </a>
                    </div>
                </div>

            </div>
        </div>
    );
}
