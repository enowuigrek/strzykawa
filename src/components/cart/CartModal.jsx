import React from 'react';
import { useCartStore } from '../../store/cartStore';
import { CartHeader } from './CartHeader';
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

    if (!isOpen) return null;

    const handleCheckout = () => {
        goToCheckout();
        onClose();
    };

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed right-0 top-0 h-full w-full max-w-md bg-primary-dark border-l border-white/20 z-50 shadow-2xl flex flex-col">

                <CartHeader
                    totalItems={getTotalItems()}
                    onClose={onClose}
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