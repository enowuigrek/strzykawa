import React from 'react';
import { FaFacebook, FaInstagram, FaCoffee, FaEnvelope } from 'react-icons/fa';
import { SOCIAL_LINKS } from '../constants/social';
import { CAFE_ADDRESS } from '../constants/contact';

export function ComingSoon() {
    return (
        <div className="min-h-screen bg-primary flex items-center justify-center px-4 py-8 relative overflow-hidden">

            {/* ── Treść strony ────────────────────────────────────────────── */}
            <div className="max-w-5xl w-full mx-auto relative z-10">

                {/* Desktop: 2 kolumny | Mobile: 1 kolumna */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:gap-16">

                    {/* ── LEWA KOLUMNA: Logo + komunikat ─────────────────── */}
                    <div className="flex-1 text-center lg:text-right">
                        {/* Logo */}
                        <div className="mb-8 flex justify-center lg:justify-end">
                            <img
                                src="/logo/vertical-logo.png"
                                alt="Strzykawa Coffee Shop & Roastery"
                                className="h-48 md:h-56 lg:h-64 w-auto"
                                style={{
                                    filter: 'brightness(0) saturate(100%) invert(100%)'
                                }}
                            />
                        </div>

                        {/* Komunikat */}
                        <div className="mb-8 lg:mb-0">
                            <p className="text-2xl text-accent mb-2">
                                Sklep chwilowo niedostępny
                                <span
                                    className="inline-block ml-2"
                                    style={{ animation: 'gentleRock 3s ease-in-out infinite' }}
                                >
                                    🔧
                                </span>
                            </p>
                            <p className="text-base text-white">
                                Robimy przerwę techniczną. Wrócimy niebawem!
                            </p>
                        </div>
                    </div>

                    {/* ── Separator (desktop) ────────────────────────────── */}
                    <div className="hidden lg:block w-px bg-white/10 self-stretch min-h-[300px]" />

                    {/* ── Separator (mobile) ─────────────────────────────── */}
                    <div className="lg:hidden border-b border-white/10 mb-8" />

                    {/* ── PRAWA KOLUMNA: Kawiarnia + kontakt + social ─────── */}
                    <div className="flex-1 text-center lg:text-left space-y-8">

                        {/* Kawiarnia CTA */}
                        <div>
                            <p className="text-base text-white mb-3">
                                Tymczasem zapraszamy do kawiarni!
                            </p>
                            <a
                                href="https://maps.app.goo.gl/TkVzjmw5Z8tXtYiq8"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center justify-center gap-2 bg-cta text-white text-base px-8 py-3.5 rounded-full font-medium transition-all duration-300 hover:scale-105 hover:bg-cta-hover shadow-md"
                            >
                                <FaCoffee />
                                <span>Kawiarnia w Częstochowie</span>
                            </a>
                            <p className="text-base text-white mt-2">
                                {CAFE_ADDRESS}
                            </p>
                        </div>

                        {/* Kontakt */}
                        <div>
                            <p className="text-base text-white mb-2">
                                Masz pytania? Napisz do nas:
                            </p>
                            <a
                                href="mailto:kontakt@strzykawa.com"
                                className="inline-flex items-center gap-2 text-accent hover:text-white transition-colors duration-300 text-base"
                            >
                                <FaEnvelope />
                                kontakt@strzykawa.com
                            </a>
                        </div>

                        {/* Social Media */}
                        <div>
                            <p className="text-base text-white mb-3">
                                Śledź nas:
                            </p>
                            <div className="flex items-center justify-center lg:justify-start gap-3">
                                <a
                                    href={SOCIAL_LINKS.facebook.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 transition-all duration-300 hover:scale-105 hover:bg-blue-600/20 hover:border-blue-500/50"
                                    aria-label="Facebook"
                                >
                                    <FaFacebook className="text-white" />
                                    <span className="text-white text-base">Facebook</span>
                                </a>
                                <a
                                    href={SOCIAL_LINKS.instagram.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 transition-all duration-300 hover:scale-105 hover:bg-pink-600/20 hover:border-pink-500/50"
                                    aria-label="Instagram"
                                >
                                    <FaInstagram className="text-white" />
                                    <span className="text-white text-base">Instagram</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-10 text-center text-white/50 text-base">
                    <p>© {new Date().getFullYear()} Strzykawa Coffee Shop & Roastery</p>
                </div>
            </div>
        </div>
    );
}
