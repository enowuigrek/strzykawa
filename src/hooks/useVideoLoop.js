import { useRef, useEffect } from 'react';
import { logger } from '../utils/logger';

export function useVideoLoop(startTime = 2) {
    const videoRef = useRef(null);

    useEffect(() => {
        const videoElement = videoRef.current;

        if (videoElement) {
            const handleEnded = () => {
                videoElement.currentTime = startTime;
                videoElement.play().catch(err => {
                    logger.log('Video autoplay prevented:', err);
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