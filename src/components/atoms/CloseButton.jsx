import React from 'react';

export function CloseButton({
                                onClick,
                                className = '',
                                ariaLabel = 'Zamknij'
                            }) {
    return (
        <button
            onClick={onClick}
            className={`
                group
                relative 
                w-8 
                h-8 
                flex 
                flex-col 
                items-center 
                justify-center
                active:scale-95
                transition-transform 
                duration-200
                ${className}
            `}
            aria-label={ariaLabel}
        >
            {/* Top line - DOKŁADNIE jak MobileMenuToggle isOpen */}
            <span className="
                block
                w-6
                h-0.5
                bg-white
                rotate-45
                translate-y-1
                transition-all
                duration-200
                group-hover:w-7
            "></span>

            {/* Middle line - hidden jak w MobileMenuToggle isOpen */}
            <span className="
                block
                w-6
                h-0.5
                bg-white
                mt-1
                opacity-0
                transition-all
                duration-200
                group-hover:w-7
            "></span>

            {/* Bottom line - DOKŁADNIE jak MobileMenuToggle isOpen */}
            <span className="
                block
                w-6
                h-0.5
                bg-white
                mt-1
                -rotate-45
                -translate-y-2
                transition-all
                duration-200
                group-hover:w-7
            "></span>
        </button>
    );
}