import React, { useState } from 'react';
import { HeroBackground } from './HeroBackground.jsx';
import { ActionButtons } from './ActionButtons.jsx';
import { Tagline } from './Tagline.jsx';
import { ScrollDownIndicator } from './ScrollDownIndicator.jsx';
import heroVideoDesktop from '../../../assets/hero-desktop.mp4';
import heroVideoMobile from '../../../assets/hero-mobile.mp4';

function HeroSection() {
    const [showContent, setShowContent] = useState(false);

    return (
        <section className="hero-section relative h-screen flex items-center justify-center overflow-hidden">
            <HeroBackground
                videoDesktop={heroVideoDesktop}
                videoMobile={heroVideoMobile}
                onReadyToShow={() => setShowContent(true)}
            />

            {/* Main Content - scrolluje z hero */}
            <div
                className={`relative z-10 text-center max-w-5xl mx-auto px-6 sm:px-8 transition-all duration-1000 ease-out ${
                    showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
            >
                <Tagline />
                <ActionButtons />
            </div>

            {/* Scroll Down Indicator */}
            {showContent && <ScrollDownIndicator />}
        </section>
    );
}

export default HeroSection;