import React from 'react';

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
    const isEven = index % 2 === 0;
    const mainImage = images[0];
    const additionalImages = images.slice(1);

    return (
        <section
            id={`year-${year}`}
            className="scroll-mt-32 mb-24 md:mb-32"
        >
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

                {/* Main Image */}
                {mainImage && (
                    <div className={`${isEven ? '' : 'md:col-start-1 md:row-start-1'}`}>
                        <div className="aspect-[4/3] bg-gradient-to-br from-primary-light/30 to-primary/50 border border-white/10 overflow-hidden shadow-lg">
                            <img
                                src={mainImage}
                                alt={`Strzykawa ${year} - ${title}`}
                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
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

            {/* Additional Images Grid */}
            {additionalImages.length > 0 && (
                <div className={`mt-8 grid gap-4 ${
                    additionalImages.length === 2
                        ? 'grid-cols-1 md:grid-cols-2'
                        : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                }`}>
                    {additionalImages.map((image, idx) => (
                        <div
                            key={idx}
                            className="aspect-[4/3] bg-gradient-to-br from-primary-light/30 to-primary/50 border border-white/10 overflow-hidden shadow-lg"
                        >
                            <img
                                src={image}
                                alt={`Strzykawa ${year} - dodatkowe zdjęcie ${idx + 1}`}
                                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                            />
                        </div>
                    ))}
                </div>
            )}
        </section>
    );
}

// Demo Component
export function TimelineSectionExamples() {
    const exampleData = [
        {
            year: "2020",
            title: "Początek podróży",
            content: "Otwieramy kawiarnię na Dąbrowskiego 4 w Częstochowie. Rozpoczynamy skromnie, do tego w okresie szalejącej pandemii.",
            images: [
                "https://placehold.co/600x400/2d1b2e/ffffff?text=2020+-+Glowne",
                "https://placehold.co/600x400/2d1b2e/ffffff?text=2020+-+Extra+1",
                "https://placehold.co/600x400/2d1b2e/ffffff?text=2020+-+Extra+2"
            ]
        },
        {
            year: "2022",
            title: "Rozbudowa i rozwój",
            content: "Przeprowadzamy remont w lokalu zwiększając ilość miejsc siedzących. Przystosowujemy kuchnię i zaczynamy wypiekać słodkości.",
            images: [
                "https://placehold.co/600x400/2d1b2e/ffffff?text=2022+-+Glowne"
            ]
        },
        {
            year: "2024",
            title: "Palarnia kawy",
            content: "Kupujemy większy piec i wynajmujemy kolejny lokal kilka kilometrów za Częstochową.",
            images: [
                "https://placehold.co/600x400/2d1b2e/ffffff?text=2024+-+Glowne",
                "https://placehold.co/600x400/2d1b2e/ffffff?text=2024+-+Extra+1"
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-primary p-8">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-white mb-12 text-center">
                    Timeline Section Examples
                </h1>
                {exampleData.map((item, index) => (
                    <TimelineSection
                        key={item.year}
                        year={item.year}
                        title={item.title}
                        content={item.content}
                        images={item.images}
                        index={index}
                    />
                ))}
            </div>
        </div>
    );
}