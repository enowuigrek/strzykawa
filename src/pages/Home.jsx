import React from 'react';
import HeroSection from '../components/features/hero/HeroSection.jsx';
import { FaCoffee, FaLeaf, FaHeart } from 'react-icons/fa';
import {Logo} from "../components/atoms/Logo.jsx";

export function Home() {
    return (
        <div className="home-page">
            <HeroSection />

            {/* Sekcja "O Strzykawie" - zasłania hero na mobile */}
            <section className="next-section relative min-h-screen bg-primary py-16 px-4">
                <div className="container mx-auto max-w-4xl">

                    {/* Header sekcji */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-3 mb-6">
                                <Logo />
                        </div>
                    </div>

                    {/* Treść */}
                    <div className="space-y-8">

                        {/* Główny opis */}
                        <div className="text-center pb-6">
                            <p className="text-white/70 text-lg sm:text-xl leading-relaxed text-center font-light">
                                Zaopatrujemy się w najwyższej jakości surowiec pochodzący z małych, rodzinnych farm,
                                gdzie kawa traktowana jest z najwyższą starannością. Współpracujemy z topowymi importerami
                                z Polski i zagranicy. Lubimy nietuzinkowe smaki, dlatego w naszej ofercie znajdziecie
                                ciekawe obróbki ziarna charakteryzujące się unikalnym profilem smakowym.
                            </p>
                        </div>

                        {/* Feature cards */}
                        <div className="grid md:grid-cols-3 gap-6 mt-12">

                            {/* Palarnia */}
                            <div className="p-6 text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16">
                                    <FaLeaf className="w-8 h-8 text-accent" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">Własna palarnia</h3>
                                <p className="text-muted leading-relaxed">
                                    Palimy ziarna w małych partiach, dbając o każdy szczegół procesu dla idealnego smaku.
                                </p>
                            </div>

                            {/* Kawiarnia */}
                            <div className="p-6 text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16 mb-4">
                                    <FaCoffee className="w-8 h-8 text-muted" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">Kawiarnia</h3>
                                <p className="text-muted leading-relaxed">
                                    Miejsce spotkań i rozmów. Tu kawa to nie tylko napój, ale doświadczenie i społeczność.
                                </p>
                            </div>

                            {/* Społeczność */}
                            <div className="p-6 text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16">
                                    <FaHeart className="w-8 h-8 text-red-400" />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">Pasja</h3>
                                <p className="text-muted leading-relaxed">
                                    Dzielimy się miłością do najlepszych ziaren z całego świata i tradycji parzenia kawy.
                                </p>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="text-center mt-12">
                            <a
                                href="/o-nas"
                                className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/30 rounded-full px-8 py-4 text-white font-semibold text-lg transition-all duration-300 hover:scale-105 hover:bg-white/20"
                            >
                                Poznaj naszą historię
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}