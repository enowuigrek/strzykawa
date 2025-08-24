import React from 'react';
import HeroSection from '../components/hero/HeroSection.jsx';
import About from "./About.jsx";

function Home() {
    return (
        <div className="home-page">
            <HeroSection />
            <About />
        </div>
    );
}

export default Home;