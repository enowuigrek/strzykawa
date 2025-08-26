import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { FaUser, FaShoppingCart, FaSignOutAlt } from 'react-icons/fa';
import { useAuthStore } from '../store/authStore.js';
import { useCartStore } from '../store/cartStore.js';
import { LoginModal } from './LoginModal.jsx';
import { RegisterModal } from './RegisterModal.jsx';
import { CartModal } from './CartModal.jsx';

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    // Modal states
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);
    const [showCartModal, setShowCartModal] = useState(false);

    // Auth & Cart stores
    const { user, isAuthenticated, logout } = useAuthStore();
    const { getTotalItems } = useCartStore();

    const cartItemsCount = getTotalItems();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Close mobile menu when clicking link
    const closeMobileMenu = () => setMobileMenuOpen(false);

    // Modal handlers
    const openLoginModal = () => {
        setShowLoginModal(true);
        setShowRegisterModal(false);
    };

    const openRegisterModal = () => {
        setShowRegisterModal(true);
        setShowLoginModal(false);
    };

    const closeAllModals = () => {
        setShowLoginModal(false);
        setShowRegisterModal(false);
        setShowCartModal(false);
    };

    const handleLogout = () => {
        logout();
        closeMobileMenu();
    };

    return (
        <>
            <header className={`
                fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-out
                ${scrolled
                ? 'bg-primary-dark/95 backdrop-blur-md shadow-2xl border-b border-white/10'
                : 'bg-transparent'
            }
            `}>
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="flex justify-between items-center py-4">

                        {/* Logo/Brand */}
                        <div className="relative group">
                            {scrolled && (
                                <div className="text-2xl sm:text-3xl text-white tracking-wide">
                                    S T R Z Y K A W A
                                </div>
                            )}
                            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-muted to-accent transition-all duration-300 group-hover:w-full"></div>
                        </div>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center space-x-8">
                            <NavLink
                                to="/"
                                className={({ isActive }) => `
                                    relative px-4 py-2 text-white font-medium transition-all duration-300
                                    hover:text-muted hover:scale-105
                                    ${isActive ? 'text-muted' : ''}
                                    after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 
                                    after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-muted after:to-accent 
                                    after:transition-all after:duration-300
                                    hover:after:w-full
                                    ${isActive ? 'after:w-full' : ''}
                                `}
                            >
                                Start
                            </NavLink>
                            <NavLink
                                to="/o-nas"
                                className={({ isActive }) => `
                                    relative px-4 py-2 text-white font-medium transition-all duration-300
                                    hover:text-muted hover:scale-105
                                    ${isActive ? 'text-muted' : ''}
                                    after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 
                                    after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-muted after:to-accent 
                                    after:transition-all after:duration-300
                                    hover:after:w-full
                                    ${isActive ? 'after:w-full' : ''}
                                `}
                            >
                                O Strzykawie
                            </NavLink>
                            <NavLink
                                to="/kawy"
                                className={({ isActive }) => `
                                    relative px-4 py-2 text-white font-medium transition-all duration-300
                                    hover:text-muted hover:scale-105
                                    ${isActive ? 'text-muted' : ''}
                                    after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 
                                    after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-muted after:to-accent 
                                    after:transition-all after:duration-300
                                    hover:after:w-full
                                    ${isActive ? 'after:w-full' : ''}
                                `}
                            >
                                Nasze kawy
                            </NavLink>
                            <NavLink
                                to="/dostepne-w-kawiarni"
                                className={({ isActive }) => `
                                    relative px-4 py-2 text-white font-medium transition-all duration-300
                                    hover:text-muted hover:scale-105
                                    ${isActive ? 'text-muted' : ''}
                                    after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 
                                    after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-muted after:to-accent 
                                    after:transition-all after:duration-300
                                    hover:after:w-full
                                    ${isActive ? 'after:w-full' : ''}
                                `}
                            >
                                Dostępne w kawiarni
                            </NavLink>
                            <a
                                href="/kontakt"
                                className="
                                    relative px-4 py-2 text-white font-medium transition-all duration-300
                                    hover:text-muted hover:scale-105
                                    after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2
                                    after:w-0 after:h-0.5 after:bg-gradient-to-r after:from-muted after:to-accent
                                    after:transition-all after:duration-300
                                    hover:after:w-full
                                "
                            >
                                Kontakt
                            </a>
                        </nav>

                        {/* Desktop Auth & Cart Actions */}
                        <div className="hidden md:flex items-center space-x-4">

                            {/* Cart Button */}
                            <button
                                onClick={() => setShowCartModal(true)}
                                className="relative p-3 text-white hover:text-accent transition-all duration-300 hover:scale-110"
                                aria-label="Otwórz koszyk"
                            >
                                <FaShoppingCart className="w-5 h-5" />
                                {cartItemsCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-accent text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold animate-pulse">
                                        {cartItemsCount}
                                    </span>
                                )}
                            </button>

                            {/* Auth Section */}
                            {isAuthenticated ? (
                                <div className="flex items-center space-x-3">
                                    <div className="flex items-center space-x-2 px-3 py-2 bg-white/10 rounded-full">
                                        <FaUser className="w-4 h-4 text-accent" />
                                        <span className="text-white text-sm font-medium">
                                            {user?.firstName}
                                        </span>
                                    </div>
                                    <button
                                        onClick={handleLogout}
                                        className="p-2 text-white hover:text-red-400 transition-all duration-300 hover:scale-110"
                                        title="Wyloguj się"
                                    >
                                        <FaSignOutAlt className="w-4 h-4" />
                                    </button>
                                </div>
                            ) : (
                                <button
                                    onClick={openLoginModal}
                                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-accent to-muted hover:from-muted hover:to-accent text-white font-semibold transition-all duration-300 hover:scale-105 rounded-full"
                                >
                                    <FaUser className="w-4 h-4" />
                                    <span>Zaloguj się</span>
                                </button>
                            )}
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center group"
                            aria-label="Toggle mobile menu"
                        >
                            <span className={`
                                block w-6 h-0.5 bg-white transition-all duration-300 ease-out
                                ${mobileMenuOpen ? 'rotate-45 translate-y-1' : 'translate-y-0'}
                            `}></span>
                            <span className={`
                                block w-6 h-0.5 bg-white transition-all duration-300 ease-out mt-1
                                ${mobileMenuOpen ? 'opacity-0' : 'opacity-100'}
                            `}></span>
                            <span className={`
                                block w-6 h-0.5 bg-white transition-all duration-300 ease-out mt-1
                                ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : 'translate-y-0'}
                            `}></span>
                        </button>
                    </div>

                    {/* Mobile Navigation */}
                    <div className={`
                        md:hidden overflow-hidden transition-all duration-500 ease-out
                        ${mobileMenuOpen ? 'max-h-96 opacity-100 pb-6' : 'max-h-0 opacity-0 pb-0'}
                    `}>
                        <nav className="flex flex-col space-y-4 pt-4 border-t border-white/10">
                            <NavLink
                                to="/"
                                onClick={closeMobileMenu}
                                className={({ isActive }) => `
                                    block px-4 py-3 text-white font-medium transition-all duration-300
                                    hover:text-muted hover:bg-white/5 rounded-lg hover:translate-x-2
                                    ${isActive ? 'text-muted bg-white/5 translate-x-2' : ''}
                                `}
                            >
                                Start
                            </NavLink>
                            <NavLink
                                to="/kawy"
                                onClick={closeMobileMenu}
                                className={({ isActive }) => `
                                    block px-4 py-3 text-white font-medium transition-all duration-300
                                    hover:text-muted hover:bg-white/5 rounded-lg hover:translate-x-2
                                    ${isActive ? 'text-muted bg-white/5 translate-x-2' : ''}
                                `}
                            >
                                Nasze kawy
                            </NavLink>
                            <NavLink
                                to="/dostepne-w-kawiarni"
                                onClick={closeMobileMenu}
                                className={({ isActive }) => `
                                    block px-4 py-3 text-white font-medium transition-all duration-300
                                    hover:text-muted hover:bg-white/5 rounded-lg hover:translate-x-2
                                    ${isActive ? 'text-muted bg-white/5 translate-x-2' : ''}
                                `}
                            >
                                Dostępne w kawiarni
                            </NavLink>
                            <a
                                href="#kontakt"
                                onClick={closeMobileMenu}
                                className="
                                    block px-4 py-3 text-white font-medium transition-all duration-300
                                    hover:text-muted hover:bg-white/5 rounded-lg hover:translate-x-2
                                "
                            >
                                Kontakt
                            </a>

                            {/* Mobile Auth & Cart */}
                            <div className="pt-4 border-t border-white/10 space-y-3">
                                {/* Cart */}
                                <button
                                    onClick={() => {
                                        setShowCartModal(true);
                                        closeMobileMenu();
                                    }}
                                    className="flex items-center space-x-3 px-4 py-3 text-white hover:bg-white/5 rounded-lg w-full text-left"
                                >
                                    <FaShoppingCart className="w-4 h-4" />
                                    <span>Koszyk ({cartItemsCount})</span>
                                </button>

                                {/* Auth */}
                                {isAuthenticated ? (
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-3 px-4 py-3 bg-white/5 rounded-lg">
                                            <FaUser className="w-4 h-4 text-accent" />
                                            <span className="text-white">{user?.firstName} {user?.lastName}</span>
                                        </div>
                                        <button
                                            onClick={handleLogout}
                                            className="flex items-center space-x-3 px-4 py-3 text-red-300 hover:bg-red-500/10 rounded-lg w-full text-left"
                                        >
                                            <FaSignOutAlt className="w-4 h-4" />
                                            <span>Wyloguj się</span>
                                        </button>
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => {
                                            openLoginModal();
                                            closeMobileMenu();
                                        }}
                                        className="flex items-center space-x-3 px-4 py-3 text-white hover:bg-accent/20 rounded-lg w-full text-left"
                                    >
                                        <FaUser className="w-4 h-4" />
                                        <span>Zaloguj się</span>
                                    </button>
                                )}
                            </div>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Modals */}
            <LoginModal
                isOpen={showLoginModal}
                onClose={closeAllModals}
                onSwitchToRegister={openRegisterModal}
            />
            <RegisterModal
                isOpen={showRegisterModal}
                onClose={closeAllModals}
                onSwitchToLogin={openLoginModal}
            />
            <CartModal
                isOpen={showCartModal}
                onClose={closeAllModals}
            />
        </>
    );
}