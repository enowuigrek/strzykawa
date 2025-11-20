import React from 'react';
import { HeroBackground } from '../components/features/hero/HeroBackground.jsx';
import {PageLayout} from "../components/layout/PageLayout.jsx";
import { Tagline } from '../components/features/hero/Tagline.jsx';
import { ActionButtons } from '../components/features/hero/ActionButtons.jsx';
import { ScrollDownIndicator } from '../components/features/hero/ScrollDownIndicator.jsx';
import {FaCoffee, FaLeaf, FaHeart, FaFire} from 'react-icons/fa';
import { Logo } from "../components/atoms/Logo.jsx";
import { HeroReviews } from '../components/features/hero/HeroReviews.jsx';
import { SocialLinks } from '../components/molecules/SocialLinks.jsx';
import heroVideoDesktop from '../assets/hero-desktop.mp4';
import heroVideoMobile from '../assets/hero-mobile.mp4';

export function Home() {
    const [showContent, setShowContent] = React.useState(false);

    return (
        <div className="home-page relative">
            {/* STICKY BACKGROUND (tylko video) */}
            <div className="sticky top-0 h-screen z-0">
                <HeroBackground
                    videoDesktop={heroVideoDesktop}
                    videoMobile={heroVideoMobile}
                    onReadyToShow={() => setShowContent(true)}
                />
            </div>

            {/* SCROLLUJĄCY CONTENT nad filmem */}
            <div className="absolute top-0 left-0 w-full h-screen z-10 flex flex-col items-center justify-center">
                <div
                    className={`text-center max-w-5xl mx-auto px-6 sm:px-8 transition-all duration-1000 ease-out ${
                        showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                >
                    <Tagline />
                    <ActionButtons />
                </div>

                {/* Scroll Down Indicator */}
                {showContent && <ScrollDownIndicator />}
            </div>

            {/* Sekcja "O Strzykawie" - najeżdża na hero */}
            <PageLayout className="relative z-20 bg-primary pt-8 pb-20">
                <div className="container">
                {/* Header sekcji */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-3 mb-6 scale-125 md:scale-150">
                            <Logo />
                        </div>
                    </div>

                    {/* Treść */}
                    <div>

                        {/* Główny opis */}
                        <div className="text-center pb-8">
                            <p className="text-white/70 text-lg sm:text-xl leading-relaxed text-center font-light">
                                Zaopatrujemy się w najwyższej jakości surowiec pochodzący z małych, rodzinnych farm,
                                gdzie kawa traktowana jest z najwyższą starannością. Współpracujemy z topowymi importerami
                                z Polski i zagranicy. Lubimy nietuzinkowe smaki, dlatego w naszej ofercie znajdziecie
                                ciekawe obróbki ziarna charakteryzujące się unikalnym profilem smakowym.
                            </p>
                        </div>

                        {/* Feature cards */}
                        <div className="grid md:grid-cols-3 gap-6 mt-16 border-t border-white/10">

                            {/* Palarnia */}
                            <div className="p-6 text-center">
                                <div className="inline-flex items-center justify-center w-16 h-16">
                                    <FaFire className="w-8 h-8 text-muted" />
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
                            <div className="p-6 text-center ">
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
                        <div className="text-center my-16 ">
                            <a
                                href="/o-nas"
                                className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/30 rounded-full px-8 py-4 text-white font-semibold text-lg transition-all duration-300 hover:scale-105 hover:bg-white/20"
                            >
                                Poznaj naszą historię
                            </a>
                        </div>

                        {/* REVIEWS */}
                        <HeroReviews />

                        {/* SOCIAL LINKS */}
                        <SocialLinks />
                    </div>
                </div>
            </PageLayout>
        </div>
    );
}