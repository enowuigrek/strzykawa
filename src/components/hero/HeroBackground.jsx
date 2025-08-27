import React, { useState, useEffect } from 'react';
import { useVideoLoop } from '../../hooks/useVideoLoop.js';
import { useHeroAnimation } from '../../hooks/useHeroAnimation.js';

export function HeroBackground({ videoDesktop, videoMobile, onReadyToShow }) {
    const [videoReady, setVideoReady] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    const videoRef = useVideoLoop(2); // zapętlenie od 2 sekundy
    const { dimVideo } = useHeroAnimation(videoReady, 2000); // animacja dopiero po załadowaniu

    // Sprawdzanie, czy urządzenie jest mobilne (na szerokość)
    useEffect(() => {
        const check = () => setIsMobile(window.innerWidth < 768);
        check();
        window.addEventListener('resize', check);
        return () => window.removeEventListener('resize', check);
    }, []);

    // Powiadomienie HeroSection, że można pokazać treść
    useEffect(() => {
        if (videoReady) {
            const timer = setTimeout(() => {
                onReadyToShow?.(); // uruchom callback po 2s
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [videoReady, onReadyToShow]);

    const selectedVideo = isMobile && videoMobile ? videoMobile : videoDesktop;

    return (
        <>
            <video
                ref={videoRef}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-out 
          ${dimVideo ? 'opacity-60' : 'opacity-100'} 
          ${isMobile ? 'scale-[0.9]' : 'scale-100'}
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

            {/* Ciemna nakładka z przejściem */}
            <div
                className={`absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40 
          transition-opacity duration-1000 ease-out 
          ${dimVideo ? 'opacity-100' : 'opacity-0'}
        `}
            ></div>
        </>
    );
}