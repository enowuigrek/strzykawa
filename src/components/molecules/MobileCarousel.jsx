import React, { useState, useRef } from 'react';

/**
 * MobileCarousel - Instagram-style carousel
 * - Swipe/drag left/right to navigate
 * - Dots indicator at bottom
 * - No looping - bounces at edges
 * - Works with both touch and mouse
 */
export function MobileCarousel({ images, className = "", showCounter = true, aspectRatio = "4/3" }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [dragDelta, setDragDelta] = useState(0);
    const containerRef = useRef(null);

    const EDGE_RESISTANCE = 0.3;
    const SWIPE_THRESHOLD = 50;

    const getClientX = (e) => {
        return e.touches ? e.touches[0].clientX : e.clientX;
    };

    const getEndClientX = (e) => {
        return e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    };

    const handleDragStart = (e) => {
        setIsDragging(true);
        setStartX(getClientX(e));
    };

    const handleDragMove = (e) => {
        if (!isDragging) return;

        const currentX = getClientX(e);
        let delta = currentX - startX;

        // Apply resistance at edges
        const isAtStart = currentIndex === 0 && delta > 0;
        const isAtEnd = currentIndex === images.length - 1 && delta < 0;

        if (isAtStart || isAtEnd) {
            delta = delta * EDGE_RESISTANCE;
        }

        setDragDelta(delta);

        // Prevent default to avoid scrolling
        if (Math.abs(delta) > 10) {
            e.preventDefault();
        }
    };

    const handleDragEnd = (e) => {
        if (!isDragging) return;

        const endX = getEndClientX(e);
        const delta = endX - startX;

        if (Math.abs(delta) > SWIPE_THRESHOLD) {
            if (delta < 0 && currentIndex < images.length - 1) {
                setCurrentIndex(currentIndex + 1);
            } else if (delta > 0 && currentIndex > 0) {
                setCurrentIndex(currentIndex - 1);
            }
        }

        setIsDragging(false);
        setStartX(0);
        setDragDelta(0);
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    if (!images || images.length === 0) {
        return null;
    }

    // Calculate offset percentage
    const containerWidth = containerRef.current?.offsetWidth || 300;
    const dragPercent = (dragDelta / containerWidth) * 100;
    const translateX = -(currentIndex * 100) + dragPercent;

    return (
        <div className={`relative w-full ${className}`}>
            {/* Carousel container */}
            <div
                ref={containerRef}
                className="relative w-full overflow-hidden bg-primary-light border border-white/10 select-none"
                style={{ aspectRatio }}
                onTouchStart={handleDragStart}
                onTouchMove={handleDragMove}
                onTouchEnd={handleDragEnd}
                onMouseDown={handleDragStart}
                onMouseMove={handleDragMove}
                onMouseUp={handleDragEnd}
                onMouseLeave={() => isDragging && handleDragEnd({ clientX: startX })}
            >
                {/* Slides container */}
                <div
                    className={`flex h-full ${isDragging ? '' : 'transition-transform duration-300 ease-out'}`}
                    style={{ transform: `translateX(${translateX}%)` }}
                >
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className="w-full h-full flex-shrink-0"
                        >
                            <img
                                src={typeof image === 'string' ? image : image.src}
                                alt={typeof image === 'string' ? `Zdjęcie ${index + 1}` : image.alt}
                                className="w-full h-full object-cover pointer-events-none"
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
