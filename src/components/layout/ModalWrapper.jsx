import React, { useState, useEffect } from 'react';
import { ModalHeader } from './ModalHeader.jsx';

/**
 * ModalWrapper - Wspólny wrapper dla wszystkich modalów (Login, Register, QuickAdd)
 * Mobile: slide-up z dołu
 * Desktop: wycentrowany modal
 */
export function ModalWrapper({
    isOpen,
    onClose,
    title,
    icon,
    badge,
    children,
    maxHeight = '85vh'
}) {
    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => setIsAnimating(true), 10);
        } else {
            setIsAnimating(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className={`
                    fixed inset-0 bg-black/70 z-[190]
                    backdrop-blur-md
                    transition-all duration-300 ease-out
                    ${isAnimating ? 'opacity-100' : 'opacity-0'}
                `}
                onClick={onClose}
            />

            {/* Modal */}
            <div
                className={`
                    fixed w-full md:max-w-md
                    bg-primary
                    z-[200] shadow-2xl flex flex-col
                    transition-all duration-300 ease-out

                    left-0 md:left-1/2 md:top-1/2 md:-translate-x-1/2

                    ${isAnimating
                        ? 'bottom-0 md:bottom-auto translate-y-0 md:-translate-y-1/2 opacity-100'
                        : 'bottom-0 md:bottom-auto translate-y-full md:translate-y-0 md:-translate-y-1/2 opacity-0'
                    }
                `}
                style={{ maxHeight }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header - sticky */}
                <div className="flex-shrink-0 sticky top-0 bg-primary z-10">
                    <ModalHeader
                        title={title}
                        icon={icon}
                        badge={badge}
                        onClose={onClose}
                        isAnimating={isAnimating}
                    />
                </div>

                {/* Content - scrollable */}
                <div className="flex-1 overflow-y-auto">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}
