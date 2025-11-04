import React, { useState } from 'react';

/**
 * ProductGallery - Galeria zdjęć produktu
 * Główne zdjęcie + thumbnails (jeśli więcej niż 1 zdjęcie)
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

    return (
        <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square bg-primary-light border border-white/10 overflow-hidden group">
                <img
                    src={currentImage}
                    alt={`${coffeeName} - zdjęcie ${selectedImageIndex + 1}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />

                {/* Image counter badge */}
                {hasManyImages && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-black/60 backdrop-blur-sm text-white text-sm">
                        {selectedImageIndex + 1} / {images.length}
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
                                aspect-square overflow-hidden border-2 transition-all
                                ${index === selectedImageIndex
                                ? 'border-accent shadow-lg'
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
    );
}