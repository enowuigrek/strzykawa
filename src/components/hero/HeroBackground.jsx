import React, { useState } from 'react';
import { useVideoLoop } from '../../hooks/useVideoLoop.js';
import { useHeroAnimation } from '../../hooks/useHeroAnimation.js';

export function HeroBackground({ video }) {
    const [videoReady, setVideoReady] = useState(false);
    const videoRef = useVideoLoop(2);
    const { dimVideo } = useHeroAnimation(videoReady, 2000);

    return (
        <>
            <video
                ref={videoRef}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ease-out 
                    ${dimVideo ? 'opacity-60' : 'opacity-100'} 
                    scale-[0.9] sm:scale-100
                `}
                autoPlay
                muted
                loop={false}
                playsInline
                preload="metadata"
                onCanPlay={() => setVideoReady(true)}
            >
                <source src={video} type="video/mp4" />
                Twoja przeglądarka nie obsługuje elementu video.
            </video>

            <div
                className={`absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40 
                    transition-opacity duration-1000 ease-out 
                    ${dimVideo ? 'opacity-100' : 'opacity-0'}
                `}
            ></div>
        </>
    );
}