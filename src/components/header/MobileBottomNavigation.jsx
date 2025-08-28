import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaHome, FaShoppingCart, FaMapMarkerAlt, FaUser } from 'react-icons/fa';
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
            const scrolled = window.scrollY > 100; // Show after 100px scroll
            setIsVisible(scrolled);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        // Check initial state
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const openDirections = () => {
        const address = encodeURIComponent('ul. Dąbrowskiego 4, 42-200 Częstochowa');
        window.open(`https://www.google.com/maps/dir/?api=1&destination=Strzykawa`, '_blank');
    };

    const handleAuthClick = () => {
        if (isAuthenticated) {
            onLogout();
        } else {
            onOpenLogin();
        }
    };

    return (
        <div className={`md:hidden fixed bottom-0 left-0 right-0 z-40 bg-primary-dark/95 backdrop-blur-md border-t border-white/10 mobile-bottom-nav ${isVisible ? 'visible' : ''}`}>
            {/* Safe area padding for devices with bottom indicators */}
            <div style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}>
                <div className="flex items-center justify-around px-2 py-2">

                    {/* Home */}
                    <NavLink
                        to="/"
                        className={({ isActive }) => `
                            flex items-center justify-center p-3 transition-all duration-300 rounded-lg
                            ${isActive ? 'mobile-nav-active' : 'text-white/70'}
                        `}
                    >
                        <FaHome className="w-5 h-5" />
                    </NavLink>

                    {/* Sklep */}
                    <NavLink
                        to="/kawy"
                        className={({ isActive }) => `
                            flex items-center justify-center p-3 transition-all duration-300 rounded-lg
                            ${isActive ? 'mobile-nav-active' : 'text-white/70'}
                        `}
                    >
                        <HiShoppingBag className="w-5 h-5" />
                    </NavLink>

                    {/* Koszyk - środek, większy, bez ramki */}
                    <button
                        onClick={onOpenCart}
                        className="relative flex items-center justify-center p-4 transition-all duration-200 active:scale-95 rounded-lg"
                    >
                        <FaShoppingCart className="w-6 h-6 text-white/70" />
                        {cartItemsCount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                                {cartItemsCount}
                            </span>
                        )}
                    </button>

                    {/* Lokalizacja */}
                    <button
                        onClick={openDirections}
                        className="flex items-center justify-center p-3 text-white/70 transition-all duration-200 active:scale-95 rounded-lg"
                    >
                        <FaMapMarkerAlt className="w-5 h-5" />
                    </button>

                    {/* Profil/Login */}
                    <button
                        onClick={handleAuthClick}
                        className={`
                            relative flex items-center justify-center p-3 transition-all duration-200 active:scale-95 rounded-lg
                            ${isAuthenticated ? 'text-green-400' : 'text-white/70'}
                        `}
                    >
                        <FaUser className="w-5 h-5" />
                        {/* Zielona kropka gdy zalogowany */}
                        {isAuthenticated && (
                            <span className="absolute -top-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border border-primary-dark"></span>
                        )}
                    </button>

                </div>
            </div>
        </div>
    );
}