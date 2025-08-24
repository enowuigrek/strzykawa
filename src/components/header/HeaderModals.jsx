import React from 'react';
import { LoginModal } from '../LoginModal.jsx';
import { RegisterModal } from '../RegisterModal.jsx';
import { CartModal } from '../cart/CartModal.jsx';

export function HeaderModals({
                                 loginModal,
                                 registerModal,
                                 cartModal,
                                 onCloseAll
                             }) {
    return (
        <>
            <LoginModal
                isOpen={loginModal.isOpen}
                onClose={onCloseAll}
                onSwitchToRegister={loginModal.onSwitchToRegister}
            />
            <RegisterModal
                isOpen={registerModal.isOpen}
                onClose={onCloseAll}
                onSwitchToLogin={registerModal.onSwitchToLogin}
            />
            <CartModal
                isOpen={cartModal.isOpen}
                onClose={onCloseAll}
            />
        </>
    );
}