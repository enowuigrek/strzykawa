import React from 'react';
import PropTypes from 'prop-types';

export function Button({
                           children,
                           leftIcon: LeftIcon,
                           rightIcon: RightIcon,
                           variant = 'primary',
                           size = 'md',
                           fullWidth = false,
                           disabled = false,
                           loading = false,
                           type = 'button',
                           onClick,
                           href,
                           className = '',
                           ...props
                       }) {
    // Variant styles
    const variants = {
        primary:
            'bg-cta text-white hover:bg-cta-hover shadow-md hover:shadow-lg',
        secondary:
            'bg-white/5 hover:bg-white/10 text-white',
        ghost:
            'bg-transparent text-accent hover:bg-accent/10 border border-accent/30',
        success:
            'bg-success text-white hover:bg-success-dark shadow-md hover:shadow-lg',
        danger:
            'bg-danger text-white hover:bg-danger-dark shadow-md hover:shadow-lg',
    };

    // Size variants
    const sizes = {
        sm: 'px-4 py-2 text-sm',
        md: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg'
    };

    // Width class
    const widthClass = fullWidth ? 'w-full' : '';

    // Base classes
    const baseClasses = `
        group relative inline-flex items-center justify-center gap-3
        transition-all duration-300 hover:scale-105 
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
        rounded-full overflow-hidden
        focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-primary
        ${variants[variant]}
        ${sizes[size]}
        ${widthClass}
        ${className}
    `;

    // Content with icons
    const content = (
        <>
            {/* Left Icon or Loading Spinner */}
            {(LeftIcon || loading) && (
                <div className={`flex-shrink-0 ${loading ? 'animate-pulse' : ''}`}>
                    {loading ? (
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                        LeftIcon && <LeftIcon className="w-4 h-4" />
                    )}
                </div>
            )}

            {/* Text */}
            <span>{children}</span>

            {/* Right Icon (only if not loading) */}
            {RightIcon && !loading && (
                <div className="flex-shrink-0">
                    <RightIcon className="w-4 h-4" />
                </div>
            )}

            {/* Shine effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 ease-out" />
        </>
    );

    // Render as link if href provided
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

    // Render as button
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled || loading}
            className={baseClasses}
            {...props}
        >
            {content}
        </button>
    );
}

Button.propTypes = {
    children: PropTypes.node.isRequired,
    leftIcon: PropTypes.elementType,
    rightIcon: PropTypes.elementType,
    variant: PropTypes.oneOf(['primary', 'secondary', 'ghost', 'success', 'danger']),
    size: PropTypes.oneOf(['sm', 'md', 'lg']),
    fullWidth: PropTypes.bool,
    disabled: PropTypes.bool,
    loading: PropTypes.bool,
    type: PropTypes.oneOf(['button', 'submit', 'reset']),
    onClick: PropTypes.func,
    href: PropTypes.string,
    className: PropTypes.string,
};
