import { useState, useEffect } from 'react';

export function useHeroAnimation(trigger = false, delay = 2000) {
    const [showContent, setShowContent] = useState(false);
    const [dimVideo, setDimVideo] = useState(false);

    useEffect(() => {
        if (!trigger) return;

        const timer = setTimeout(() => {
            setShowContent(true);
            setDimVideo(true);
        }, delay);

        return () => clearTimeout(timer);
    }, [trigger, delay]);

    return {
        showContent,
        dimVideo
    };
}