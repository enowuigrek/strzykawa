import React from 'react';

export function Logo({ scrolled }) {
    return (
        <div className="relative group">
            {scrolled && (
                <div className="text-2xl sm:text-3xl text-white tracking-wide">
                    STRZYKAWA
                </div>
            )}
            <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-muted to-accent transition-all duration-300 group-hover:w-full"></div>
        </div>
    );
}