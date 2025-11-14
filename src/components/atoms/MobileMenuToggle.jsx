import React from 'react';

/**
 * MobileMenuToggle - Animated hamburger ↔ X
 * UPDATED: Hover rozciąga ramiona (w-6 → w-7)
 */
export function MobileMenuToggle({ isOpen, onToggle }) {
    return (
        <button
            onClick={onToggle}
            className="group relative w-8 h-8 flex flex-col items-center justify-center active:scale-95 transition-transform duration-200"
            aria-label="Toggle mobile menu"
        >
            {/* Top line */}
            <span className={`
                block 
                w-6 
                h-0.5 
                bg-white 
                transition-all 
                duration-300 
                ease-out
                group-hover:w-7
                ${isOpen ? 'rotate-45 translate-y-1' : 'translate-y-0'}
            `}></span>

            {/* Middle line */}
            <span className={`
                block 
                w-6 
                h-0.5 
                bg-white 
                transition-all 
                duration-300 
                ease-out 
                mt-1
                group-hover:w-7
                ${isOpen ? 'opacity-0' : 'opacity-100'}
            `}></span>

            {/* Bottom line */}
            <span className={`
                block 
                w-6 
                h-0.5 
                bg-white 
                transition-all 
                duration-300 
                ease-out 
                mt-1
                group-hover:w-7
                ${isOpen ? '-rotate-45 -translate-y-2' : 'translate-y-0'}
            `}></span>
        </button>
    );
}