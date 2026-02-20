import React, { useState, useEffect } from 'react';
import { HiChevronDown } from 'react-icons/hi';

export function ScrollDownIndicator() {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            // Znika gdy scroll > 50px
            if (window.scrollY > 50) {
                setIsVisible(false);
            } else {
                setIsVisible(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToContent = () => {
        window.scrollTo({
            top: window.innerHeight,
            behavior: 'smooth'
        });
    };

    return (
        <button
            onClick={scrollToContent}
            className={`absolute bottom-16 sm:bottom-8 left-1/2 -translate-x-1/2 z-20
                       flex flex-col items-center gap-2
                       text-white/70 hover:text-white
                       transition-all duration-500
                       cursor-pointer group
                       ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
            aria-label="Scroll down"
        >
            <HiChevronDown
                className="w-12 h-12 animate-bounce group-hover:text-white group-hover:scale-110 transition-all"
            />
        </button>
    );
}