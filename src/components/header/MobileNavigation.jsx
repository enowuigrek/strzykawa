import { NavLink } from 'react-router-dom';
import { FaShoppingCart, FaUser, FaSignOutAlt } from 'react-icons/fa';
import { useAuthStore } from '../../store/authStore.js';
import { NAV_ITEMS } from '../../constants/navigation.js';

/**
 * MobileNavigation - Mobile dropdown menu
 *
 * Rozwijane menu dla urządzeń mobile z:
 * - Linkami nawigacyjnymi
 * - Koszykiem
 * - Auth (login/logout)
 *
 * @param {boolean} isOpen - Czy menu jest otwarte
 * @param {function} onClose - Handler zamknięcia menu
 * @param {number} cartItemsCount - Liczba produktów w koszyku
 * @param {function} onOpenCart - Handler otwarcia koszyka
 * @param {function} onOpenLogin - Handler otwarcia modalu logowania
 * @param {function} onLogout - Handler wylogowania
 */
export function MobileNavigation({
                                     isOpen,
                                     onClose,
                                     cartItemsCount,
                                     onOpenCart,
                                     onOpenLogin,
                                     onLogout
                                 }) {
    const { user, isAuthenticated } = useAuthStore();

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
                    onOpenCart={() => { onOpenCart(); onClose(); }}
                    onOpenLogin={() => { onOpenLogin(); onClose(); }}
                    onLogout={onLogout}
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
        rounded-lg 
        hover:translate-x-2
        focus:outline-none
        focus:ring-2
        focus:ring-accent
        ${isActive ? 'text-muted bg-white/5 translate-x-2' : ''}
    `;
}

/**
 * MobileActionsSection - Cart i Auth dla mobile
 */
function MobileActionsSection({
                                  cartItemsCount,
                                  onOpenCart,
                                  onOpenLogin,
                                  onLogout,
                                  user,
                                  isAuthenticated
                              }) {
    return (
        <div className="pt-4 border-t border-white/10 space-y-3">
            {/* Cart */}
            <button
                onClick={onOpenCart}
                className="flex items-center space-x-3 px-4 py-3 text-white hover:bg-white/5 rounded-lg w-full text-left transition-all duration-300"
                aria-label={`Otwórz koszyk (${cartItemsCount} produktów)`}
            >
                <FaShoppingCart className="w-4 h-4" />
                <span>Koszyk ({cartItemsCount})</span>
            </button>

            {/* Auth */}
            {isAuthenticated ? (
                <MobileAuthenticatedUser user={user} onLogout={onLogout} />
            ) : (
                <button
                    onClick={onOpenLogin}
                    className="flex items-center space-x-3 px-4 py-3 text-white hover:bg-accent/20 rounded-lg w-full text-left transition-all duration-300"
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
function MobileAuthenticatedUser({ user, onLogout }) {
    return (
        <div className="space-y-2">
            <div className="flex items-center space-x-3 px-4 py-3 bg-white/5 rounded-lg">
                <FaUser className="w-4 h-4 text-accent" />
                <span className="text-white">{user?.firstName} {user?.lastName}</span>
            </div>
            <button
                onClick={onLogout}
                className="flex items-center space-x-3 px-4 py-3 text-red-300 hover:bg-red-500/10 rounded-lg w-full text-left transition-all duration-300"
                aria-label="Wyloguj się"
            >
                <FaSignOutAlt className="w-4 h-4" />
                <span>Wyloguj się</span>
            </button>
        </div>
    );
}