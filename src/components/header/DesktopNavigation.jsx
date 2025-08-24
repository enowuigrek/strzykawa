import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
    { to: "/", label: "Start" },
    { to: "/o-nas", label: "O Strzykawie" },
    { to: "/kawy", label: "Nasze kawy" },
    { to: "/dostepne-w-kawiarni", label: "Dostępne w kawiarni" }
];

const navLinkClasses = ({ isActive }) => `
    relative px-3 py-2 text-white font-medium transition-all duration-300
    hover:text-white hover:scale-105
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
            <a
                href="/kontakt"
                className="
                    relative px-3 py-2 text-white font-medium transition-all duration-300
                    hover:text-white hover:scale-105
                    after:content-[''] after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2
                    after:w-0 after:h-0.5 after:bg-white
                    after:transition-all after:duration-300
                    hover:after:w-full
                "
            >
                Kontakt
            </a>
        </nav>
    );
}