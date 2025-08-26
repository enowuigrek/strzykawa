import { useState, useEffect } from 'react';

export function useHeroAnimation(delay = 2000) {
    const [showContent, setShowContent] = useState(false);
    const [dimVideo, setDimVideo] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowContent(true);
            setDimVideo(true);
        }, delay);

        return () => clearTimeout(timer);
    }, [delay]);

    return {
        showContent,
        dimVideo
    };
}