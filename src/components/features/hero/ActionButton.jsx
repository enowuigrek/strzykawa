import React from 'react';

export function ActionButton({ href, icon: Icon, text, colorClass = 'bg-white/20' }) {
    return (
        <a
            href={href}
            className="group relative inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 transition-all duration-300 hover:bg-white/20 hover:scale-105"
        >
            <div className="flex items-center space-x-3">
                <div className={`p-2 ${colorClass} rounded-full`}>
                    <Icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-white font-semibold text-lg">
                    {text}
                </span>
            </div>
        </a>
    );
}