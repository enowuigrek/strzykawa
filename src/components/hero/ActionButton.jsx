import React from 'react';
import { FaArrowRight } from 'react-icons/fa';

export function ActionButton({ href, icon: Icon, text, colorClass }) {
    return (
        <a
            href={href}
            className="group relative inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/30 rounded-full px-6 py-3 transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:border-white/50"
        >
            <div className="flex items-center space-x-3">
                <div className={`p-2 ${colorClass} rounded-full`}>
                    <Icon className="w-4 h-4" />
                </div>
                <span className="text-white font-semibold text-lg">
                    {text}
                </span>
                <FaArrowRight className="w-4 h-4 text-white transition-transform duration-300 group-hover:translate-x-1" />
            </div>

            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out rounded-full" />
        </a>
    );
}