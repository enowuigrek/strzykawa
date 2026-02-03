import React, { useState, useRef } from 'react';

/**
 * MobileCarousel - Instagram-style carousel
 * - Swipe/drag left/right to navigate
 * - Dots indicator at bottom
 * - No looping - bounces at edges
 * - Works with both touch and mouse
 * - Gesture disambiguation: wybiera poziomy ALBO pionowy scroll (nie oba naraz)
 *   • Gdy przesuwasz bardziej w poziomie → karuzela (blokuje scroll strony)
 *   • Gdy przesuwasz bardziej w pionie → scroll strony (karuzela nie reaguje)
 */
export function MobileCarousel({ images, className = "", showCounter = true, aspectRatio = "4/3" }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [startY, setStartY] = useState(0); // Track Y coordinate
    const [dragDelta, setDragDelta] = useState(0);
    const [committedDirection, setCommittedDirection] = useState(null); // 'horizontal' | 'vertical' | null
    const containerRef = useRef(null);

    const EDGE_RESISTANCE = 0.3;
    const SWIPE_THRESHOLD = 50;
    const DIRECTION_THRESHOLD = 10; // Po 10px decydujemy o kierunku

    const getClientX = (e) => {
        return e.touches ? e.touches[0].clientX : e.clientX;
    };

    const getClientY = (e) => {
        return e.touches ? e.touches[0].clientY : e.clientY;
    };

    const getEndClientX = (e) => {
        return e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
    };

    const handleDragStart = (e) => {
        setIsDragging(true);
        setCommittedDirection(null); // Reset direction
        setStartX(getClientX(e));
        setStartY(getClientY(e)); // Save starting Y position
    };

    const handleDragMove = (e) => {
        if (!isDragging) return;

        const currentX = getClientX(e);
        const currentY = getClientY(e);
        let delta = currentX - startX;

        // Calculate horizontal and vertical movement
        const deltaX = Math.abs(currentX - startX);
        const deltaY = Math.abs(currentY - startY);

        // ✨ INSTAGRAM-STYLE GESTURE DISAMBIGUATION
        // Określ aktualny kierunek (może być już commitowany, albo dopiero decydujemy)
        let currentDirection = committedDirection;

        // Jeśli jeszcze nie zdecydowaliśmy o kierunku, sprawdź który jest dominujący
        if (currentDirection === null && (deltaX > DIRECTION_THRESHOLD || deltaY > DIRECTION_THRESHOLD)) {
            if (deltaX > deltaY) {
                // Poziomy ruch dominuje - commituj do karuzeli
                currentDirection = 'horizontal';
                setCommittedDirection('horizontal');
            } else {
                // Pionowy ruch dominuje - commituj do scrollu strony
                currentDirection = 'vertical';
                setCommittedDirection('vertical');
            }
        }

        // Jeśli commitujemy do pionowego scrollu, nie rób NIC - pozwól scrollować
        if (currentDirection === 'vertical') {
            return;
        }

        // Jeśli commitujemy do poziomego ruchu (karuzela), blokuj scroll strony
        if (currentDirection === 'horizontal') {
            e.preventDefault();

            // Apply resistance at edges
            const isAtStart = currentIndex === 0 && delta > 0;
            const isAtEnd = currentIndex === images.length - 1 && delta < 0;

            if (isAtStart || isAtEnd) {
                delta = delta * EDGE_RESISTANCE;
            }

            setDragDelta(delta);
        }
    };

    const handleDragEnd = (e) => {
        if (!isDragging) return;

        // Tylko gdy commitowaliśmy do poziomego ruchu, zmieniaj slajdy
        if (committedDirection === 'horizontal') {
            const endX = getEndClientX(e);
            const delta = endX - startX;

            if (Math.abs(delta) > SWIPE_THRESHOLD) {
                if (delta < 0 && currentIndex < images.length - 1) {
                    setCurrentIndex(currentIndex + 1);
                } else if (delta > 0 && currentIndex > 0) {
                    setCurrentIndex(currentIndex - 1);
                }
            }
        }

        // Reset wszystkich stanów
        setIsDragging(false);
        setCommittedDirection(null);
        setStartX(0);
        setStartY(0);
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
                className="relative w-full overflow-hidden bg-primary-light select-none"
                style={{ aspectRatio, touchAction: 'pan-y' }}
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
                    <div className="absolute top-3 right-3 px-2 py-1 text-white/80 text-sm font-medium drop-shadow-lg z-10">
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
