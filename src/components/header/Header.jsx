import React, { useEffect, useState } from "react";
import { useAuthStore } from '../../store/authStore.js';
import { useCartStore } from '../../store/cartStore.js';
import { useHeroAnimation } from '../../hooks/useHeroAnimation.js';
import { Logo } from './Logo.jsx';
import { DesktopNavigation } from './DesktopNavigation.jsx';
import { MobileNavigation } from './MobileNavigation.jsx';
import { HeaderActions } from './HeaderActions.jsx';
import { MobileMenuToggle } from './MobileMenuToggle.jsx';
import { HeaderModals } from './HeaderModals.jsx';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [showCartModal, setShowCartModal] = useState(false);

    const { logout } = useAuthStore();
    const { getTotalItems } = useCartStore();

    // Używamy hook'a do animacji synchronizowanej z hero
    const { showContent: showHeader } = useHeroAnimation(100);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const closeMobileMenu = () => setMobileMenuOpen(false);

    const modalActions = {
        openLogin: () => { setShowLoginModal(true); setShowRegisterModal(false); },
        openRegister: () => { setShowRegisterModal(true); setShowLoginModal(false); },
        openCart: () => setShowCartModal(true),
        closeAll: () => {
            setShowLoginModal(false);
            setShowRegisterModal(false);
            setShowCartModal(false);
        }
    };

    const handleLogout = () => {
        logout();
        closeMobileMenu();
    };

    const headerBg = mobileMenuOpen
        ? 'bg-primary-dark/95 backdrop-blur-md shadow-2xl border-b border-white/10'
        : scrolled
            ? 'bg-primary-dark/95 backdrop-blur-md shadow-2xl border-b border-white/10'
            : 'bg-transparent';

    return (
        <>
            <header className={`
                fixed top-0 left-0 w-full z-50 transition-all duration-1000 ease-out
                ${headerBg}
                ${showHeader
                ? 'translate-y-0 opacity-100'
                : '-translate-y-full opacity-0'
            }
            `}>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4 lg:py-5">
                        <Logo scrolled={scrolled} />
                        <DesktopNavigation />
                        <HeaderActions
                            cartItemsCount={getTotalItems()}
                            onOpenCart={modalActions.openCart}
                            onOpenLogin={modalActions.openLogin}
                            onLogout={handleLogout}
                        />
                        <MobileMenuToggle
                            isOpen={mobileMenuOpen}
                            onToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
                        />
                    </div>

                    <MobileNavigation
                        isOpen={mobileMenuOpen}
                        onClose={closeMobileMenu}
                        cartItemsCount={getTotalItems()}
                        onOpenCart={modalActions.openCart}
                        onOpenLogin={modalActions.openLogin}
                        onLogout={handleLogout}
                    />
                </div>
            </header>

            <HeaderModals
                loginModal={{ isOpen: showLoginModal, onSwitchToRegister: modalActions.openRegister }}
                registerModal={{ isOpen: showRegisterModal, onSwitchToLogin: modalActions.openLogin }}
                cartModal={{ isOpen: showCartModal }}
                onCloseAll={modalActions.closeAll}
            />
        </>
    );
}