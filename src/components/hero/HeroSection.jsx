import React from 'react';
import { HeroBackground } from './HeroBackground.jsx';
import { LogoPlaceholder } from './LogoPlaceholder.jsx';
import { MainHeading } from './MainHeading.jsx';
import { ActionButtons } from './ActionButtons.jsx';
import { Tagline } from './Tagline.jsx';
import { useHeroAnimation } from '../../hooks/useHeroAnimation.js';
import heroVideo from '../../assets/hero-video.mp4';

function HeroSection() {
    const { showContent } = useHeroAnimation(2000);

    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            <HeroBackground video={heroVideo} />

            {/* Main Content z animacją */}
            <div className={`relative z-10 text-center max-w-5xl mx-auto px-6 sm:px-8 transition-all duration-1000 ease-out ${
                showContent
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8'
            }`}>
                {/*<LogoPlaceholder />*/}
                <MainHeading />
                <ActionButtons />
                <Tagline />
            </div>
        </section>
    );
}

export default HeroSection;