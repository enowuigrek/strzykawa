import { useEffect, useState } from "react";
import { useAuthStore } from '../../store/authStore.js';
import { useCartStore } from '../../store/cartStore.js';
import { useHeroAnimation } from '../../hooks/useHeroAnimation.js';
import { Logo } from '../atoms/Logo.jsx';
import { DesktopNavigation } from '../header/DesktopNavigation.jsx';
import { MobileNavigation } from '../header/MobileNavigation.jsx';
import { HeaderActions } from '../header/HeaderActions.jsx';
import { MobileMenuToggle } from '../header/MobileMenuToggle.jsx';
import { HeaderModals } from '../header/HeaderModals.jsx';
import { MobileBottomNavigation } from '../header/MobileBottomNavigation.jsx';

/**
 * Header - Main navigation with auto-hide and floating hamburger
 */
export function Header() {
    // ========== STATE ==========
    const [scrolled, setScrolled] = useState(false);
    const [hideHeader, setHideHeader] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [showCartModal, setShowCartModal] = useState(false);

    // ========== STORES ==========
    const { logout } = useAuthStore();
    const { getTotalItems } = useCartStore();

    // ========== HOOKS ==========
    const { showContent: showHeader } = useHeroAnimation(100);

    // ========== SCROLL DETECTION + AUTO-HIDE ==========
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            setScrolled(currentScrollY > 100);

            // Auto-hide logic
            if (currentScrollY < 270) {
                setHideHeader(false);
            } else {
                if (currentScrollY > lastScrollY && currentScrollY - lastScrollY > 20) {
                    setHideHeader(true);
                    setMobileMenuOpen(false);
                } else if (currentScrollY < lastScrollY && lastScrollY - currentScrollY > 5) {
                    setHideHeader(false);
                }
            }

            setLastScrollY(currentScrollY);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    // ========== HANDLERS ==========
    const closeMobileMenu = () => setMobileMenuOpen(false);

    const modalActions = {
        openLogin: () => {
            setShowLoginModal(true);
            setShowRegisterModal(false);
        },
        openRegister: () => {
            setShowRegisterModal(true);
            setShowLoginModal(false);
        },
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

    // ========== STYLING ==========
    const headerBg = mobileMenuOpen
        ? 'bg-primary-dark/95 backdrop-blur-md shadow-2xl shadow-black/50'
        : scrolled
            ? 'bg-primary-dark backdrop-blur-md shadow-2xl shadow-black/50'
            : 'bg-transparent';

    return (
        <>
            {/* Floating Hamburger - W TYM SAMYM miejscu co header hamburger */}
            <div
                className={`
                    fixed
                    right-6
                    z-[70]
                    md:hidden
                `}
                style={{
                    top: 'calc(env(safe-area-inset-top) + 1.25rem)'
                }}
            >
                {/* Hamburger z headera - widoczny gdy: header widoczny LUB menu otwarte */}
                <div className={`
                    transition-opacity 
                    duration-300
                    ${!hideHeader || mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                `}>
                    <MobileMenuToggle
                        isOpen={mobileMenuOpen}
                        onToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
                    />
                </div>

                {/* Floating hamburger - widoczny TYLKO gdy: header schowany I menu zamknięte */}
                <div className={`
                    absolute
                    inset-0
                    transition-opacity 
                    duration-300
                    ${hideHeader && !mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
                `}>
                    <MobileMenuToggle
                        isOpen={false}
                        onToggle={() => setMobileMenuOpen(true)}
                    />
                </div>
            </div>

            {/* Main Header */}
            <header
                style={{ paddingTop: 'env(safe-area-inset-top)' }}
                className={`
                    fixed 
                    top-0 
                    left-0 
                    w-full 
                    transition-all 
                    duration-500 
                    ease-out
                    ${headerBg}
                    ${mobileMenuOpen ? 'z-[60]' : 'z-50'}
                    ${showHeader
                    ? (hideHeader && !mobileMenuOpen)
                        ? '-translate-y-full opacity-0'
                        : 'translate-y-0 opacity-100'
                    : '-translate-y-full opacity-0'
                }
                `}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4 lg:py-6">
                        {/* Logo */}
                        <Logo scrolled={scrolled} />

                        {/* Desktop Navigation */}
                        <DesktopNavigation />

                        {/* Desktop Actions - Zawsze po prawej */}
                        <div className="flex items-center gap-4">
                            <HeaderActions
                                cartItemsCount={getTotalItems()}
                                onOpenCart={modalActions.openCart}
                                onOpenLogin={modalActions.openLogin}
                                onLogout={handleLogout}
                            />
                        </div>
                    </div>

                    {/* Mobile Navigation Dropdown */}
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

            {/* Mobile Bottom Navigation */}
            <MobileBottomNavigation
                onOpenCart={modalActions.openCart}
                onOpenLogin={modalActions.openLogin}
                onLogout={handleLogout}
            />

            {/* Modals */}
            <HeaderModals
                loginModal={{
                    isOpen: showLoginModal,
                    onSwitchToRegister: modalActions.openRegister
                }}
                registerModal={{
                    isOpen: showRegisterModal,
                    onSwitchToLogin: modalActions.openLogin
                }}
                cartModal={{
                    isOpen: showCartModal
                }}
                onCloseAll={modalActions.closeAll}
            />
        </>
    );
}

// Export default dla backwards compatibility
export default Header;