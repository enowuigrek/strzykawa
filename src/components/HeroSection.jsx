import React from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/hero.jpg';

/**
 * HeroSection z dramatycznymi ulepszeniami UX/UI:
 * - Animowany gradient overlay
 * - Floating particles effect
 * - Smooth animations na scroll
 * - Lepsze typography z gradientami
 * - Hover effects na CTA
 */
function HeroSection() {
  return (
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-red-500">

        {/* Background Image z parallax effect */}
        <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-110 transition-transform duration-1000 ease-out"
            style={{ backgroundImage: `url(${heroImage})` }}
        />

        {/* Animated Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark/90 via-primary/70 to-primary-light/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Floating Particles Effect */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-muted/30 rounded-full animate-pulse delay-1000" />
          <div className="absolute top-1/3 right-1/3 w-1 h-1 bg-accent/40 rounded-full animate-pulse delay-2000" />
          <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-muted/20 rounded-full animate-pulse delay-3000" />
          <div className="absolute top-2/3 right-1/4 w-1.5 h-1.5 bg-accent/30 rounded-full animate-pulse delay-4000" />
        </div>

        {/* Main Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6 sm:px-8">

          {/* Main Heading z gradient text */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
          <span className="block bg-gradient-to-r from-white via-muted to-white bg-clip-text text-transparent animate-fade-in">
            STRZYKAWA
          </span>
            <span className="block text-2xl sm:text-3xl lg:text-4xl font-medium mt-2 text-muted/90">
            coffee shop
          </span>
          </h1>

          {/* Subtitle z typewriter effect styling */}
          <div className="relative mb-8">
            <p className="text-lg sm:text-xl lg:text-2xl font-light text-white/90 tracking-wider">
              ONLY SPECIALITY COFFEE
            </p>
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent mt-4" />
          </div>

          {/* Call to Action Button */}
          <div className="mt-12">
            <Link
                to="/dostepne-w-kawiarni"
                className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white transition-all duration-500 ease-out overflow-hidden rounded-xl"
            >
              {/* Button Background Layers */}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-light to-accent rounded-xl transition-all duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-r from-accent to-primary-light rounded-xl opacity-0 transition-all duration-300 group-hover:opacity-100" />

              {/* Shine effect */}
              <div className="absolute inset-0 -top-2 -bottom-2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out" />

              {/* Button Text */}
              <span className="relative z-10 group-hover:scale-105 transition-transform duration-300">
              Co dziś w Strzykawie
            </span>

              {/* Arrow Icon */}
              <svg
                  className="relative z-10 w-5 h-5 ml-3 transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>

          {/*/!* Scroll Indicator *!/*/}
          {/*<div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-white/60">*/}
          {/*  <span className="text-sm font-light mb-2 tracking-wide">Scroll down</span>*/}
          {/*  <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">*/}
          {/*    <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-bounce" />*/}
          {/*  </div>*/}
          {/*</div>*/}
        </div>

        {/* Corner Decorations */}
        <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-muted/30" />
        <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-muted/30" />
        <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-muted/30" />
        <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-muted/30" />

      </section>
  );
}

export default HeroSection;