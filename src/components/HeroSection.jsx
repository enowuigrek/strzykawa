import React from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/hero.jpg';

/**
 * HeroSection renders the full‑screen hero with a background image
 * and a brief tagline.  The call‑to‑action button links the user to
 * the list of available coffees.  The image is imported so that
 * Vite can handle optimisation and hashing automatically.
 */
function HeroSection() {
  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="hero-content">
        <h1>Strzykawa – coffee shop</h1>
        <p>ONLY SPECIALITY COFFEE</p>
        <Link to="/dostepne-w-kawiarni" className="cta">
          Co dziś w Strzykawie
        </Link>
      </div>
    </section>
  );
}

export default HeroSection;