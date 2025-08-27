import React, { useState } from 'react';
import { HeroBackground } from './HeroBackground.jsx';
import { LogoPlaceholder } from './LogoPlaceholder.jsx';
import { MainHeading } from './MainHeading.jsx';
import { ActionButtons } from './ActionButtons.jsx';
import { Tagline } from './Tagline.jsx';
import heroVideoDesktop from '../../assets/hero-desktop.mp4';
import heroVideoMobile from '../../assets/hero-mobile.mp4';

function HeroSection() {
    const [showContent, setShowContent] = useState(false);

    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            <HeroBackground
                videoDesktop={heroVideoDesktop}
                videoMobile={heroVideoMobile}
                onReadyToShow={() => setShowContent(true)}
            />

            {/* Main Content z animacją */}
            <div
                className={`relative z-10 text-center max-w-5xl mx-auto px-6 sm:px-8 transition-all duration-1000 ease-out ${
                    showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
            >
                {/*<LogoPlaceholder />*/}
                <MainHeading />
                <ActionButtons />
                <Tagline />
            </div>
        </section>
    );
}

export default HeroSection;