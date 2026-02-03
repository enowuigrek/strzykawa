import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * useScrollZoom - powiększa element im bliżej środka ekranu (mobile only)
 * @param {number} maxScale - maksymalna skala (domyślnie 1.15)
 * @param {number} minScale - minimalna skala (domyślnie 1.0)
 * @returns {{ ref, scale }} - ref do elementu + aktualna skala
 */
export function useScrollZoom({ maxScale = 1.15, minScale = 1.0 } = {}) {
    const ref = useRef(null);
    const [scale, setScale] = useState(minScale);
    const rafId = useRef(null);

    const updateScale = useCallback(() => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const elementCenter = rect.top + rect.height / 2;
        const screenCenter = windowHeight / 2;

        // Odległość od środka ekranu (0 = idealnie na środku, 1 = na krawędzi)
        const distance = Math.abs(elementCenter - screenCenter) / (windowHeight / 2);

        // Clamp 0-1 i odwróć (1 = na środku, 0 = na krawędzi)
        const proximity = Math.max(0, Math.min(1, 1 - distance));

        // Ease-out dla płynniejszego efektu
        const eased = 1 - Math.pow(1 - proximity, 2);

        const newScale = minScale + (maxScale - minScale) * eased;
        setScale(newScale);
    }, [maxScale, minScale]);

    useEffect(() => {
        // Sprawdź czy mobile (< 768px)
        const isMobile = window.matchMedia('(max-width: 767px)').matches;
        if (!isMobile) return;

        const handleScroll = () => {
            if (rafId.current) cancelAnimationFrame(rafId.current);
            rafId.current = requestAnimationFrame(updateScale);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        // Trigger initial calculation
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (rafId.current) cancelAnimationFrame(rafId.current);
        };
    }, [updateScale]);

    return { ref, scale };
}
