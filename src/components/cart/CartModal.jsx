import React, { useEffect, useState } from 'react';
import { useCartStore } from '../../store/cartStore';
import { ModalHeader } from '../layout/ModalHeader';
import { CartContent } from './CartContent';
import { CartFooter } from './CartFooter';

export function CartModal({ isOpen, onClose }) {
    const {
        items,
        isLoading,
        removeItem,
        updateQuantity,
        goToCheckout,
        getTotalItems,
        getTotalPrice
    } = useCartStore();

    const [isAnimating, setIsAnimating] = useState(false);

    useEffect(() => {
        if (isOpen) {
            // Trigger animation after mount
            setTimeout(() => setIsAnimating(true), 10);
        } else {
            setIsAnimating(false);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleCheckout = () => {
        goToCheckout();
        onClose();
    };

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

                <CartContent
                    items={items}
                    isLoading={isLoading}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeItem}
                />

                <CartFooter
                    items={items}
                    isLoading={isLoading}
                    totalPrice={getTotalPrice()}
                    onCheckout={handleCheckout}
                />
            </div>
        </>
    );
}