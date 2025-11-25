import React from 'react';
import { FaUser, FaShoppingCart, FaSignOutAlt } from 'react-icons/fa';
import { useAuthStore } from '../../store/authStore.js';

export function HeaderActions({ cartItemsCount, onOpenCart, onOpenLogin, onLogout }) {
    const { user, isAuthenticated } = useAuthStore();

    return (
        <div className="hidden md:flex items-center">
            <div className="flex items-center bg-white/10 backdrop-blur-sm border border-white/30 rounded-full px-1 py-1">
                {/* Cart Button */}
                <button
                    onClick={onOpenCart}
                    className="relative px-4 py-2 text-white hover:text-accent transition-all duration-300 hover:scale-105"
                    aria-label="Otwórz koszyk"
                >
                    <FaShoppingCart className="w-4 h-4" />
                    {cartItemsCount > 0 && (
                        <span className="absolute -top-1 -right-1 bg-success text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold animate-pulse">
                            {cartItemsCount}
                        </span>
                    )}
                </button>

                {/* Vertical Divider */}
                <div className="w-px h-6 bg-white/30"></div>

                {/* Auth Section */}
                {isAuthenticated ? (
                    <AuthenticatedUser user={user} onLogout={onLogout} />
                ) : (
                    <LoginButton onOpenLogin={onOpenLogin} />
                )}
            </div>
        </div>
    );
}

function AuthenticatedUser({ user, onLogout }) {
    return (
        <div className="flex items-center">
            <div className="flex items-center space-x-2 px-4 py-2">
                <FaUser className="w-4 h-4 text-accent" />
                <span className="text-white text-sm font-medium">
                    {user?.firstName}
                </span>
            </div>
            <button
                onClick={onLogout}
                className="px-3 py-2 text-white hover:text-red-400 transition-all duration-300 hover:scale-105"
                title="Wyloguj się"
            >
                <FaSignOutAlt className="w-4 h-4" />
            </button>
        </div>
    );
}

function LoginButton({ onOpenLogin }) {
    return (
        <button
            onClick={onOpenLogin}
            className="flex items-center space-x-2 px-4 py-2 text-white hover:text-accent transition-all duration-300 hover:scale-105"
        >
            <FaUser className="w-4 h-4" />
            <span className="text-sm font-medium">Zaloguj się</span>
        </button>
    );
}