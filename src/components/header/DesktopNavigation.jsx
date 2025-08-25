import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
    { to: "/", label: "Start" },
    { to: "/o-nas", label: "O Strzykawie" },
    { to: "/dostepne-w-kawiarni", label: "Dostępne w kawiarni" },
    { to: "/kawy", label: "Sklep on-line" },
    { to: "/kontakt", label: "Kontakt" },

];

const navLinkClasses = ({ isActive }) => `
    relative px-3 py-2 text-white text-sm font-medium transition-all duration-300
    hover:text-white
    ${isActive ? 'text-white' : ''}
    after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2 
    after:w-0 after:h-0.5 after:bg-white
    after:transition-all after:duration-300
    hover:after:w-full
    ${isActive ? 'after:w-full' : ''}
`;

export function DesktopNavigation() {
    return (
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navItems.map((item) => (
                <NavLink key={item.to} to={item.to} className={navLinkClasses}>
                    {item.label}
                </NavLink>
            ))}
        </nav>
    );
}