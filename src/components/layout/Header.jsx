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
    const [showQuickAddModal, setShowQuickAddModal] = useState(false);
    const [quickAddCoffee, setQuickAddCoffee] = useState(null);
    const [cartBouncing, setCartBouncing] = useState(false);

    // ========== STORES ==========
    const { logout } = useAuthStore();
    const { getTotalItems } = useCartStore();

    // ========== SCROLL DETECTION + AUTO-HIDE ==========
    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Kolorowanie po 100px
            setScrolled(currentScrollY > 100);

            // Blisko góry strony — ZAWSZE pokazuj header
            if (currentScrollY <= 300 || mobileMenuOpen) {
                setHideHeader(false);
                setLastScrollY(currentScrollY);
                return;
            }

            // Sprawdź czy footer jest widoczny na ekranie
            const footer = document.querySelector('footer');
            if (footer) {
                const footerRect = footer.getBoundingClientRect();
                const isFooterVisible = footerRect.top < window.innerHeight;

                if (isFooterVisible) {
                    setHideHeader(true);
                    setLastScrollY(currentScrollY);
                    return;
                }
            }

            // Auto-hide po 300px
            if (currentScrollY > lastScrollY) {
                // Scrollujemy w dół - ukryj header
                setHideHeader(true);
            } else if (currentScrollY < lastScrollY) {
                // Scrollujemy w górę - pokaż header
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
            setShowQuickAddModal(false);
        };

        window.addEventListener('openCart', handleOpenCart);
        return () => window.removeEventListener('openCart', handleOpenCart);
    }, []);

    // ========== CART BOUNCE ANIMATION EVENT ==========
    useEffect(() => {
        const handleCartBounce = () => {
            setCartBouncing(true);
            setTimeout(() => setCartBouncing(false), 1100);
        };

        window.addEventListener('cartBounce', handleCartBounce);
        return () => window.removeEventListener('cartBounce', handleCartBounce);
    }, []);

    // ========== GLOBAL QUICK ADD OPEN EVENT ==========
    useEffect(() => {
        const handleOpenQuickAdd = (event) => {
            const coffee = event.detail?.coffee;
            if (coffee) {
                setQuickAddCoffee(coffee);
                setShowQuickAddModal(true);
                setShowCartModal(false);
                setShowLoginModal(false);
                setShowRegisterModal(false);
            }
        };

        window.addEventListener('openQuickAdd', handleOpenQuickAdd);
        return () => window.removeEventListener('openQuickAdd', handleOpenQuickAdd);
    }, []);

    // ========== HANDLERS ==========
    const closeMobileMenu = () => setMobileMenuOpen(false);

    const modalActions = {
        openLogin: () => {
            setShowLoginModal(true);
            setShowRegisterModal(false);
            setShowCartModal(false);
            setShowQuickAddModal(false);
        },
        openRegister: () => {
            setShowRegisterModal(true);
            setShowLoginModal(false);
            setShowCartModal(false);
            setShowQuickAddModal(false);
        },
        openCart: () => {
            setShowCartModal(true);
            setShowLoginModal(false);
            setShowRegisterModal(false);
            setShowQuickAddModal(false);
        },
        closeCart: () => setShowCartModal(false),
        closeLogin: () => setShowLoginModal(false),
        closeQuickAdd: () => {
            setShowQuickAddModal(false);
            setQuickAddCoffee(null);
        },
        closeAll: () => {
            setShowLoginModal(false);
            setShowRegisterModal(false);
            setShowCartModal(false);
            setShowQuickAddModal(false);
        }
    };

    const handleLogout = () => {
        logout();
        closeMobileMenu();
        modalActions.closeAll();
    };

    // ========== FORCE SHOW HEADER WHEN MENU/MODAL OPEN ==========
    useEffect(() => {
        if (mobileMenuOpen || showCartModal || showLoginModal || showRegisterModal || showQuickAddModal) {
            setHideHeader(false);
        }
    }, [mobileMenuOpen, showCartModal, showLoginModal, showRegisterModal, showQuickAddModal]);

    // ========== STYLING ==========
    // Sprawdź czy JAKIKOLWIEK modal jest otwarty
    const anyModalOpen = showCartModal || showLoginModal || showRegisterModal || showQuickAddModal;

    const headerBg = mobileMenuOpen || anyModalOpen
        ? 'bg-primary-dark backdrop-blur-md shadow-2xl shadow-black/50'
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
                                isOpen={mobileMenuOpen || showCartModal || showLoginModal || showRegisterModal || showQuickAddModal}
                                onToggle={() => {
                                    // Jeśli header jest ukryty, pokaż go
                                    if (hideHeader) {
                                        setHideHeader(false);
                                        setMobileMenuOpen(true);
                                        return;
                                    }
                                    // Jeśli jakikolwiek modal otwarty, zamknij go zamiast otwierać hamburger
                                    if (showCartModal) {
                                        modalActions.closeCart();
                                    } else if (showLoginModal) {
                                        modalActions.closeLogin();
                                    } else if (showRegisterModal) {
                                        modalActions.closeAll();
                                    } else if (showQuickAddModal) {
                                        modalActions.closeQuickAdd();
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
                                cartBouncing={cartBouncing}
                            />
                        </div>
                    </div>

                </div>
            </header>

            {/* Mobile Navigation Fullscreen - OUTSIDE header */}
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

            {/* Mobile Bottom Navigation */}
            <MobileBottomNavigation
                isCartOpen={showCartModal}
                isLoginOpen={showLoginModal}
                isMobileMenuOpen={mobileMenuOpen}
                onOpenCart={modalActions.openCart}
                onCloseCart={modalActions.closeCart}
                onOpenLogin={modalActions.openLogin}
                onCloseLogin={modalActions.closeLogin}
                onCloseMobileMenu={closeMobileMenu}
                onLogout={handleLogout}
                cartBouncing={cartBouncing}
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
                quickAddModal={{
                    isOpen: showQuickAddModal,
                    coffee: quickAddCoffee
                }}
                onCloseCart={modalActions.closeCart}
                onCloseLogin={modalActions.closeLogin}
                onCloseQuickAdd={modalActions.closeQuickAdd}
                onCloseAll={modalActions.closeAll}
            />
        </>
    );
}

// Export default dla backwards compatibility
export default Header;