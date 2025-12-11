import React, { useEffect, useState } from 'react';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';
import { ModalHeader } from '../layout/ModalHeader';
import { CartContent } from './CartContent';
import { ShippingProgress } from './ShippingProgress';
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

    const { user } = useAuthStore();

    const [isAnimating, setIsAnimating] = useState(false);

    // Animation trigger
    useEffect(() => {
        if (isOpen) {
            // Trigger animation after mount
            setTimeout(() => setIsAnimating(true), 10);
        } else {
            setIsAnimating(false);
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

    const handleCheckout = () => {
        // Pass user data for pre-fill if logged in
        goToCheckout(user);
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

                {/* Shipping Progress - na dole zawartości, przed footrem */}
                {items.length > 0 && (
                    <ShippingProgress totalPrice={getTotalPrice()} />
                )}

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