import React from 'react';
import HeroSection from '../components/HeroSection.jsx';
import ContactSection from './ContactSection.jsx';
import About from "./About.jsx";

/**
 * Home page component that combines the hero section with contact information
 * This creates a complete landing page experience
 */
function Home() {
    return (
        <div className="home-page">
            <HeroSection />
            <About />
        </div>
    );
}

export default Home;