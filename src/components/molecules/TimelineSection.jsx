import React from 'react';
import { ProductGallery } from './ProductGallery';
import { useScrollAnimation, scrollAnimations } from '../../hooks/useScrollAnimation';

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
    const isEven = index % 2 === 0;
    const [ref, isVisible] = useScrollAnimation({ threshold: 0.2 });

    return (
        <section
            id={`year-${year}`}
            className="scroll-mt-32"
            ref={ref}
        >
            {/* Desktop: Main Content + Gallery */}
            <div className={`grid md:grid-cols-5 gap-10 md:gap-16 items-stretch ${
                isEven ? '' : 'md:grid-flow-dense'
            }`}>
                {/* Content - Full height with animation at bottom */}
                <div className={`md:col-span-2 ${isEven ? '' : 'md:col-start-4'} transition-all duration-700 ease-out ${
                    isVisible
                        ? scrollAnimations[isEven ? 'flowLeft' : 'flowRight'].visible
                        : scrollAnimations[isEven ? 'flowLeft' : 'flowRight'].hidden
                }`}>
                    <div className="h-full flex flex-col bg-gradient-to-r from-primary-light/20 to-primary/30 border border-white/10 p-6 md:p-8 space-y-6">
                        {/* Year + Title */}
                        <div className="space-y-2">
                            <div className="text-2xl md:text-3xl text-accent tracking-wide">
                                {year}
                            </div>
                            <h3 className="text-3xl md:text-4xl text-white">
                                {title}
                            </h3>
                        </div>

                        {/* Description */}
                        <p className="text-base md:text-lg text-white/90 leading-relaxed">
                            {content}
                        </p>
                    </div>
                </div>

                {/* Gallery - Same component as product page */}
                {images.length > 0 && (
                    <div className={`md:col-span-3 ${isEven ? '' : 'md:col-start-1 md:row-start-1'} transition-all duration-700 ease-out delay-100 ${
                        isVisible
                            ? scrollAnimations[isEven ? 'flowRight' : 'flowLeft'].visible
                            : scrollAnimations[isEven ? 'flowRight' : 'flowLeft'].hidden
                    }`}>
                        <ProductGallery
                            images={images}
                            coffeeName={`${year} - ${title}`}
                            showThumbnails={false}
                            autoplay={true}
                            autoplayInterval={4000}
                            aspectRatio="3/4"
                            showCounter={false}
                        />
                    </div>
                )}
            </div>
        </section>
    );
}
