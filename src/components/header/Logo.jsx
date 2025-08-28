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
            className="cursor-pointer header-logo"
            onClick={handleLogoClick}
        >
            {/* Logo poziome bez efektów hover */}
            <img
                src="/logo/horizontal-logo.png"
                alt="Strzykawa Coffee Shop & Roastery"
                className="w-auto"
            />
        </div>
    );
}