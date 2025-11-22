import React, { useState } from 'react';
import { ImageModal } from '../../molecules/ImageModal';
import { MobileCarousel } from '../../molecules/MobileCarousel';
import strzykawaImg01 from '../../../assets/strzykawa-01.jpg';
import strzykawaImg02 from '../../../assets/strzykawa-02.jpg';
import strzykawaImg07 from '../../../assets/strzykawa-07.jpg';
import strzykawaImg06 from '../../../assets/strzykawa-06.jpg';

export function PhotoGallery() {
    const [modalOpen, setModalOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const images = [
        {
            src: strzykawaImg01,
            alt: "Janek musiał się pojawić"
        },
        {
            src: strzykawaImg02,
            alt: "Jakiś opis"
        },
        {
            src: strzykawaImg07,
            alt: "Jakiś opis"
        },
        {
            src: strzykawaImg06,
            alt: "Jakiś opis"
        }
    ];

    const openModal = (index) => {
        setCurrentImageIndex(index);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    const goToPrevious = () => {
        setCurrentImageIndex((prev) =>
            prev === 0 ? images.length - 1 : prev - 1
        );
    };

    const goToNext = () => {
        setCurrentImageIndex((prev) =>
            prev === images.length - 1 ? 0 : prev + 1
        );
    };

    return (
        <>
            <div className="mb-20">
                <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-12">
                    Strzykawa dziś
                </h2>

                {/* Mobile version - Carousel */}
                <div className="md:hidden mb-8">
                    <MobileCarousel
                        images={images}
                        aspectRatio="16/9"
                        showCounter={true}
                    />
                </div>

                {/* Desktop version - Grid with modal */}
                <div className="hidden md:block">
                    {/* Główne duże zdjęcie */}
                    <div
                        className="aspect-[16/9] bg-gradient-to-br from-primary-light/30 to-primary/50 border border-white/10 overflow-hidden shadow-lg mb-12 cursor-pointer hover:scale-105 transition-all duration-300 relative"
                        onClick={() => openModal(0)}
                    >
                        <img
                            src={images[0].src}
                            alt={images[0].alt}
                            className="w-full h-full object-cover"
                        />
                        {/* Overlay z ikonką */}
                        <div className="absolute inset-0 bg-black/0 hover:bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-all duration-300">
                            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                                <span className="text-white text-2xl">🔍</span>
                            </div>
                        </div>
                    </div>

                    {/* Grid z 3 mniejszymi zdjęciami */}
                    <div className="grid md:grid-cols-3 gap-6">
                        {images.slice(1).map((image, index) => (
                            <div
                                key={index}
                                className="relative aspect-[4/3] bg-gradient-to-br from-primary-light/30 to-primary/50 border border-white/10 overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition-all duration-300"
                                onClick={() => openModal(index + 1)}
                            >
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    className="w-full h-full object-cover"
                                />
                                {/* Overlay z ikonką */}
                                <div className="absolute inset-0 bg-black/0 hover:bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-all duration-300">
                                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                                        <span className="text-white text-xl">🔍</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal - tylko dla desktop */}
            <ImageModal
                isOpen={modalOpen}
                onClose={closeModal}
                images={images}
                currentIndex={currentImageIndex}
                onPrevious={goToPrevious}
                onNext={goToNext}
            />
        </>
    );
}