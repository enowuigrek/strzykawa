import React, { useState, useRef } from 'react';

export function MobileCarousel({ images, className = "" }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [startX, setStartX] = useState(null);
    const carouselRef = useRef(null);

    const handleTouchStart = (e) => {
        setStartX(e.touches[0].clientX);
    };

    const handleTouchMove = (e) => {
        if (!startX) return;

        const currentX = e.touches[0].clientX;
        const diffX = startX - currentX;

        // Prevent scrolling when swiping horizontally
        if (Math.abs(diffX) > 10) {
            e.preventDefault();
        }
    };

    const handleTouchEnd = (e) => {
        if (!startX) return;

        const endX = e.changedTouches[0].clientX;
        const diffX = startX - endX;
        const threshold = 50;

        if (Math.abs(diffX) > threshold) {
            if (diffX > 0 && currentIndex < images.length - 1) {
                setCurrentIndex(currentIndex + 1);
            } else if (diffX < 0 && currentIndex > 0) {
                setCurrentIndex(currentIndex - 1);
            }
        }

        setStartX(null);
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    return (
        <div className={`relative ${className}`}>
            {/* Carousel container */}
            <div
                ref={carouselRef}
                className="overflow-hidden bg-gradient-to-br from-primary-light/30 to-primary/50 border border-white/10 shadow-lg"
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                style={{ touchAction: 'pan-y pinch-zoom' }}
            >
                <div
                    className="flex transition-transform duration-300 ease-out"
                    style={{
                        transform: `translateX(-${currentIndex * 100}%)`,
                        width: `${images.length * 100}%`
                    }}
                >
                    {images.map((image, index) => (
                        <div key={index} className="w-full flex-shrink-0">
                            <img
                                src={image.src}
                                alt={image.alt}
                                className="w-full h-full object-cover"
                                draggable={false}
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* Dots indicator */}
            {images.length > 1 && (
                <div className="flex justify-center space-x-2 mt-4">
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToSlide(index)}
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                index === currentIndex
                                    ? 'bg-accent scale-125'
                                    : 'bg-white/40 hover:bg-white/60'
                            }`}
                            aria-label={`Przejdź do zdjęcia ${index + 1}`}
                        />
                    ))}
                </div>
            )}

            {/* Counter */}
            {images.length > 1 && (
                <div className="absolute top-4 right-4 bg-black/50 text-white text-sm px-2 py-1 rounded">
                    {currentIndex + 1} / {images.length}
                </div>
            )}
        </div>
    );
}