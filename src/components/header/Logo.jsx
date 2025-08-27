import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Logo({ }) {
    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate('/');
        // Scroll to top po nawigacji
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div
            className="relative group cursor-pointer"
            onClick={handleLogoClick}
        >
            <div className="text-2xl sm:text-3xl text-white tracking-wide transition-all duration-300 hover:text-accent">
                STRZYKAWA
            </div>
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-muted to-accent transition-all duration-300 group-hover:w-full"></div>
        </div>
    );
}