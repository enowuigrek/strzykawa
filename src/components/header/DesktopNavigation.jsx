import { NavLink } from 'react-router-dom';
import { NAV_ITEMS } from '../../constants/navigation.js';

/**
 * DesktopNavigation - Desktop navigation menu
 *
 * Wyświetla główne linki nawigacyjne dla dużych ekranów
 * Ukrywa się na urządzeniach mobile (<lg)
 */
export function DesktopNavigation() {
    return (
        <nav
            className="hidden lg:flex items-center space-x-6 xl:space-x-8"
            aria-label="Główna nawigacja"
        >
            {NAV_ITEMS.map((item) => (
                <NavLink
                    key={item.to}
                    to={item.to}
                    className={getNavLinkClasses}
                    aria-label={item.ariaLabel}
                >
                    {item.label}
                </NavLink>
            ))}
        </nav>
    );
}

/**
 * Style dla linków nawigacyjnych z active state
 */
function getNavLinkClasses({ isActive }) {
    return `
        relative 
        px-3 
        py-2 
        text-white 
        transition-all 
        duration-300
        hover:text-white
        rounded
        ${isActive ? 'text-white' : ''}
        after:content-[''] 
        after:absolute 
        after:bottom-0 
        after:left-1/2 
        after:-translate-x-1/2 
        after:w-0 
        after:h-[1.5px]
        after:bg-white
        after:transition-all 
        after:duration-300
        hover:after:w-full
        ${isActive ? 'after:w-full' : ''}
    `;
}