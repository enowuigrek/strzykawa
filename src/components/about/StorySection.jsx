import React, { useState } from 'react';
import { ImageModal } from '../ImageModal';
import strzykawaImg04 from '../../assets/strzykawa-04.jpg';
import strzykawaImg05 from '../../assets/strzykawa-05.jpg';

export function StorySection() {
    const [modalOpen, setModalOpen] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const images = [
        {
            src: strzykawaImg04,
            alt: "Jakiś opis"
        },
        {
            src: strzykawaImg05,
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
            {/* Opening Story - większe zdjęcie */}
            <div className="mb-20">
                <div
                    className="aspect-[21/16] bg-gradient-to-br from-primary-light/30 to-primary/50 border border-white/10 overflow-hidden shadow-lg mb-8 cursor-pointer hover:scale-105 transition-all duration-300"
                    onClick={() => openModal(0)}
                >
                    <img
                        src={images[0].src}
                        alt={images[0].alt}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 hover:bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-all duration-300">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                            <span className="text-white text-2xl">🔍</span>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-start">
                    <div className="space-y-6">
                        <p className="text-lg text-white/90 leading-relaxed">
                            Strzykawa zaczęła się skromnie – od małego sklepiku z kawą i dwóch stolików.
                            Można było kupić paczkę ziaren, usiąść na chwilę i porozmawiać przy filiżance.
                        </p>
                        <p className="text-lg text-white/90 leading-relaxed">
                            Z czasem przestrzeń coraz bardziej przypominała kawiarnię: więcej stolików,
                            muzyka z winyli, znajome twarze i rozmowy, które zatrzymywały na dłużej niż jedno espresso.
                        </p>
                    </div>

                    <div className="bg-gradient-to-r from-primary-light/20 to-primary/30 border border-white/10 p-8">
                        <p className="text-xl text-white font-medium leading-relaxed">
                            Tu nie chodziło tylko o kawę – <span className="text-accent font-bold">to miejsce, w którym ludzie się poznawali,
                            rodziły się znajomości i powstawała społeczność</span>. Strzykawa stała się czymś więcej niż kawiarnią –
                            miejscem spotkań i wymiany myśli.
                        </p>
                    </div>
                </div>
            </div>

            {/* Evolution Story - większe zdjęcie */}
            <div className="mb-20">
                <div
                    className="aspect-[9/9] bg-gradient-to-br from-primary-light/30 to-primary/50 border border-white/10 overflow-hidden shadow-lg mb-8 cursor-pointer hover:scale-105 transition-all duration-300"
                    onClick={() => openModal(1)}
                >
                    <img
                        src={images[1].src}
                        alt={images[1].alt}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/0 hover:bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-all duration-300">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                            <span className="text-white text-2xl">🔍</span>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 gap-12 items-start">
                    <div className="space-y-6">
                        <p className="text-lg text-white/90 leading-relaxed">
                            Kiedy pojawił się pierwszy mały piecyk do palenia, kawa z własnych wypałów trafiała
                            najpierw tylko do filiżanek gości. Później na półki, a w końcu – do pełnoprawnej palarni.
                        </p>
                        <p className="text-lg text-white/90 leading-relaxed">
                            Dziś, z dużym piecem i pasją do kawy specialty, Strzykawa to miejsce, w którym spotykają się
                            tradycja, świeżość i atmosfera Częstochowy.
                        </p>
                    </div>

                    <div className="bg-gradient-to-r from-muted/10 to-accent/10 border border-white/10 p-8">
                        <h3 className="text-xl font-bold text-white mb-4">Nasza filozofia</h3>
                        <p className="text-white/90 leading-relaxed">
                            Każde ziarno ma swoją historię. Od farmy przez palarnię aż do Twojej filiżanki.
                            Dbamy o każdy etap tej podróży, żeby kawa nie była tylko napojem, ale doświadczeniem.
                        </p>
                    </div>
                </div>
            </div>

            {/* Modal */}
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