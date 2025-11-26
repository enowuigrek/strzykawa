import React from 'react';
import { MobileCarousel } from './MobileCarousel';

/**
 * TimelineSection - Single timeline entry component
 *
 * @param {string} year - Year/date of the event
 * @param {string} title - Title of the event
 * @param {string} content - Description text
 * @param {string[]} images - Array of image URLs
 * @param {number} index - Index for alternating layout
 */
export function TimelineSection({ year, title, content, images = [], index }) {
    const hasMultipleImages = images.length > 1;
    const isEven = index % 2 === 0;
    const mainImage = images[0];
    const additionalImages = images.slice(1);

    return (
        <section
            id={`year-${year}`}
            className="scroll-mt-32"
        >
            {/* Mobile: Carousel for all images */}
            <div className="md:hidden mb-10">
                <MobileCarousel
                    images={images}
                    aspectRatio="4/3"
                    showCounter={true}
                />
            </div>

            {/* Desktop: Main Content + First Image */}
            <div className={`grid md:grid-cols-5 gap-10 md:gap-16 items-start ${
                isEven ? '' : 'md:grid-flow-dense'
            }`}>
                {/* Content */}
                <div className={`space-y-6 md:col-span-2 ${isEven ? '' : 'md:col-start-4'}`}>
                    {/* Year + Title */}
                    <div className="space-y-2">
                        <div className="text-lg md:text-xl font-semibold text-accent tracking-wide">
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

                {/* Main Image - Desktop only */}
                {mainImage && (
                    <div className={`hidden md:block md:col-span-3 ${isEven ? '' : 'md:col-start-1 md:row-start-1'}`}>
                        <div className="bg-gradient-to-br from-primary-light/30 to-primary/50 border border-white/10 overflow-hidden shadow-xl">
                            <img
                                src={mainImage}
                                alt={`Strzykawa ${year} - ${title}`}
                                className="w-full h-auto object-contain"
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Additional Images Grid - Desktop only */}
            {additionalImages.length > 0 && (
                <div className="hidden md:block mt-12">
                    {additionalImages.length === 1 && (
                        <div className="flex justify-center">
                            <div className="w-full max-w-3xl bg-gradient-to-br from-primary-light/30 to-primary/50 border border-white/10 overflow-hidden shadow-xl">
                                <img
                                    src={additionalImages[0]}
                                    alt={`Strzykawa ${year} - dodatkowe zdjęcie`}
                                    className="w-full h-auto object-contain"
                                />
                            </div>
                        </div>
                    )}

                    {additionalImages.length === 2 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                            {additionalImages.map((image, idx) => (
                                <div
                                    key={idx}
                                    className="bg-gradient-to-br from-primary-light/30 to-primary/50 border border-white/10 overflow-hidden shadow-xl"
                                >
                                    <img
                                        src={image}
                                        alt={`Strzykawa ${year} - dodatkowe zdjęcie ${idx + 1}`}
                                        className="w-full h-auto object-contain"
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    {additionalImages.length >= 3 && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                            {additionalImages.map((image, idx) => (
                                <div
                                    key={idx}
                                    className="bg-gradient-to-br from-primary-light/30 to-primary/50 border border-white/10 overflow-hidden shadow-xl"
                                >
                                    <img
                                        src={image}
                                        alt={`Strzykawa ${year} - dodatkowe zdjęcie ${idx + 1}`}
                                        className="w-full h-auto object-contain"
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
