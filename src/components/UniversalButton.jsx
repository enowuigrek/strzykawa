import React from 'react';

export function UniversalButton({
                                    children,
                                    icon: Icon,
                                    variant = 'primary',
                                    size = 'md',
                                    disabled = false,
                                    loading = false,
                                    onClick,
                                    href,
                                    className = '',
                                    ...props
                                }) {
    const variants = {
        primary: 'bg-accent hover:from-muted hover:to-accent text-white',
        secondary: 'bg-white/10 border border-white/20 hover:bg-white/20 text-white',
        success: 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-500 text-white',
        danger: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-500 text-white'
    };

    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg'
    };

    const baseClasses = `
        group relative inline-flex items-center justify-center
        transition-all duration-300 hover:scale-105 hover:shadow-lg 
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
        rounded-full overflow-hidden
        ${variants[variant]}
        ${sizes[size]}
        ${className}
    `;

    const content = (
        <>
            <div className="flex items-center space-x-3">
                {Icon && (
                    <div className={`${loading ? 'animate-pulse' : ''}`}>
                        {loading ? (
                            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                        ) : (
                            <Icon className="w-4 h-4" />
                        )}
                    </div>
                )}
                <span>{children}</span>
            </div>

            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out" />
        </>
    );

    if (href) {
        return (
            <a
                href={href}
                className={baseClasses}
                {...props}
            >
                {content}
            </a>
        );
    }

    return (
        <button
            onClick={onClick}
            disabled={disabled || loading}
            className={baseClasses}
            {...props}
        >
            {content}
        </button>
    );
}