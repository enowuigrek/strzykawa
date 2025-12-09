import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { FaHome, FaShoppingCart, FaUser } from 'react-icons/fa';
import { HiShoppingBag } from 'react-icons/hi';
import { useAuthStore } from '../../store/authStore.js';
import { useCartStore } from '../../store/cartStore.js';

export function MobileBottomNavigation({
                                           isCartOpen,
                                           isLoginOpen,
                                           onOpenCart,
                                           onCloseCart,
                                           onOpenLogin,
                                           onCloseLogin,
                                           onLogout
                                       }) {
    const [isVisible, setIsVisible] = useState(false);
    const [hasScrolled, setHasScrolled] = useState(false);
    const { user, isAuthenticated } = useAuthStore();
    const { getTotalItems } = useCartStore();
    const cartItemsCount = getTotalItems();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;

            const distanceFromBottom = documentHeight - (scrollTop + windowHeight);

            if (scrollTop > 10 && !hasScrolled) {
                setHasScrolled(true);
            }

            const shouldShow = hasScrolled && distanceFromBottom > 200;

            setIsVisible(shouldShow);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [hasScrolled]);

    const handleHomeClick = (e) => {
        e.preventDefault();

        // Zamknij wszystkie modale
        if (isCartOpen) onCloseCart();
        if (isLoginOpen) onCloseLogin();

        if (location.pathname === '/') {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        } else {
            navigate('/');
        }
    };

    const handleShopClick = () => {
        // Zamknij wszystkie modale
        if (isCartOpen) onCloseCart();
        if (isLoginOpen) onCloseLogin();
    };

    const handleCartClick = () => {
        // Zamknij login jeśli otwarty
        if (isLoginOpen) onCloseLogin();

        // Toggle koszyka
        if (isCartOpen) {
            onCloseCart();
        } else {
            onOpenCart();
        }
    };

    const handleAuthClick = () => {
        // Zamknij koszyk jeśli otwarty
        if (isCartOpen) onCloseCart();

        if (isAuthenticated) {
            onLogout();
        } else {
            // Toggle login
            if (isLoginOpen) {
                onCloseLogin();
            } else {
                onOpenLogin();
            }
        }
    };

    const isHome = location.pathname === '/';
    const isAnyModalOpen = isCartOpen || isLoginOpen;

    return (
        <div className={`md:hidden fixed bottom-0 left-0 right-0 z-[100] mobile-bottom-nav transition-transform duration-300 ease-out ${isVisible ? 'visible' : 'translate-y-28'}`}>
            {/* Blur fade-out rectangle - od połowy wysokości nav bar do dołu ekranu */}
            <div
                className="pointer-events-none absolute inset-x-0 bottom-0 h-16  backdrop-blur-md"
                style={{
                    background: 'linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.3) 100%)',
                    paddingBottom: 'max(env(safe-area-inset-bottom), 16px)'
                }}
            />

            {/* Safe area padding - większy padding od dołu */}
            <div style={{ paddingBottom: 'max(env(safe-area-inset-bottom), 16px)' }} className="relative z-10">
                <div className="pointer-events-auto flex items-center justify-between rounded-full bg-primary-dark/95 shadow-lg backdrop-blur-md px-3 py-1.5">

                    {/* Home - NIE podświetlony gdy JAKIKOLWIEK modal otwarty */}
                    <button
                        onClick={handleHomeClick}
                        className={`flex flex-col items-center gap-1 px-2.5 py-1.5 rounded-full transition-all duration-300 ${
                            (isHome && !isAnyModalOpen) ? 'text-white' : 'text-white/70'
                        }`}
                    >
                        <div
                            className={`flex items-center justify-center w-8 h-8 rounded-full border border-white/15 ${
                                (isHome && !isAnyModalOpen) ? 'bg-cta shadow-md' : 'bg-white/5'
                            }`}
                        >
                            <FaHome className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] leading-none">Strona główna</span>
                    </button>

                    {/* Sklep - NIE podświetlony gdy JAKIKOLWIEK modal otwarty */}
                    <NavLink to="/kawy" onClick={handleShopClick}>
                        {({ isActive }) => (
                            <div
                                className={`flex flex-col items-center gap-1 px-2.5 py-1.5 rounded-full transition-all duration-300 ${
                                    (isActive && !isAnyModalOpen) ? 'text-white' : 'text-white/70'
                                }`}
                            >
                                <div
                                    className={`flex items-center justify-center w-8 h-8 rounded-full border border-white/15 ${
                                        (isActive && !isAnyModalOpen) ? 'bg-cta shadow-md' : 'bg-white/5'
                                    }`}
                                >
                                    <HiShoppingBag className="w-4 h-4" />
                                </div>
                                <span className="text-[10px] leading-none">Sklep</span>
                            </div>
                        )}
                    </NavLink>

                    {/* Koszyk - ZAWSZE podświetlony gdy otwarty */}
                    <button
                        onClick={handleCartClick}
                        className={`relative flex flex-col items-center gap-1 px-2.5 py-1.5 rounded-full transition-all duration-300 ${
                            isCartOpen ? 'text-white' : 'text-white/70'
                        }`}
                    >
                        <div
                            className={`
                                relative flex items-center justify-center w-8 h-8 rounded-full border border-white/15 transition-all duration-300
                                ${isCartOpen
                                ? 'bg-cta shadow-md'
                                : cartItemsCount > 0
                                    ? 'bg-success/20 text-success'
                                    : 'bg-white/5'
                            }
                            `}
                        >
                            <FaShoppingCart className="w-4 h-4" />
                            {cartItemsCount > 0 && !isCartOpen && (
                                <span className="absolute -top-1.5 -right-1.5 bg-success text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold shadow-md">
                                    {cartItemsCount}
                                </span>
                            )}
                        </div>
                        <span className="text-[10px] leading-none">Koszyk</span>
                    </button>

                    {/* Profil/Login - podświetlony gdy login modal otwarty */}
                    <button
                        onClick={handleAuthClick}
                        className={`relative flex flex-col items-center gap-1 px-2.5 py-1.5 rounded-full transition-all duration-300 ${
                            isLoginOpen ? 'text-white' : 'text-white/70'
                        }`}
                    >
                        <div
                            className={`
                                relative flex items-center justify-center w-8 h-8 rounded-full border border-white/15
                                ${isLoginOpen
                                ? 'bg-cta shadow-md'
                                : isAuthenticated
                                    ? 'bg-success/20 text-success'
                                    : 'bg-white/5 text-white/70'
                            }
                            `}
                        >
                            <FaUser className="w-4 h-4" />
                            {isAuthenticated && !isLoginOpen && (
                                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-success rounded-full border border-primary-dark"></span>
                            )}
                        </div>
                        <span className="text-[10px] leading-none">
                            {isAuthenticated ? 'Konto' : 'Zaloguj'}
                        </span>
                    </button>

                </div>
            </div>
        </div>
    );
}