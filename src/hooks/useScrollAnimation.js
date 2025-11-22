import { useEffect, useRef, useState } from 'react';

/**
 * Hook do animacji przy scrollowaniu
 * Elementy "wlewaja sie" jak kawa do filtra
 */
export function useScrollAnimation(options = {}) {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    const {
        threshold = 0.1,
        rootMargin = '0px 0px -50px 0px',
        triggerOnce = true
    } = options;

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (triggerOnce) {
                        observer.unobserve(element);
                    }
                } else if (!triggerOnce) {
                    setIsVisible(false);
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(element);

        return () => observer.disconnect();
    }, [threshold, rootMargin, triggerOnce]);

    return [ref, isVisible];
}

/**
 * Klasy animacji - motyw "wlewania kawy"
 */
export const scrollAnimations = {
    // Wlewa sie z gory (jak kawa z filtra)
    pourDown: {
        hidden: 'opacity-0 translate-y-[-20px]',
        visible: 'opacity-100 translate-y-0'
    },
    // Wlewa sie z dolu
    pourUp: {
        hidden: 'opacity-0 translate-y-[30px]',
        visible: 'opacity-100 translate-y-0'
    },
    // Rozlewa sie z srodka
    spread: {
        hidden: 'opacity-0 scale-95',
        visible: 'opacity-100 scale-100'
    },
    // Wplywa z lewej
    flowLeft: {
        hidden: 'opacity-0 translate-x-[-30px]',
        visible: 'opacity-100 translate-x-0'
    },
    // Wplywa z prawej
    flowRight: {
        hidden: 'opacity-0 translate-x-[30px]',
        visible: 'opacity-100 translate-x-0'
    },
    // Fade prosty
    fade: {
        hidden: 'opacity-0',
        visible: 'opacity-100'
    }
};
