import React from 'react';
import HeroSection from '../components/HeroSection.jsx';
import ContactSection from '../components/ContactSection.jsx';

/**
 * Home page composes the hero and contact sections.  Additional
 * sections, such as testimonials or a blog preview, can be added
 * here later by simply inserting more components.
 */
function Home() {
  return (
    <>
      <HeroSection />
      <ContactSection />
    </>
  );
}

export default Home;