import React from 'react';

export function ActionButton({ href, icon: Icon, text, colorClass }) {
    return (
        <a
            href={href}
            className="group relative inline-flex items-center bg-white/10 backdrop-blur-0  rounded-full px-6 py-3 transition-all duration-300 hover:backdrop-blur-xl"
        >
            <div className="flex items-center space-x-3">
                <div className={`p-2 ${colorClass} rounded-full`}>
                    <Icon className="w-4 h-4" />
                </div>
                <span className="text-white font-semibold text-lg">
                    {text}
                </span>
            </div>
        </a>
    );
}