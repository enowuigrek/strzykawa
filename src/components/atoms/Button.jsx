import React from 'react';
import { CgSpinner } from 'react-icons/cg';

/**
 * Button Component - Uniwersalny przycisk używany w całej aplikacji
 */
export function Button({
                           children,
                           variant = 'primary',
                           size = 'md',
                           fullWidth = false,
                           disabled = false,
                           loading = false,
                           type = 'button',
                           onClick,
                           leftIcon,
                           rightIcon,
                           className = '',
                           ...props
                       }) {
    // Base classes - zawsze te same
    const baseClasses = 'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary';

    // Size variants - różne rozmiary
    const sizeClasses = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg',
        xl: 'px-8 py-4 text-xl',
    };

    // Variant styles - różne style
    const variantClasses = {
        primary: 'bg-accent text-white hover:bg-accent/90 active:bg-accent/80 focus:ring-accent shadow-md hover:shadow-lg',
        secondary: 'bg-primary-light text-white hover:bg-primary border border-accent/30 focus:ring-accent',
        ghost: 'bg-transparent text-accent hover:bg-accent/10 active:bg-accent/20 focus:ring-accent',
        danger: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800 focus:ring-red-500 shadow-md',
        success: 'bg-green-600 text-white hover:bg-green-700 active:bg-green-800 focus:ring-green-500 shadow-md',
    };

    // Width class
    const widthClass = fullWidth ? 'w-full' : '';

    // Disabled/Loading states
    const stateClasses = (disabled || loading)
        ? 'opacity-60 cursor-not-allowed'
        : 'cursor-pointer hover:scale-105 active:scale-95';

    const handleClick = (e) => {
        if (disabled || loading) return;
        if (onClick) onClick(e);
    };

    return (
        <button
            type={type}
            onClick={handleClick}
            disabled={disabled || loading}
            className={`
                ${baseClasses}
                ${sizeClasses[size]}
                ${variantClasses[variant]}
                ${widthClass}
                ${stateClasses}
                ${className}
            `}
            {...props}
        >
            {/* Loading spinner - pokazuje się gdy loading=true */}
            {loading && (
                <CgSpinner className="animate-spin" size={20} />
            )}

            {/* Left icon */}
            {!loading && leftIcon && (
                <span className="flex-shrink-0">
                    {leftIcon}
                </span>
            )}

            {/* Button content */}
            <span>
                {children}
            </span>

            {/* Right icon */}
            {!loading && rightIcon && (
                <span className="flex-shrink-0">
                    {rightIcon}
                </span>
            )}
        </button>
    );
}

// Demo examples (for testing)
export function ButtonExamples() {
    const [isLoading, setIsLoading] = React.useState(false);

    const handleLoadingDemo = () => {
        setIsLoading(true);
        setTimeout(() => setIsLoading(false), 2000);
    };

    return (
        <div className="p-8 bg-primary min-h-screen">
            <div className="max-w-4xl mx-auto space-y-12">

                {/* Variants */}
                <div>
                    <h3 className="text-white mb-4 text-lg font-semibold">Variants</h3>
                    <div className="flex flex-wrap gap-3">
                        <Button variant="primary">Primary</Button>
                        <Button variant="secondary">Secondary</Button>
                        <Button variant="ghost">Ghost</Button>
                        <Button variant="danger">Danger</Button>
                        <Button variant="success">Success</Button>
                    </div>
                </div>

                {/* Sizes */}
                <div>
                    <h3 className="text-white mb-4 text-lg font-semibold">Sizes</h3>
                    <div className="flex flex-wrap items-center gap-3">
                        <Button size="sm">Small</Button>
                        <Button size="md">Medium</Button>
                        <Button size="lg">Large</Button>
                        <Button size="xl">Extra Large</Button>
                    </div>
                </div>

                {/* With Icons */}
                <div>
                    <h3 className="text-white mb-4 text-lg font-semibold">With Icons</h3>
                    <div className="flex flex-wrap gap-3">
                        <Button leftIcon={<span>📧</span>}>
                            Wyślij Email
                        </Button>
                        <Button rightIcon={<span>→</span>} variant="secondary">
                            Dalej
                        </Button>
                        <Button leftIcon={<span>🛒</span>} rightIcon={<span>✓</span>}>
                            Dodaj do koszyka
                        </Button>
                    </div>
                </div>

                {/* States */}
                <div>
                    <h3 className="text-white mb-4 text-lg font-semibold">States</h3>
                    <div className="flex flex-wrap gap-3">
                        <Button>Normal</Button>
                        <Button disabled>Disabled</Button>
                        <Button loading={isLoading} onClick={handleLoadingDemo}>
                            {isLoading ? 'Ładowanie...' : 'Kliknij (loading demo)'}
                        </Button>
                    </div>
                </div>

                {/* Full Width */}
                <div>
                    <h3 className="text-white mb-4 text-lg font-semibold">Full Width</h3>
                    <div className="space-y-3">
                        <Button fullWidth>Pełna szerokość</Button>
                        <Button fullWidth variant="secondary">
                            Zatwierdź zamówienie
                        </Button>
                    </div>
                </div>

                {/* Real Use Cases */}
                <div>
                    <h3 className="text-white mb-4 text-lg font-semibold">Real Use Cases (Strzykawa)</h3>
                    <div className="space-y-4">

                        {/* Filter Drawer Actions */}
                        <div className="bg-primary-light p-4 rounded-lg">
                            <p className="text-muted text-sm mb-3">Filter Drawer Actions:</p>
                            <div className="flex gap-2">
                                <Button fullWidth>Zastosuj filtry</Button>
                                <Button variant="ghost" fullWidth>Wyczyść</Button>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <div className="bg-primary-light p-4 rounded-lg">
                            <p className="text-muted text-sm mb-3">Contact Form:</p>
                            <Button fullWidth leftIcon={<span>📧</span>} type="submit">
                                Wyślij wiadomość
                            </Button>
                        </div>

                        {/* E-commerce (future) */}
                        <div className="bg-primary-light p-4 rounded-lg">
                            <p className="text-muted text-sm mb-3">E-commerce (przyszłość):</p>
                            <div className="flex gap-2">
                                <Button fullWidth leftIcon={<span>🛒</span>}>
                                    Dodaj do koszyka
                                </Button>
                                <Button variant="success" fullWidth leftIcon={<span>⚡</span>}>
                                    Kup teraz
                                </Button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>
    );
}