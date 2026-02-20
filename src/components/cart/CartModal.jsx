import React, { useEffect, useState } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import { useCartStore } from '../../store/cartStore';
import { ModalHeader } from '../layout/ModalHeader';
import { CartContent } from './CartContent';
import { CartFooter } from './CartFooter';

export function CartModal({ isOpen, onClose }) {
    const {
        items,
        note,
        isLoading,
        removeItem,
        updateQuantity,
        updateNote,
        getTotalItems,
        getTotalPrice,
        removeUnavailableItems
    } = useCartStore();

    const [isAnimating, setIsAnimating] = useState(false);
    const [removedNames, setRemovedNames] = useState([]);

    // Animation trigger + availability check on open
    useEffect(() => {
        if (isOpen) {
            setTimeout(() => setIsAnimating(true), 10);
            // Sprawdź dostępność i usuń niedostępne
            removeUnavailableItems().then(names => {
                if (names.length > 0) setRemovedNames(names);
            });
        } else {
            setIsAnimating(false);
            setRemovedNames([]);
        }
    }, [isOpen]);

    // Blokuj scroll body gdy koszyk otwarty (mobile fix)
    useEffect(() => {
        if (isOpen) {
            // Zapisz obecny scroll position
            const scrollY = window.scrollY;

            // Zablokuj scroll
            document.body.style.position = 'fixed';
            document.body.style.top = `-${scrollY}px`;
            document.body.style.width = '100%';

            return () => {
                // Przywróć scroll
                document.body.style.position = '';
                document.body.style.top = '';
                document.body.style.width = '';
                window.scrollTo(0, scrollY);
            };
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop - z animacją fade-in i blur + przyciemnienie */}
            <div
                className={`
                    fixed inset-0 bg-black/70 z-[190]
                    backdrop-blur-md
                    transition-all duration-300 ease-out
                    ${isAnimating ? 'opacity-100' : 'opacity-0'}
                `}
                onClick={onClose}
            />

            {/* Modal - Slide-in z prawej (desktop), slide-up (mobile) */}
            <div
                className={`
                    fixed h-full w-full md:max-w-md
                    bg-primary-dark border-l border-white/20
                    z-[200] shadow-2xl flex flex-col
                    transition-all duration-300 ease-out

                    ${isAnimating
                        ? 'right-0 bottom-0 md:translate-x-0 translate-y-0'
                        : 'right-0 md:translate-x-full bottom-0 translate-y-full md:translate-y-0'
                    }
                `}
            >
                <ModalHeader
                    title="Koszyk"
                    badge={getTotalItems() > 0 && (
                        <span className="px-3 py-1 bg-success text-white text-sm font-bold rounded-full">
                            {getTotalItems()}
                        </span>
                    )}
                    onClose={onClose}
                    isAnimating={isAnimating}
                />

                {/* Banner o usuniętych niedostępnych produktach */}
                {removedNames.length > 0 && (
                    <div className="flex-shrink-0 bg-danger/10 border-b border-danger/30 px-4 sm:px-6 py-3">
                        <div className="flex items-start gap-2">
                            <FaExclamationTriangle className="w-4 h-4 text-danger flex-shrink-0 mt-0.5" />
                            <div>
                                <p className="text-sm text-danger font-medium">
                                    Usunięto niedostępne produkty:
                                </p>
                                <p className="text-sm text-danger/80 mt-0.5">
                                    {removedNames.join(', ')}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Scrollable area — products from top, scroll when overflow */}
                <div className="flex-1 overflow-y-auto min-h-0 scrollbar-thin">
                    <CartContent
                        items={items}
                        isLoading={isLoading}
                        onUpdateQuantity={updateQuantity}
                        onRemove={removeItem}
                        onCloseCart={onClose}
                    />
                </div>

                <CartFooter
                    items={items}
                    isLoading={isLoading}
                    totalPrice={getTotalPrice()}
                    note={note}
                    onSaveNote={updateNote}
                />
            </div>
        </>
    );
}