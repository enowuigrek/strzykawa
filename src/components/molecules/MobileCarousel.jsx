import React, { useState, useRef } from 'react';

/**
 * MobileCarousel - Instagram-style carousel
 * - Swipe left/right to navigate
 * - Dots indicator at bottom
 * - No looping - bounces at edges
 * - Counter badge in corner
 */
export function MobileCarousel({ images, className = "", showCounter = true, aspectRatio = "4/3" }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [touchStart, setTouchStart] = useState(null);
    const [touchDelta, setTouchDelta] = useState(0);
    const [isSwiping, setIsSwiping] = useState(false);
    const containerRef = useRef(null);

    // Edge resistance factor (smaller = more resistance)
    const EDGE_RESISTANCE = 0.3;
    const SWIPE_THRESHOLD = 50;

    const handleTouchStart = (e) => {
        setTouchStart(e.touches[0].clientX);
        setIsSwiping(true);
    };

    const handleTouchMove = (e) => {
        if (!touchStart || !isSwiping) return;

        const currentX = e.touches[0].clientX;
        let delta = currentX - touchStart;

        // Apply resistance at edges
        const isAtStart = currentIndex === 0 && delta > 0;
        const isAtEnd = currentIndex === images.length - 1 && delta < 0;

        if (isAtStart || isAtEnd) {
            delta = delta * EDGE_RESISTANCE;
        }

        setTouchDelta(delta);

        // Prevent vertical scroll when swiping horizontally
        if (Math.abs(delta) > 10) {
            e.preventDefault();
        }
    };

    const handleTouchEnd = () => {
        if (!isSwiping) return;

        const delta = touchDelta;

        if (Math.abs(delta) > SWIPE_THRESHOLD) {
            if (delta < 0 && currentIndex < images.length - 1) {
                // Swipe left - next image
                setCurrentIndex(currentIndex + 1);
            } else if (delta > 0 && currentIndex > 0) {
                // Swipe right - previous image
                setCurrentIndex(currentIndex - 1);
            }
        }

        // Reset
        setTouchStart(null);
        setTouchDelta(0);
        setIsSwiping(false);
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    // Calculate transform with swipe delta
    const getTransform = () => {
        const baseTranslate = -currentIndex * 100;
        const containerWidth = containerRef.current?.offsetWidth || 300;
        const deltaPercent = (touchDelta / containerWidth) * 100;
        return `translateX(calc(${baseTranslate}% + ${deltaPercent}%))`;
    };

    if (!images || images.length === 0) {
        return null;
    }

    return (
        <div className={`relative w-full ${className}`}>
            {/* Carousel container with aspect ratio */}
            <div
                ref={containerRef}
                className="relative w-full overflow-hidden bg-primary-light border border-white/10"
                style={{ aspectRatio }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
            >
                <div
                    className={`absolute inset-0 flex ${isSwiping ? '' : 'transition-transform duration-300 ease-out'}`}
                    style={{
                        transform: getTransform(),
                        width: `${images.length * 100}%`,
                        height: '100%'
                    }}
                >
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className="h-full flex-shrink-0 overflow-hidden"
                            style={{ width: `${100 / images.length}%` }}
                        >
                            <img
                                src={typeof image === 'string' ? image : image.src}
                                alt={typeof image === 'string' ? `Zdjęcie ${index + 1}` : image.alt}
                                className="w-full h-full object-cover"
                                draggable={false}
                            />
                        </div>
                    ))}
                </div>

                {/* Counter badge */}
                {showCounter && images.length > 1 && (
                    <div className="absolute top-3 right-3 px-2 py-1 bg-primary/80 backdrop-blur-sm border border-white/10 text-white text-sm font-medium z-10">
                        {currentIndex + 1}/{images.length}
                    </div>
                )}
            </div>

            {/* Dots indicator */}
            {images.length > 1 && (
                <div className="flex justify-center gap-2 mt-4">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                index === currentIndex
                                    ? 'bg-accent w-4'
                                    : 'bg-white/40 hover:bg-white/60'
                            }`}
                            aria-label={`Przejdź do zdjęcia ${index + 1}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
