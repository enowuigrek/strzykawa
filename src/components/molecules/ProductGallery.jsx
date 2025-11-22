import React, { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { MobileCarousel } from './MobileCarousel';

/**
 * ProductGallery - Galeria zdjęć produktu
 * Desktop: Główne zdjęcie z strzałkami + thumbnails
 * Mobile: Instagram-style carousel
 */
export function ProductGallery({ images = [], coffeeName }) {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    if (!images || images.length === 0) {
        return (
            <div className="aspect-square bg-primary-light border border-white/10 flex items-center justify-center">
                <p className="text-muted">Brak zdjęcia</p>
            </div>
        );
    }

    const currentImage = images[selectedImageIndex];
    const hasManyImages = images.length > 1;

    const goToPrevious = () => {
        setSelectedImageIndex((prev) =>
            prev === 0 ? images.length - 1 : prev - 1
        );
    };

    const goToNext = () => {
        setSelectedImageIndex((prev) =>
            prev === images.length - 1 ? 0 : prev + 1
        );
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
                        src={currentImage}
                        alt={`${coffeeName} - zdjęcie ${selectedImageIndex + 1}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Navigation arrows */}
                    {hasManyImages && (
                        <>
                            {/* Left arrow */}
                            <button
                                onClick={goToPrevious}
                                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary/80 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-accent hover:border-accent"
                                aria-label="Poprzednie zdjęcie"
                            >
                                <FaChevronLeft className="w-4 h-4" />
                            </button>

                            {/* Right arrow */}
                            <button
                                onClick={goToNext}
                                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-primary/80 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-accent hover:border-accent"
                                aria-label="Następne zdjęcie"
                            >
                                <FaChevronRight className="w-4 h-4" />
                            </button>
                        </>
                    )}

                    {/* Image counter badge */}
                    {hasManyImages && (
                        <div className="absolute top-3 right-3 px-2 py-1 bg-primary/80 backdrop-blur-sm border border-white/10 text-white text-sm font-medium">
                            {selectedImageIndex + 1}/{images.length}
                        </div>
                    )}
                </div>

                {/* Thumbnails */}
                {hasManyImages && (
                    <div className="grid grid-cols-4 gap-3">
                        {images.map((image, index) => (
                            <button
                                key={index}
                                onClick={() => setSelectedImageIndex(index)}
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
