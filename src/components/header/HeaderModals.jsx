import React from 'react';
import { LoginModal } from '../modals/LoginModal.jsx';
import { RegisterModal } from '../modals/RegisterModal.jsx';
import { CartModal } from '../cart/CartModal.jsx';
import { QuickAddModal } from '../modals/QuickAddModal.jsx';
import { useCartStore } from '../../store/cartStore';

export function HeaderModals({
                                 loginModal,
                                 registerModal,
                                 cartModal,
                                 quickAddModal,
                                 onCloseCart,
                                 onCloseLogin,
                                 onCloseQuickAdd,
                                 onCloseAll
                             }) {
    const { addItem } = useCartStore();

    const handleQuickAddToCart = async (coffee, variant, quantity) => {
        await addItem(coffee, variant.id, quantity);
        // Po dodaniu do koszyka, możemy otworzyć koszyk (opcjonalnie)
        // window.dispatchEvent(new CustomEvent('openCart'));
    };

    return (
        <>
            <LoginModal
                isOpen={loginModal.isOpen}
                onClose={onCloseLogin || onCloseAll}
                onSwitchToRegister={loginModal.onSwitchToRegister}
            />
            <RegisterModal
                isOpen={registerModal.isOpen}
                onClose={onCloseAll}
                onSwitchToLogin={registerModal.onSwitchToLogin}
            />
            <CartModal
                isOpen={cartModal.isOpen}
                onClose={onCloseCart || onCloseAll}
            />
            {quickAddModal.coffee && (
                <QuickAddModal
                    coffee={quickAddModal.coffee}
                    isOpen={quickAddModal.isOpen}
                    onClose={onCloseQuickAdd || onCloseAll}
                    onAddToCart={handleQuickAddToCart}
                />
            )}
        </>
    );
}