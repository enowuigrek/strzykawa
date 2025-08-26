import React from 'react';
import { useVideoLoop } from '../../hooks/useVideoLoop.js';
import { useHeroAnimation } from '../../hooks/useHeroAnimation.js';

export function HeroBackground({ video }) {
    const videoRef = useVideoLoop(2); // Start loop od 2 sekundy
    const { dimVideo } = useHeroAnimation(2000); // Przyciemni po 2 sekundach

    return (
        <>
            {/* Background Video z dynamiczną opacity */}
            <video
                ref={videoRef}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-out ${
                    dimVideo ? 'opacity-60' : 'opacity-100'
                }`}
                autoPlay
                muted
                loop={false}
                playsInline
                preload="metadata"
            >
                <source src={video} type="video/mp4" />
                Twoja przeglądarka nie obsługuje elementu video.
            </video>

            {/* Dark Overlay - również z animacją */}
            <div className={`absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40 transition-opacity duration-1000 ease-out ${
                dimVideo ? 'opacity-100' : 'opacity-0'
            }`}></div>
        </>
    );
}