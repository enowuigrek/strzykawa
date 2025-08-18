import React from 'react';
import HeroSection from '../components/HeroSection.jsx';
import ContactSection from '../components/ContactSection.jsx';

/**
 * Home page component that combines the hero section with contact information
 * This creates a complete landing page experience
 */
function Home() {
    return (
        <div className="home-page">
            <HeroSection />
            <ContactSection />
        </div>
    );
}

export default Home;