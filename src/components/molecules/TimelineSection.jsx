import React, { useState } from 'react';
import { MobileCarousel } from './MobileCarousel';

/**
 * TimelineSection - Single timeline entry component
 *
 * @param {string} year - Year/date of the event
 * @param {string} title - Title of the event
 * @param {string} content - Description text
 * @param {string[]} images - Array of image URLs (first is main, rest in grid)
 * @param {number} index - Index for alternating layout
 */
export function TimelineSection({ year, title, content, images = [], index }) {
    const hasMultipleImages = images.length > 1;
    const isEven = index % 2 === 0;
    const mainImage = images[0];
    const additionalImages = images.slice(1);

    // State dla orientacji głównego zdjęcia
    const [mainImageOrientation, setMainImageOrientation] = useState('landscape');

    // 🆕 NOWE: State dla orientacji dodatkowych zdjęć (array)
    const [additionalImagesOrientation, setAdditionalImagesOrientation] = useState([]);

    // Funkcja wykrywania orientacji głównego zdjęcia
    const handleImageLoad = (event) => {
        const img = event.target;
        const width = img.naturalWidth;
        const height = img.naturalHeight;

        if (height > width * 1.2) {
            setMainImageOrientation('portrait');
        } else if (width > height * 1.2) {
            setMainImageOrientation('landscape');
        } else {
            setMainImageOrientation('square');
        }
    };

    // 🆕 NOWE: Funkcja wykrywania orientacji dodatkowych zdjęć
    const handleAdditionalImageLoad = (event, imageIndex) => {
        const img = event.target;
        const width = img.naturalWidth;
        const height = img.naturalHeight;

        let orientation;
        if (height > width * 1.2) {
            orientation = 'portrait';
        } else if (width > height * 1.2) {
            orientation = 'landscape';
        } else {
            orientation = 'square';
        }

        // Zapisz orientację dla tego konkretnego obrazka
        setAdditionalImagesOrientation(prev => {
            const newOrientations = [...prev];
            newOrientations[imageIndex] = orientation;
            return newOrientations;
        });
    };

    // Wybierz aspect class dla głównego zdjęcia
    const getAspectClass = () => {
        switch (mainImageOrientation) {
            case 'portrait':
                return 'aspect-[3/4]';
            case 'square':
                return 'aspect-square';
            case 'landscape':
            default:
                return 'aspect-[4/3]';
        }
    };

    // 🆕 NOWE: Wybierz aspect class dla dodatkowego zdjęcia
    const getAdditionalAspectClass = (imageIndex) => {
        const orientation = additionalImagesOrientation[imageIndex] || 'landscape';

        switch (orientation) {
            case 'portrait':
                return 'aspect-[3/4]';
            case 'square':
                return 'aspect-square';
            case 'landscape':
            default:
                return 'aspect-[4/3]';
        }
    };

    return (
        <section
            id={`year-${year}`}
            className="scroll-mt-32 mb-24 md:mb-32"
        >
            {/* Mobile: Carousel for multiple images */}
            {hasMultipleImages && (
                <div className="md:hidden mb-8">
                    <MobileCarousel
                        images={images}
                        aspectRatio="4/3"
                        showCounter={true}
                    />
                </div>
            )}

            {/* Main Content + Image */}
            <div className={`grid md:grid-cols-2 gap-8 md:gap-12 items-start ${
                isEven ? '' : 'md:grid-flow-dense'
            }`}>
                {/* Content */}
                <div className={`space-y-6 ${isEven ? '' : 'md:col-start-2'}`}>
                    {/* Year + Title */}
                    <div className="space-y-2">
                        <div className="text-5xl md:text-6xl font-bold text-accent/30">
                            {year}
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white">
                            {title}
                        </h3>
                    </div>

                    {/* Description */}
                    <div className="bg-gradient-to-r from-primary-light/20 to-primary/30 border border-white/10 p-6 md:p-8">
                        <p className="text-base md:text-lg text-white/90 leading-relaxed">
                            {content}
                        </p>
                    </div>
                </div>

                {/* Main Image - Desktop only when multiple, always on single */}
                {mainImage && (
                    <div className={`${hasMultipleImages ? 'hidden md:block' : ''} ${isEven ? '' : 'md:col-start-1 md:row-start-1'}`}>
                        <div className={`${getAspectClass()} bg-gradient-to-br from-primary-light/30 to-primary/50 border border-white/10 overflow-hidden shadow-lg`}>
                            <img
                                src={mainImage}
                                alt={`Strzykawa ${year} - ${title}`}
                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                onLoad={handleImageLoad}
                            />
                        </div>
                    </div>
                )}

                {/* If no main image, make content full width */}
                {!mainImage && (
                    <div className="md:col-span-2">
                        {/* Content already rendered above, this just adjusts grid */}
                    </div>
                )}
            </div>

            {/* Additional Images Grid - Desktop only when multiple images */}
            {additionalImages.length > 0 && (
                <div className={hasMultipleImages ? 'hidden md:block' : ''}>
                    {/* Jeśli JEDNO dodatkowe zdjęcie - wycentrowane, pełna szerokość */}
                    {additionalImages.length === 1 && (
                        <div className="mt-8 flex justify-center">
                            <div
                                className={`w-full max-w-2xl ${getAdditionalAspectClass(0)} bg-gradient-to-br from-primary-light/30 to-primary/50 border border-white/10 overflow-hidden shadow-lg`}
                            >
                                <img
                                    src={additionalImages[0]}
                                    alt={`Strzykawa ${year} - dodatkowe zdjęcie`}
                                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                    onLoad={(e) => handleAdditionalImageLoad(e, 0)}
                                />
                            </div>
                        </div>
                    )}

                    {/* 🆕 Jeśli DWA dodatkowe zdjęcia - obok siebie, z max-width */}
                    {additionalImages.length === 2 && (
                        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            {additionalImages.map((image, idx) => (
                                <div
                                    key={idx}
                                    className={`${getAdditionalAspectClass(idx)} bg-gradient-to-br from-primary-light/30 to-primary/50 border border-white/10 overflow-hidden shadow-lg`}
                                >
                                    <img
                                        src={image}
                                        alt={`Strzykawa ${year} - dodatkowe zdjęcie ${idx + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                        onLoad={(e) => handleAdditionalImageLoad(e, idx)}
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* 🆕 Jeśli TRZY lub więcej - normalny grid */}
                    {additionalImages.length >= 3 && (
                        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {additionalImages.map((image, idx) => (
                                <div
                                    key={idx}
                                    className={`${getAdditionalAspectClass(idx)} bg-gradient-to-br from-primary-light/30 to-primary/50 border border-white/10 overflow-hidden shadow-lg`}
                                >
                                    <img
                                        src={image}
                                        alt={`Strzykawa ${year} - dodatkowe zdjęcie ${idx + 1}`}
                                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                        onLoad={(e) => handleAdditionalImageLoad(e, idx)}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </section>
    );
}