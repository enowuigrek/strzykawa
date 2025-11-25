import { useRef, useEffect } from 'react';

export function useVideoLoop(startTime = 2) {
    const videoRef = useRef(null);

    useEffect(() => {
        const videoElement = videoRef.current;

        if (videoElement) {
            const handleEnded = () => {
                videoElement.currentTime = startTime;
                videoElement.play().catch(err => {
                    if (import.meta.env.DEV) {
                        console.log('Video autoplay prevented:', err);
                    }
                });
            };

            videoElement.addEventListener('ended', handleEnded);

            return () => {
                videoElement.removeEventListener('ended', handleEnded);
            };
        }
    }, [startTime]);

    return videoRef;
}