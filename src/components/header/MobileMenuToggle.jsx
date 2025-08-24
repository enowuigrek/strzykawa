import React from 'react';

export function MobileMenuToggle({ isOpen, onToggle }) {
    return (
        <button
            onClick={onToggle}
            className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center group"
            aria-label="Toggle mobile menu"
        >
            <span className={`
                block w-6 h-0.5 bg-white transition-all duration-300 ease-out
                ${isOpen ? 'rotate-45 translate-y-1' : 'translate-y-0'}
            `}></span>
            <span className={`
                block w-6 h-0.5 bg-white transition-all duration-300 ease-out mt-1
                ${isOpen ? 'opacity-0' : 'opacity-100'}
            `}></span>
            <span className={`
                block w-6 h-0.5 bg-white transition-all duration-300 ease-out mt-1
                ${isOpen ? '-rotate-45 -translate-y-2' : 'translate-y-0'}
            `}></span>
        </button>
    );
}
