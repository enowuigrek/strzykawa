import React from 'react';
import { CloseButton } from '../atoms/CloseButton';

/**
 * ModalHeader - Wspólny header dla wszystkich modalów
 * Wzorowany na CartHeader - identyczna struktura i style
 *
 * @param {string} title - Tytuł modala
 * @param {ReactNode} icon - Opcjonalna ikona (dla LoginModal/RegisterModal)
 * @param {ReactNode} badge - Opcjonalny badge (dla CartModal)
 * @param {function} onClose - Callback do zamknięcia modala
 * @param {boolean} isAnimating - Stan animacji (dla fade-in Close button)
 */
export function ModalHeader({ title, icon, badge, onClose, isAnimating }) {
    return (
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative flex justify-between items-center h-[100px] lg:h-[120px] border-b border-white/10">
                {/* Title + Icon/Badge */}
                <div className="flex items-center gap-3">
                    {icon && (
                        <div className="p-2 bg-accent/20 border border-accent/30">
                            {icon}
                        </div>
                    )}
                    <h2 className="text-xl lg:text-2xl font-normal text-white">
                        {title}
                    </h2>
                    {badge}
                </div>

                {/* Close button - pojawia się PO animacji */}
                <div className={`
                    absolute right-0 top-1/2 -translate-y-1/2
                    transition-opacity duration-300 delay-300
                    ${isAnimating ? 'opacity-100' : 'opacity-0'}
                `}>
                    <CloseButton onClick={onClose} />
                </div>
            </div>
        </div>
    );
}
