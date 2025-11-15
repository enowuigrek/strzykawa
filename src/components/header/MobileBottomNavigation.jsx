import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaHome, FaShoppingCart, FaUser } from 'react-icons/fa';
import { HiShoppingBag } from 'react-icons/hi';
import { useAuthStore } from '../../store/authStore.js';
import { useCartStore } from '../../store/cartStore.js';

export function MobileBottomNavigation({
                                           onOpenCart,
                                           onOpenLogin,
                                           onLogout
                                       }) {
    const [isVisible, setIsVisible] = useState(false);
    const { user, isAuthenticated } = useAuthStore();
    const { getTotalItems } = useCartStore();
    const cartItemsCount = getTotalItems();

    // Show navigation when user starts scrolling
    useEffect(() => {
        const handleScroll = () => {
            const scrolled = window.scrollY > 10; // Show after 10px scroll
            setIsVisible(scrolled);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        // Check initial state
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    const handleAuthClick = () => {
        if (isAuthenticated) {
            onLogout();
        } else {
            onOpenLogin();
        }
    };

    return (
        <div className={`md:hidden fixed bottom-0 left-0 right-0 z-40 mobile-bottom-nav transition-transform duration-300 ease-out ${isVisible ? 'visible' : 'translate-y-28'}`}>
            {/* Safe area padding for devices with bottom indicators */}
            <div style={{ paddingBottom: 'env(safe-area-inset-bottom)' }} className="px-4 pb-3">
                <div className="pointer-events-auto flex items-center justify-between rounded-full bg-primary-dark/95 border border-white/15 shadow-lg backdrop-blur-md px-4 py-2">

                    {/* Strzykawa logo / Home */}
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `flex flex-col items-center gap-1 px-3 py-2 rounded-full transition-all duration-300 ${
                                isActive ? 'text-white' : 'text-white/70'
                            }`
                        }
                    >
                        <div
                            className={`
                                flex items-center justify-center w-9 h-9 rounded-full border border-white/15 bg-white/5
                                ${''}
                            `}
                        >
                            <FaHome className="w-5 h-5" />
                        </div>
                        <span className="text-[11px] leading-none">Home</span>
                    </NavLink>

                    {/* Sklep */}
                    <NavLink to="/kawy">
                        {({ isActive }) => (
                            <div
                                className={`flex flex-col items-center gap-1 px-3 py-2 rounded-full transition-all duration-300 ${
                                    isActive ? 'text-white' : 'text-white/70'
                                }`}
                            >
                                <div
                                    className={`flex items-center justify-center w-9 h-9 rounded-full border border-white/15 ${
                                        isActive ? 'bg-cta shadow-md' : 'bg-white/5'
                                    }`}
                                >
                                    <HiShoppingBag className="w-5 h-5" />
                                </div>
                                <span className="text-[11px] leading-none">Sklep</span>
                            </div>
                        )}
                    </NavLink>

                    {/* Koszyk */}
                    <button
                        onClick={onOpenCart}
                        className="relative flex flex-col items-center gap-1 px-3 py-2 rounded-full transition-all duration-200 active:scale-95"
                    >
                        <div
                            className={`
                                relative flex items-center justify-center w-9 h-9 rounded-full border border-white/15
                                ${cartItemsCount > 0 ? 'bg-success/20 text-success' : 'bg-white/5 text-white/70'}
                            `}
                        >
                            <FaShoppingCart className="w-5 h-5" />
                            {cartItemsCount > 0 && (
                                <span className="absolute -top-2 -right-2 bg-success text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold shadow-md">
                                    {cartItemsCount}
                                </span>
                            )}
                        </div>
                        <span className="text-[11px] leading-none">Koszyk</span>
                    </button>

                    {/* Profil/Login */}
                    <button
                        onClick={handleAuthClick}
                        className="relative flex flex-col items-center gap-1 px-3 py-2 rounded-full transition-all duration-200 active:scale-95"
                    >
                        <div
                            className={`
                                relative flex items-center justify-center w-9 h-9 rounded-full border border-white/15
                                ${isAuthenticated ? 'bg-success/20 text-success' : 'bg-white/5 text-white/70'}
                            `}
                        >
                            <FaUser className="w-5 h-5" />
                            {/* Zielona kropka gdy zalogowany */}
                            {isAuthenticated && (
                                <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-success rounded-full border border-primary-dark"></span>
                            )}
                        </div>
                        <span className="text-[11px] leading-none">
                            {isAuthenticated ? 'Konto' : 'Zaloguj'}
                        </span>
                    </button>

                </div>
            </div>
        </div>
    );
}