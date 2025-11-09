import React from 'react';

/**
 * Button Component - Ultimate button combining best of both worlds
 *
 * Features:
 * - Can be <a> link (with href) or <button>
 * - Shine effect animation
 * - leftIcon + rightIcon support
 * - type prop (button/submit)
 * - fullWidth option
 * - Loading state with spinner
 * - Multiple variants and sizes
 *
 * @example
 * // As link
 * <Button href="/kawy" leftIcon={FaCoffee}>Zobacz kawy</Button>
 *
 * // As button with loading
 * <Button type="submit" loading={isSubmitting} leftIcon={FaShoppingCart}>
 *   Dodaj do koszyka
 * </Button>
 *
 * // Full width
 * <Button fullWidth variant="success">Zatwierdź</Button>
 */
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
        primary: 'bg-accent hover:from-muted hover:to-accent text-white shadow-md hover:shadow-lg',
        secondary: 'bg-white/10 border border-white/20 hover:bg-white/20 text-white',
        ghost: 'bg-transparent text-accent hover:bg-accent/10 border border-accent/30',
        success: 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-500 text-white shadow-md',
        danger: 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-500 text-white shadow-md'
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
