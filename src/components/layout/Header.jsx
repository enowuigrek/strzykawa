import { useEffect, useState } from "react";
import { useAuthStore } from '../../store/authStore.js';
import { useCartStore } from '../../store/cartStore.js';
import { HEADER } from '../../constants/layout.js';
import { Logo } from '../atoms/Logo.jsx';
import { DesktopNavigation } from '../header/DesktopNavigation.jsx';
import { MobileNavigation } from '../header/MobileNavigation.jsx';
import { HeaderActions } from '../header/HeaderActions.jsx';
import { MobileMenuToggle } from '../atoms/MobileMenuToggle.jsx';
import { HeaderModals } from '../header/HeaderModals.jsx';
import { MobileBottomNavigation } from '../header/MobileBottomNavigation.jsx';

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

    // ========== SCROLL DETECTION + AUTO-HIDE ==========
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Kolorowanie po 100px
            setScrolled(currentScrollY > 100);

            // ✨ Sprawdź czy footer jest widoczny na ekranie
            const footer = document.querySelector('footer');
            if (footer) {
                const footerRect = footer.getBoundingClientRect();
                // Jeśli górna krawędź footera jest widoczna (mniej niż wysokość okna)
                const isFooterVisible = footerRect.top < window.innerHeight;

                if (isFooterVisible) {
                    // Footer widoczny - ZAWSZE ukryj header (bo footer ma te same opcje + logo)
                    setHideHeader(true);
                    setLastScrollY(currentScrollY);
                    return;
                }
            }

            // Auto-hide po 300px (jak scroll w dół)
            // ALE: NIE chowaj headera gdy hamburger jest otwarty
            if (currentScrollY > 300 && !mobileMenuOpen) {
                // Scrollujemy w dół - ukryj header
                if (currentScrollY > lastScrollY) {
                    setHideHeader(true);
                }
                // Scrollujemy w górę - pokaż header
                else if (currentScrollY < lastScrollY) {
                    setHideHeader(false);
                }
            } else {
                // Poniżej 300px LUB hamburger otwarty - zawsze pokazuj
                setHideHeader(false);
            }

            setLastScrollY(currentScrollY);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY, mobileMenuOpen]);

    // ========== GLOBAL CART OPEN EVENT ==========
    useEffect(() => {
        const handleOpenCart = () => {
            setShowCartModal(true);
            setShowLoginModal(false);
            setShowRegisterModal(false);
        };

        window.addEventListener('openCart', handleOpenCart);
        return () => window.removeEventListener('openCart', handleOpenCart);
    }, []);

    // ========== HANDLERS ==========
    const closeMobileMenu = () => setMobileMenuOpen(false);

    const modalActions = {
        openLogin: () => {
            setShowLoginModal(true);
            setShowRegisterModal(false);
            setShowCartModal(false);
        },
        openRegister: () => {
            setShowRegisterModal(true);
            setShowLoginModal(false);
            setShowCartModal(false);
        },
        openCart: () => {
            setShowCartModal(true);
            setShowLoginModal(false);
            setShowRegisterModal(false);
        },
        closeCart: () => setShowCartModal(false),
        closeLogin: () => setShowLoginModal(false),
        closeAll: () => {
            setShowLoginModal(false);
            setShowRegisterModal(false);
            setShowCartModal(false);
        }
    };

    const handleLogout = () => {
        logout();
        closeMobileMenu();
        modalActions.closeAll();
    };

    // ========== STYLING ==========
    const headerBg = mobileMenuOpen
        ? 'bg-primary-dark/95 backdrop-blur-md shadow-2xl shadow-black/50'
        : scrolled
            ? 'bg-primary-dark backdrop-blur-md shadow-2xl shadow-black/50'
            : 'bg-transparent';

    return (
        <>
            {/* Mobile Hamburger Toggle - ukrywa się gdy footer widoczny (żeby nie wchodzić na logo) */}
            <div
                className={`
                    md:hidden
                    fixed
                    z-[150]
                    w-full
                    pointer-events-none
                    transition-all
                    duration-500
                    ease-out
                    ${hideHeader ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}
                `}
                style={{
                    top: 'calc(env(safe-area-inset-top, 0px))'
                }}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative flex justify-between items-center h-[100px]">
                        <div /> {/* Spacer dla justify-between */}
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-auto">
                            <MobileMenuToggle
                                isOpen={mobileMenuOpen || showCartModal}
                                onToggle={() => {
                                    // Jeśli koszyk otwarty, zamknij koszyk zamiast otwierać hamburger
                                    if (showCartModal) {
                                        modalActions.closeCart();
                                    } else {
                                        setMobileMenuOpen(!mobileMenuOpen);
                                    }
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Header - ALWAYS VISIBLE */}
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
                    ${mobileMenuOpen ? HEADER.Z_INDEX_MENU_OPEN : HEADER.Z_INDEX}
                    ${hideHeader ? '-translate-y-full opacity-0' : 'translate-y-0 opacity-100'}
                `}
            >
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="relative flex justify-between items-center h-[100px] lg:h-[120px]">
                        {/* Logo */}
                        <Logo scrolled={scrolled} />

                        {/* Desktop Navigation */}
                        <DesktopNavigation />

                        {/* Desktop Actions */}
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
                        isCartOpen={showCartModal}
                        isLoginOpen={showLoginModal}
                        onOpenCart={modalActions.openCart}
                        onOpenLogin={modalActions.openLogin}
                        onLogout={handleLogout}
                    />
                </div>
            </header>

            {/* Mobile Bottom Navigation */}
            <MobileBottomNavigation
                isCartOpen={showCartModal}
                isLoginOpen={showLoginModal}
                onOpenCart={modalActions.openCart}
                onCloseCart={modalActions.closeCart}
                onOpenLogin={modalActions.openLogin}
                onCloseLogin={modalActions.closeLogin}
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
                onCloseCart={modalActions.closeCart}
                onCloseLogin={modalActions.closeLogin}
                onCloseAll={modalActions.closeAll}
            />
        </>
    );
}

// Export default dla backwards compatibility
export default Header;