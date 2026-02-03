import React from 'react';

export function ActionButton({ href, icon: Icon, text }) {
    return (
        <a
            href={href}
            className="group relative inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 transition-all duration-300 hover:bg-white/20 hover:scale-105"
        >
            <div className="flex items-center space-x-3">
                <Icon className="w-5 h-5 text-white" />
                <span className="text-white font-medium text-lg">
                    {text}
                </span>
            </div>
        </a>
    );
}