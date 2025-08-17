import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    // Zamknij mobile menu gdy klikniemy link
    const closeMobileMenu = () => setMobileMenuOpen(false);

    return (
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
                        <div className="text-2xl sm:text-3xl font-bold text-white tracking-wide">
                            STRZYKAWA
                        </div>
                        <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-muted to-accent transition-all duration-300 group-hover:w-full"></div>
                    </div>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center space-x-8">
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
                            href="#kontakt"
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
                    ${mobileMenuOpen ? 'max-h-80 opacity-100 pb-6' : 'max-h-0 opacity-0 pb-0'}
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
                    </nav>
                </div>
            </div>
        </header>
    );
}