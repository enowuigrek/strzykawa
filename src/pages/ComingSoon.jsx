import React from 'react';
import { FaFacebook, FaInstagram, FaCoffee } from 'react-icons/fa';

export function ComingSoon() {
    return (
        <div className="min-h-screen bg-primary flex items-center justify-center px-4 py-12">
            <div className="max-w-4xl mx-auto text-center">

                {/* Logo vertical */}
                <div className="mb-12 flex justify-center">
                    <img
                        src="/logo/vertical-logo.png"
                        alt="Strzykawa Coffee Shop & Roastery"
                        className="h-64 md:h-80 w-auto"
                        style={{
                            filter: 'brightness(0) saturate(100%) invert(100%)'
                        }}
                    />
                </div>

                {/* Główny komunikat */}
                <div className="mb-16">
                    <p className="text-xl md:text-2xl text-accent mb-4">
                        Trwają prace nad stroną...
                    </p>
                    <p className="text-lg text-muted max-w-2xl mx-auto">
                        Już wkrótce uruchomimy nasz sklep online!
                        <br/>
                        Będziesz mógł zamówić swoją ulubioną kawę z dostawą do domu.
                    </p>
                </div>

                {/* CTA - Odwiedź kawiarnię */}
                <div className="mb-16 pb-8 border-b border-white/10">
                    <p className="text-white/90 mb-4">
                        Tymczasem zapraszamy do kawiarni!
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="https://maps.app.goo.gl/TkVzjmw5Z8tXtYiq8"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-3 bg-cta text-white px-8 py-4 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:bg-cta-hover shadow-md"
                        >
                            <FaCoffee />
                            <span>Kawiarnia w Częstochowie</span>
                        </a>
                    </div>
                    <p className="text-base text-muted mt-4">
                        ul. Dąbrowskiego 4, 42-200 Częstochowa
                    </p>
                </div>

                {/* Social Media */}
                <div>
                    <p className="text-white/90 mb-6">
                        Śledź nas w mediach społecznościowych:
                    </p>
                    <div className="flex items-center justify-center gap-4">
                        <a
                            href="https://www.facebook.com/StrzykawaCoffeeShop"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 transition-all duration-300 hover:scale-105 hover:bg-blue-600/20 hover:border-blue-500/50"
                            aria-label="Facebook"
                        >
                            <FaFacebook className="text-white text-xl" />
                            <span className="text-white font-medium">Facebook</span>
                        </a>
                        <a
                            href="https://www.instagram.com/strzykawa_coffee_shop"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 transition-all duration-300 hover:scale-105 hover:bg-pink-600/20 hover:border-pink-500/50"
                            aria-label="Instagram"
                        >
                            <FaInstagram className="text-white text-xl" />
                            <span className="text-white font-medium">Instagram</span>
                        </a>
                    </div>
                </div>

                {/* Footer info */}
                <div className="mt-16 text-center text-white/50 text-base">
                    <p>© 2025 Strzykawa Coffee Shop & Roastery</p>
                </div>
            </div>
        </div>
    );
}