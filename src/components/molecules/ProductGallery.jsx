import React, { useState, useEffect, useRef } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { MobileCarousel } from './MobileCarousel';

/**
 * ProductGallery - Galeria zdjęć produktu
 * Desktop: Główne zdjęcie z strzałkami + opcjonalne thumbnails
 * Mobile: Instagram-style carousel
 * @param {boolean} autoplay - Czy automatycznie zmieniać zdjęcia (domyślnie false)
 * @param {number} autoplayInterval - Interwał zmiany zdjęć w ms (domyślnie 4000ms)
 */
export function ProductGallery({
    images = [],
    coffeeName,
    showThumbnails = true,
    autoplay = false,
    autoplayInterval = 4000
}) {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const timerRef = useRef(null);

    // Autoplay functionality
    useEffect(() => {
        // Clear timer on unmount or when autoplay/images change
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, []);

    useEffect(() => {
        // Only run autoplay if enabled and there are multiple images
        if (!autoplay || !images || images.length <= 1) {
            return;
        }

        // Clear any existing timer
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }

        // Start new timer
        timerRef.current = setInterval(() => {
            setSelectedImageIndex((prev) =>
                prev === images.length - 1 ? 0 : prev + 1
            );
        }, autoplayInterval);

        // Cleanup
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [autoplay, autoplayInterval, images, selectedImageIndex]);

    if (!images || images.length === 0) {
        return (
            <div className="aspect-square bg-primary-light border border-white/10 flex items-center justify-center">
                <p className="text-muted">Brak zdjęcia</p>
            </div>
        );
    }

    const currentImage = images[selectedImageIndex];
    const hasManyImages = images.length > 1;

    // Reset timer - wywoływane przy ręcznej zmianie zdjęcia
    const resetTimer = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
        }
        // Timer zostanie automatycznie zrestartowany przez useEffect z dependency na selectedImageIndex
    };

    const goToPrevious = () => {
        resetTimer();
        setSelectedImageIndex((prev) =>
            prev === 0 ? images.length - 1 : prev - 1
        );
    };

    const goToNext = () => {
        resetTimer();
        setSelectedImageIndex((prev) =>
            prev === images.length - 1 ? 0 : prev + 1
        );
    };

    const handleThumbnailClick = (index) => {
        resetTimer();
        setSelectedImageIndex(index);
    };

    return (
        <>
            {/* Mobile - Carousel (only if more than 1 image) */}
            <div className="md:hidden">
                {hasManyImages ? (
                    <MobileCarousel
                        images={images}
                        aspectRatio="1/1"
                        showCounter={true}
                    />
                ) : (
                    <div className="aspect-square bg-primary-light border border-white/10 overflow-hidden">
                        <img
                            src={images[0]}
                            alt={coffeeName}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}
            </div>

            {/* Desktop - Gallery with arrows */}
            <div className="hidden md:block space-y-4">
                {/* Main Image with arrows */}
                <div className="relative aspect-square bg-primary-light border border-white/10 overflow-hidden group">
                    <img
                        key={selectedImageIndex}
                        src={currentImage}
                        alt={`${coffeeName} - zdjęcie ${selectedImageIndex + 1}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105 animate-fadeIn"
                    />

                    {/* Navigation arrows */}
                    {hasManyImages && (
                        <>
                            {/* Left arrow */}
                            <button
                                onClick={goToPrevious}
                                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-white/60 hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-300"
                                aria-label="Poprzednie zdjęcie"
                            >
                                <FaChevronLeft className="w-6 h-6 drop-shadow-lg" />
                            </button>

                            {/* Right arrow */}
                            <button
                                onClick={goToNext}
                                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center text-white/60 hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-300"
                                aria-label="Następne zdjęcie"
                            >
                                <FaChevronRight className="w-6 h-6 drop-shadow-lg" />
                            </button>
                        </>
                    )}

                    {/* Image counter badge */}
                    {hasManyImages && (
                        <div className="absolute top-3 right-3 px-2 py-1 text-white/80 text-sm font-medium drop-shadow-lg">
                            {selectedImageIndex + 1}/{images.length}
                        </div>
                    )}
                </div>

                {/* Thumbnails */}
                {showThumbnails && hasManyImages && (
                    <div className="grid grid-cols-4 gap-3">
                        {images.map((image, index) => (
                            <button
                                key={index}
                                onClick={() => handleThumbnailClick(index)}
                                className={`
                                    aspect-square overflow-hidden border-2 transition-all duration-300
                                    ${index === selectedImageIndex
                                    ? 'border-accent'
                                    : 'border-white/10 hover:border-accent/50'
                                }
                                `}
                            >
                                <img
                                    src={image}
                                    alt={`${coffeeName} thumbnail ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
