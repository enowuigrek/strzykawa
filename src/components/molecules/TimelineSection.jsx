import React, { useState } from 'react';

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

    // State dla orientacji głównego zdjęcia
    const [mainImageOrientation, setMainImageOrientation] = useState('landscape');

    // 🆕 NOWE: State dla orientacji dodatkowych zdjęć (array)
    const [additionalImagesOrientation, setAdditionalImagesOrientation] = useState([]);

    // Funkcja wykrywania orientacji głównego zdjęcia
    const handleImageLoad = (event) => {
        const img = event.target;
        const width = img.naturalWidth;
        const height = img.naturalHeight;

        console.log(`📸 Main image loaded: ${width}x${height}`);

        if (height > width * 1.2) {
            setMainImageOrientation('portrait');
            console.log('✅ Main: PORTRAIT');
        } else if (width > height * 1.2) {
            setMainImageOrientation('landscape');
            console.log('✅ Main: LANDSCAPE');
        } else {
            setMainImageOrientation('square');
            console.log('✅ Main: SQUARE');
        }
    };

    // 🆕 NOWE: Funkcja wykrywania orientacji dodatkowych zdjęć
    const handleAdditionalImageLoad = (event, imageIndex) => {
        const img = event.target;
        const width = img.naturalWidth;
        const height = img.naturalHeight;

        console.log(`📸 Additional image [${imageIndex}] loaded: ${width}x${height}`);

        let orientation;
        if (height > width * 1.2) {
            orientation = 'portrait';
            console.log(`✅ Additional [${imageIndex}]: PORTRAIT`);
        } else if (width > height * 1.2) {
            orientation = 'landscape';
            console.log(`✅ Additional [${imageIndex}]: LANDSCAPE`);
        } else {
            orientation = 'square';
            console.log(`✅ Additional [${imageIndex}]: SQUARE`);
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

            {/* Additional Images Grid */}
            {additionalImages.length > 0 && (
                <>
                    {/* 🆕 Jeśli JEDNO dodatkowe zdjęcie - wycentrowane, pełna szerokość */}
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
                </>
            )}
        </section>
    );
}

// Demo Component pozostaje bez zmian
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