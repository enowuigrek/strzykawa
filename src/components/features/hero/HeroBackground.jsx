import React, { useState, useEffect } from 'react';
import { useVideoLoop } from '../../../hooks/useVideoLoop.js';
import { useHeroAnimation } from '../../../hooks/useHeroAnimation.js';

export function HeroBackground({ videoDesktop, videoMobile, onReadyToShow }) {
    const [videoReady, setVideoReady] = useState(false);
    const [parallaxY, setParallaxY] = useState(0);

    const videoRef = useVideoLoop(2); // zapętlenie od 2 sekundy
    const { dimVideo } = useHeroAnimation(videoReady, 2000); // przyciemnienie po 2s

    // ⬇️ Detekcja mobilnego ekranu już na etapie renderowania
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const selectedVideo = isMobile && videoMobile ? videoMobile : videoDesktop;

    // ⬇️ Wywołanie callbacka po 2s od startu video
    useEffect(() => {
        if (videoReady) {
            const timer = setTimeout(() => {
                onReadyToShow?.();
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [videoReady, onReadyToShow]);

    // ⬇️ Parallax effect - wideo scrolluje 3x wolniej
    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            // Wideo przesuwa się do góry 3x wolniej niż scroll
            setParallaxY(scrollY / 3);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden">
            <video
                ref={videoRef}
                style={{ transform: `translateY(-${parallaxY}px)` }}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-out
                 ${dimVideo ? 'opacity-60' : 'opacity-100'}
                `}
                autoPlay
                muted
                loop={false}
                playsInline
                preload="metadata"
                onCanPlay={() => setVideoReady(true)}
            >
                <source src={selectedVideo} type="video/mp4" />
                Twoja przeglądarka nie obsługuje elementu video.
            </video>

            {/* Nakładka - też z parallaxem */}
            <div
                style={{ transform: `translateY(-${parallaxY}px)` }}
                className={`absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40
          transition-opacity duration-1000 ease-out
          ${dimVideo ? 'opacity-100' : 'opacity-0'}
        `}
            ></div>
        </div>
    );
}