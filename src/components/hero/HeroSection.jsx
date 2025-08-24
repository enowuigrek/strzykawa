import React from 'react';
import { HeroBackground } from './HeroBackground.jsx';
import { LogoPlaceholder } from './LogoPlaceholder.jsx';
import { MainHeading } from './MainHeading.jsx';
import { ActionButtons } from './ActionButtons.jsx';
import { Tagline } from './Tagline.jsx';
import heroImage from '../../assets/hero.jpg';

function HeroSection() {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">
            <HeroBackground image={heroImage} />

            {/* Main Content */}
            <div className="relative z-10 text-center max-w-5xl mx-auto px-6 sm:px-8">
                <LogoPlaceholder />
                <MainHeading />
                <ActionButtons />
                <Tagline />
            </div>
        </section>
    );
}

export default HeroSection;