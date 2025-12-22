import React from 'react';
import { HeroBackground } from '../components/features/hero/HeroBackground.jsx';
import {PageLayout} from "../components/layout/PageLayout.jsx";
import { Tagline } from '../components/features/hero/Tagline.jsx';
import { ActionButtons } from '../components/features/hero/ActionButtons.jsx';
import { ScrollDownIndicator } from '../components/features/hero/ScrollDownIndicator.jsx';
import { Logo } from "../components/atoms/Logo.jsx";
import { SocialLinks } from '../components/molecules/SocialLinks.jsx';
import { useScrollAnimation, scrollAnimations } from '../hooks/useScrollAnimation';
import heroVideoDesktop from '../assets/hero-desktop.mp4';
import heroVideoMobile from '../assets/hero-mobile.mp4';

export function Home() {
    const [showContent, setShowContent] = React.useState(false);

    // Scroll animations
    const [logoRef, logoVisible] = useScrollAnimation({ threshold: 0.3 });
    const [descRef, descVisible] = useScrollAnimation({ threshold: 0.2 });
    const [ctaRef, ctaVisible] = useScrollAnimation({ threshold: 0.3 });

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
            <PageLayout className="relative z-20 bg-primary pt-20 sm:pt-24 pb-32">
                <div className="container px-6 sm:px-8">
                {/* Header sekcji - logo */}
                    <div
                        ref={logoRef}
                        className={`text-center mb-20 transition-all duration-700 ease-out ${
                            logoVisible ? scrollAnimations.pourDown.visible : scrollAnimations.pourDown.hidden
                        }`}
                    >
                        <div className="inline-flex items-center gap-3 mb-6 scale-125 md:scale-150">
                            <Logo />
                        </div>
                    </div>

                    {/* Treść */}
                    <div>

                        {/* Główny opis */}
                        <div
                            ref={descRef}
                            className={`text-center pb-8 transition-all duration-700 ease-out delay-100 ${
                                descVisible ? scrollAnimations.fade.visible : scrollAnimations.fade.hidden
                            }`}
                        >
                            <p className="text-white/70 text-lg sm:text-xl leading-relaxed text-center font-light">
                                Zaopatrujemy się w najwyższej jakości surowiec pochodzący z małych, rodzinnych farm,
                                gdzie kawa traktowana jest z najwyższą starannością. Współpracujemy z topowymi importerami
                                z Polski i zagranicy. Lubimy nietuzinkowe smaki, dlatego w naszej ofercie znajdziecie
                                ciekawe obróbki ziarna charakteryzujące się unikalnym profilem smakowym.
                            </p>
                        </div>

                        {/* CTA */}
                        <div
                            ref={ctaRef}
                            className={`text-center my-16 transition-all duration-700 ease-out ${
                                ctaVisible ? scrollAnimations.spread.visible : scrollAnimations.spread.hidden
                            }`}
                        >
                            <a
                                href="/o-nas"
                                className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/30 rounded-full px-8 py-4 text-white text-lg transition-all duration-300 hover:scale-105 hover:bg-white/20"
                            >
                                Poznaj naszą historię
                            </a>
                        </div>

                        {/* SOCIAL LINKS */}
                        <SocialLinks />
                    </div>
                </div>
            </PageLayout>
        </div>
    );
}