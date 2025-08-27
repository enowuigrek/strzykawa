import React from 'react';
import HeroSection from '../components/hero/HeroSection.jsx';
import ShopifyTest from '../components/ShopifyTest.jsx';
import About from "./About.jsx";

function Home() {
    return (
        <div className="home-page">
            <HeroSection />
            {/*<ShopifyTest />*/}
        </div>
    );
}

export default Home;