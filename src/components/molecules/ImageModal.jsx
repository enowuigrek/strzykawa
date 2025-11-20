import React, { useEffect } from 'react';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

export function ImageModal({
                               isOpen,
                               onClose,
                               images,
                               currentIndex,
                               onPrevious,
                               onNext
                           }) {
    // Obsługa klawiatury
    useEffect(() => {
        if (!isOpen) return;

        const handleKeyPress = (e) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft') onPrevious();
            if (e.key === 'ArrowRight') onNext();
        };

        document.addEventListener('keydown', handleKeyPress);
        document.body.style.overflow = 'hidden'; // Blokuj scroll

        return () => {
            document.removeEventListener('keydown', handleKeyPress);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose, onPrevious, onNext]);

    if (!isOpen) return null;

    const currentImage = images[currentIndex];

    return (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
            {/* Backdrop - kliknij żeby zamknąć */}
            <div
                className="absolute inset-0"
                onClick={onClose}
            />

            {/* Modal Content */}
            <div className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center">

                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-3 bg-black/50 hover:bg-black/70 text-white border border-white/20 transition-all duration-300"
                    title="Zamknij (Esc)"
                >
                    <FaTimes className="w-6 h-6" />
                </button>

                {/* Previous Button */}
                {images.length > 1 && (
                    <button
                        onClick={onPrevious}
                        className="absolute left-4 z-10 p-3 bg-black/50 hover:bg-black/70 text-white border border-white/20 transition-all duration-300"
                        title="Poprzednie (←)"
                    >
                        <FaChevronLeft className="w-6 h-6" />
                    </button>
                )}

                {/* Next Button */}
                {images.length > 1 && (
                    <button
                        onClick={onNext}
                        className="absolute right-4 z-10 p-3 bg-black/50 hover:bg-black/70 text-white border border-white/20 transition-all duration-300"
                        title="Następne (→)"
                    >
                        <FaChevronRight className="w-6 h-6" />
                    </button>
                )}

                {/* Image */}
                <div className="relative max-w-full max-h-full">
                    <img
                        src={currentImage.src}
                        alt={currentImage.alt}
                        className="max-w-full max-h-full object-contain"
                        onClick={onNext} // Kliknij w zdjęcie = następne
                    />

                    {/* Image Info */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                        <p className="text-white text-center">
                            {currentImage.alt}
                        </p>
                        {images.length > 1 && (
                            <p className="text-white/60 text-center text-sm mt-2">
                                {currentIndex + 1} / {images.length}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}