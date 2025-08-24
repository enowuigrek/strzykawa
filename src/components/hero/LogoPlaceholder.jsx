import React from 'react';
import { FaCoffee } from 'react-icons/fa';

export function LogoPlaceholder() {
    return (
        <div className="mb-8">
            <div className="inline-flex items-center justify-center w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300">
                <div className="text-center">
                    <FaCoffee className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-white mb-2 mx-auto" />
                    <div className="text-white text-xs sm:text-sm font-medium opacity-70">
                        LOGO
                    </div>
                </div>
            </div>
        </div>
    );
}