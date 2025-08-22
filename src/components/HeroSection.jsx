import React from 'react';
import { Link } from 'react-router-dom';
import heroImage from '../assets/hero.jpg';

function HeroSection() {
    return (
        <section className="relative h-screen flex items-center justify-center overflow-hidden">

            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-50"
                style={{ backgroundImage: `url(${heroImage})` }}
            />

            {/* Main Content */}
            <div className="relative z-10 text-center max-w-4xl mx-auto px-6 sm:px-8">

                {/* Main Heading z gradient text */}
                <h1 className="text-4xl sm:text-6xl lg:text-7xl mb-6 leading-tight">
          <span>
            S T R Z Y K A W A
          </span>
                    <span className="block text-2xl sm:text-3xl lg:text-4xl font-medium mt-2 text-muted/90">
            Coffee Shop & Roastery
          </span>
                </h1>

                {/* Subtitle z typewriter effect styling */}
                {/*<div className="relative mb-8">*/}
                {/*    <p className="text-lg sm:text-xl lg:text-2xl font-light text-white/90 tracking-wider">*/}
                {/*        ONLY SPECIALITY COFFEE*/}
                {/*    </p>*/}
                {/*    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent mt-4" />*/}
                {/*</div>*/}

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
              Co dziś w kawiarni
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
            </div>

        </section>
    );
}

export default HeroSection;