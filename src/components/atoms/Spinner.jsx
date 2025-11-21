/**
 * Spinner - Loading indicator
 * Animowany spinner z różnymi rozmiarami
 */
export function Spinner({ size = 'md', className = '' }) {
    const sizes = {
        sm: 'w-8 h-8 border-2',
        md: 'w-16 h-16 border-4',
        lg: 'w-24 h-24 border-4',
    };

    return (
        <div
            className={`
                animate-spin
                ${sizes[size]}
                border-accent
                border-t-transparent
                rounded-full
                ${className}
            `}
            role="status"
            aria-label="Ładowanie..."
        >
            <span className="sr-only">Ładowanie...</span>
        </div>
    );
}
