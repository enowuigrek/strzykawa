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
                fixed
                left-0
                right-0
                top-[100px]
                bottom-0
                z-[110]
                bg-[#141C18]
                transition-all
                duration-300
                ease-out
                ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
            `}
            id="mobile-menu"
            aria-hidden={!isOpen}
        >
            <nav
                className="flex flex-col h-full px-6 py-8 pb-safe"
                aria-label="Menu mobilne"
            >
                {/* Navigation Links - równomiernie rozłożone */}
                <div className="flex flex-col flex-1">
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

                    {/* Separator */}
                    <div className="border-t border-white/10 my-2" />

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
                </div>
            </nav>
        </div>
    );
}

/**
 * Style dla linków nawigacyjnych mobile
 */
function getMobileNavLinkClasses({ isActive }) {
    return `
        flex-1
        flex
        items-center
        px-4
        text-xl
        text-white
        font-medium
        transition-all
        duration-300
        hover:text-muted
        hover:bg-white/5
        ${isActive ? 'text-muted bg-white/5' : ''}
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
        <>
            {/* Cart - podświetlony gdy otwarty */}
            <button
                onClick={onOpenCart}
                className={`
                    flex-1 flex items-center space-x-3 px-4 text-xl w-full text-left transition-all duration-300
                    ${isCartOpen
                    ? 'bg-cta/20 text-white'
                    : 'text-white hover:bg-white/5'
                }
                `}
                aria-label={`Otwórz koszyk (${cartItemsCount} produktów)`}
            >
                <FaShoppingCart className="w-5 h-5" />
                <span className="flex items-center gap-2">
                    Koszyk
                    {cartItemsCount > 0 && !isCartOpen && (
                        <span className="px-2 py-0.5 bg-success text-white text-sm font-bold rounded-full">
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
                        flex-1 flex items-center space-x-3 px-4 text-xl w-full text-left transition-all duration-300
                        ${isLoginOpen
                        ? 'bg-cta/20 text-white'
                        : 'text-white hover:bg-white/5'
                    }
                    `}
                    aria-label="Zaloguj się"
                >
                    <FaUser className="w-5 h-5" />
                    <span>Zaloguj się</span>
                </button>
            )}
        </>
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
        <>
            {/* Mój profil */}
            <button
                onClick={handleProfileClick}
                className="flex-1 flex items-center space-x-3 px-4 text-xl text-white hover:bg-white/5 w-full text-left transition-all duration-300"
                aria-label="Mój profil"
            >
                <FaUser className="w-5 h-5 text-accent" />
                <span>{user?.firstName}</span>
            </button>

            {/* Wyloguj się */}
            <button
                onClick={handleLogout}
                className="flex-1 flex items-center space-x-3 px-4 text-xl text-red-300 hover:bg-red-500/10 w-full text-left transition-all duration-300"
                aria-label="Wyloguj się"
            >
                <FaSignOutAlt className="w-5 h-5" />
                <span>Wyloguj się</span>
            </button>
        </>
    );
}