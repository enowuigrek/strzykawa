import { NavLink, useNavigate } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useAuthStore } from '../../store/authStore.js';
import { NAV_ITEMS } from '../../constants/navigation.js';
import { useEffect } from 'react';

export function MobileNavigation({
                                     isOpen,
                                     onClose,
                                     cartItemsCount,
                                     isCartOpen,
                                     isLoginOpen,
                                     onOpenCart,
                                     onOpenLogin,
                                     onLogout
                                 }) {
    const { user, isAuthenticated } = useAuthStore();

    // Zamknij menu przy scrollowaniu
    useEffect(() => {
        if (!isOpen) return;

        const handleScroll = () => {
            onClose();
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isOpen, onClose]);

    return (
        <div
            className={`
                md:hidden 
                overflow-hidden 
                transition-all 
                duration-500 
                ease-out
                ${isOpen ? 'max-h-screen opacity-100 pb-6' : 'max-h-0 opacity-0 pb-0'}
            `}
            id="mobile-menu"
            aria-hidden={!isOpen}
        >
            <nav
                className="flex flex-col space-y-4 pt-4 border-t border-white/10"
                aria-label="Menu mobilne"
            >
                {/* Navigation Links */}
                {NAV_ITEMS.map((item) => (
                    <NavLink
                        key={item.to}
                        to={item.to}
                        onClick={onClose}
                        className={getMobileNavLinkClasses}
                        aria-label={item.ariaLabel}
                    >
                        {item.label}
                    </NavLink>
                ))}

                {/* Mobile Auth & Cart Section */}
                <MobileActionsSection
                    cartItemsCount={cartItemsCount}
                    isCartOpen={isCartOpen}
                    isLoginOpen={isLoginOpen}
                    onOpenCart={() => { onOpenCart(); onClose(); }}
                    onOpenLogin={() => { onOpenLogin(); onClose(); }}
                    onLogout={onLogout}
                    onClose={onClose}
                    user={user}
                    isAuthenticated={isAuthenticated}
                />
            </nav>
        </div>
    );
}

/**
 * Style dla linków nawigacyjnych mobile
 */
function getMobileNavLinkClasses({ isActive }) {
    return `
        block 
        px-4 
        py-3 
        text-white 
        font-medium 
        transition-all 
        duration-300
        hover:text-muted 
        hover:bg-white/5 
        hover:translate-x-2
        ${isActive ? 'text-muted bg-white/5 translate-x-2' : ''}
    `;
}

function MobileActionsSection({
                                  cartItemsCount,
                                  isCartOpen,
                                  isLoginOpen,
                                  onOpenCart,
                                  onOpenLogin,
                                  onLogout,
                                  onClose,
                                  user,
                                  isAuthenticated
                              }) {
    return (
        <div className="pt-4 border-t border-white/10 space-y-3">
            {/* Cart - podświetlony gdy otwarty */}
            <button
                onClick={onOpenCart}
                className={`
                    flex items-center space-x-3 px-4 py-3 rounded-full w-full text-left transition-all duration-300
                    ${isCartOpen
                    ? 'bg-cta/20 text-white'
                    : 'text-white hover:bg-white/5'
                }
                `}
                aria-label={`Otwórz koszyk (${cartItemsCount} produktów)`}
            >
                <FaShoppingCart className="w-4 h-4" />
                <span className="flex items-center gap-2">
                    Koszyk
                    {cartItemsCount > 0 && !isCartOpen && (
                        <span className="px-2 py-0.5 bg-success text-white text-xs font-bold rounded-full">
                            {cartItemsCount}
                        </span>
                    )}
                </span>
            </button>

            {/* Auth */}
            {isAuthenticated ? (
                <MobileAuthenticatedUser user={user} onLogout={onLogout} onClose={onClose} />
            ) : (
                <button
                    onClick={onOpenLogin}
                    className={`
                        flex items-center space-x-3 px-4 py-3 rounded-full w-full text-left transition-all duration-300
                        ${isLoginOpen
                        ? 'bg-cta/20 text-white'
                        : 'text-white hover:bg-accent/20'
                    }
                    `}
                    aria-label="Zaloguj się"
                >
                    <FaUser className="w-4 h-4" />
                    <span>Zaloguj się</span>
                </button>
            )}
        </div>
    );
}

/**
 * MobileAuthenticatedUser - Sekcja zalogowanego użytkownika
 */
function MobileAuthenticatedUser({ user, onLogout, onClose }) {
    const navigate = useNavigate();

    const handleProfileClick = () => {
        onClose();
        navigate('/profil');
    };

    const handleLogout = () => {
        onClose();
        onLogout();
    };

    return (
        <div className="space-y-2">
            {/* Mój profil */}
            <button
                onClick={handleProfileClick}
                className="flex items-center space-x-3 px-4 py-3 text-white hover:bg-white/5 rounded-full w-full text-left transition-all duration-300"
                aria-label="Mój profil"
            >
                <FaUser className="w-4 h-4 text-accent" />
                <span>{user?.firstName}</span>
            </button>

            {/* Wyloguj się */}
            <button
                onClick={handleLogout}
                className="flex items-center space-x-3 px-4 py-3 text-red-300 hover:bg-red-500/10 rounded-full w-full text-left transition-all duration-300"
                aria-label="Wyloguj się"
            >
                <FaSignOutAlt className="w-4 h-4" />
                <span>Wyloguj się</span>
            </button>
        </div>
    );
}